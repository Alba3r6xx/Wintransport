"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Search, ArrowLeftRight, Calendar, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, CreditCard, Clock, Package, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import TripCard from "@/components/booking/trip-card";
import SeatMap from "@/components/booking/seat-map";
import { cn, formatCurrency, formatTime } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { initiatePaystackPayment } from "@/lib/paystack";
import type { Trip, SeatInfo } from "@/lib/types";

type BookingStep = "search" | "select-trip" | "select-seat" | "confirm";
type PostBookingStep = "success" | "luggage-select" | "luggage-checkout" | "all-done";

const SPECIAL_ITEMS = [
  { id: "ac", name: "Air Conditioner (AC unit & Outlet)", price: 250 },
  { id: "fridge-double", name: "Fridge (Double Door)", price: 150 },
  { id: "fridge-single", name: "Fridge (Table top — One Door)", price: 100 },
  { id: "tv", name: "Television", price: 150 },
  { id: "desk", name: "Study Table and Chair", price: 200 },
  { id: "sound", name: "Sound System", price: 100 },
  { id: "fan", name: "Standing Fan", price: 70 },
  { id: "microwave", name: "Microwave Oven", price: 50 },
  { id: "plastics", name: "Plastics", price: 40 },
  { id: "gas-cylinder", name: "Gas Cylinder", price: 40 },
  { id: "gas-stove", name: "Gas Stove", price: 30 },
];

function generateTicketId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "WTS-";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function makeDemoTrips(from: string, to: string, date: string): Trip[] {
  const base = new Date(date);
  return [
    { id: "demo-1", bus_id: "d1", bus: { id: "d1", name: "WinTransport Executive", plate_number: "GR-2845-24", total_seats: 45, seat_layout: { rows: 10, columns: 4, aisle_after_column: 2, unavailable_seats: [] }, amenities: ["AC", "WiFi", "USB Charging"], is_active: true, created_at: "" }, origin: from, destination: to, departure_time: new Date(base.setHours(6, 0)).toISOString(), arrival_time: new Date(base.setHours(9, 30)).toISOString(), price: 100, status: "scheduled", created_at: "" },
    { id: "demo-2", bus_id: "d2", bus: { id: "d2", name: "WinTransport Standard", plate_number: "GR-1234-24", total_seats: 45, seat_layout: { rows: 10, columns: 4, aisle_after_column: 2, unavailable_seats: [] }, amenities: ["AC"], is_active: true, created_at: "" }, origin: from, destination: to, departure_time: new Date(base.setHours(10, 0)).toISOString(), arrival_time: new Date(base.setHours(13, 30)).toISOString(), price: 80, status: "scheduled", created_at: "" },
    { id: "demo-3", bus_id: "d3", bus: { id: "d3", name: "WinTransport Express", plate_number: "GR-5678-24", total_seats: 45, seat_layout: { rows: 10, columns: 4, aisle_after_column: 2, unavailable_seats: [] }, amenities: ["AC", "WiFi"], is_active: true, created_at: "" }, origin: from, destination: to, departure_time: new Date(base.setHours(14, 0)).toISOString(), arrival_time: new Date(base.setHours(17, 30)).toISOString(), price: 90, status: "scheduled", created_at: "" },
  ];
}

const MOCK_SEATS: SeatInfo[] = [
  { seat_number: "1", status: "confirmed", occupant_name: "Kwame A." },
  { seat_number: "2", status: "confirmed", occupant_name: "Ama B." },
  { seat_number: "5", status: "reserved", occupant_name: "Rita M." },
  { seat_number: "7", status: "reserved", occupant_name: "Kofi M." },
  { seat_number: "9", status: "confirmed", occupant_name: "Akua D." },
  { seat_number: "12", status: "confirmed", occupant_name: "Yaw S." },
  { seat_number: "14", status: "reserved", occupant_name: "Efua K." },
  { seat_number: "17", status: "confirmed", occupant_name: "Kojo P." },
  { seat_number: "19", status: "confirmed", occupant_name: "Adwoa R." },
  { seat_number: "24", status: "reserved", occupant_name: "Kwesi T." },
  { seat_number: "27", status: "confirmed", occupant_name: "Abena F." },
  { seat_number: "30", status: "confirmed", occupant_name: "Nana O." },
  { seat_number: "35", status: "reserved", occupant_name: "Adjoa L." },
  { seat_number: "40", status: "confirmed", occupant_name: "Priscilla N." },
];

export default function BookingPage() {
  const supabase = useMemo(() => createClient(), []);
  const user = useAppStore((s) => s.user);

  const [step, setStep] = useState<BookingStep>("search");
  const [direction, setDirection] = useState("takoradi-knust");
  const [travelDate, setTravelDate] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatData, setSeatData] = useState<SeatInfo[]>([]);
  const [paymentMode, setPaymentMode] = useState<"now" | "later">("now");
  const [usingDemoData, setUsingDemoData] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingSaving, setBookingSaving] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [postBookingStep, setPostBookingStep] = useState<PostBookingStep>("success");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const ticketIdRef = useRef<string>("");

  const fetchTrips = useCallback(async () => {
    setLoadingTrips(true);
    setUsingDemoData(false);
    const [from, to] = direction === "takoradi-knust" ? ["Takoradi", "KNUST"] : ["KNUST", "Takoradi"];
    const fallbackDate = travelDate && !isNaN(new Date(travelDate).getTime()) ? travelDate : new Date().toISOString().split("T")[0];
    try {
      let query = supabase.from("trips").select("*, bus:buses(*)").eq("origin", from).eq("destination", to).in("status", ["scheduled", "boarding"]).order("departure_time", { ascending: true });
      if (travelDate && !isNaN(new Date(travelDate).getTime())) {
        const dayStart = new Date(travelDate);
        const dayEnd = new Date(travelDate);
        dayEnd.setDate(dayEnd.getDate() + 1);
        query = query.gte("departure_time", dayStart.toISOString()).lt("departure_time", dayEnd.toISOString());
      } else {
        query = query.gte("departure_time", new Date().toISOString());
      }
      const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 8000));
      const { data, error } = await Promise.race([query, timeout]);
      const realTrips = (data as unknown as Trip[]) || [];
      if (realTrips.length > 0 && !error) {
        setTrips(realTrips);
      } else {
        setTrips(makeDemoTrips(from, to, fallbackDate));
        setUsingDemoData(true);
      }
    } catch {
      setTrips(makeDemoTrips(from, to, fallbackDate));
      setUsingDemoData(true);
    }
    setLoadingTrips(false);
  }, [direction, travelDate, supabase]);

  const fetchSeatData = useCallback(async (tripId: string) => {
    if (tripId.startsWith("demo-")) { setSeatData(MOCK_SEATS); return; }
    try {
      const query = supabase.from("seat_occupancy").select("seat_number, status, occupant_name, booking_id").eq("trip_id", tripId);
      const timeout = new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000));
      const { data } = await Promise.race([query, timeout]);
      setSeatData((data as unknown as SeatInfo[]) || []);
    } catch {
      setSeatData([]);
    }
  }, [supabase]);

  useEffect(() => { if (selectedTrip) fetchSeatData(selectedTrip.id); }, [selectedTrip, fetchSeatData]);

  const totalPrice = selectedTrip ? selectedTrip.price * selectedSeats.length : 0;
  const specialItemsCost = selectedItems.reduce((sum, id) => { const item = SPECIAL_ITEMS.find((i) => i.id === id); return sum + (item?.price || 0); }, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrips().then(() => setStep("select-trip"));
  };

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setSelectedSeats([]);
    setStep("select-seat");
  };

  const handleToggleSeat = (sn: string) => {
    setSelectedSeats((prev) => prev.includes(sn) ? prev.filter((s) => s !== sn) : [...prev, sn]);
  };

  const saveBookings = async (paid: boolean, paystackRef?: string) => {
    if (!selectedTrip || !user) return;
    setBookingSaving(true);
    setBookingError("");
    try {
      const bookings = selectedSeats.map((seat) => ({
        trip_id: selectedTrip.id, user_id: user.id, seat_number: seat,
        status: paid ? "confirmed" : "reserved",
        payment_deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
        paid_at: paid ? new Date().toISOString() : null,
        ...(paystackRef ? { paystack_reference: paystackRef } : {}),
      }));
      const { error } = await supabase.from("bookings").insert(bookings);
      if (error) { setBookingError(error.message); } else { setBookingComplete(true); setPostBookingStep("success"); }
    } catch { setBookingError("Something went wrong. Try again."); }
    finally { setBookingSaving(false); }
  };

  const handleConfirmBooking = async () => {
    if (!selectedTrip) return;
    if (!user || usingDemoData) {
      if (paymentMode === "now") {
        const email = user?.email || "demo@wintransport.com";
        try {
          await initiatePaystackPayment({
            email, amount: totalPrice,
            metadata: { trip: `${selectedTrip.origin} → ${selectedTrip.destination}`, seats: selectedSeats.join(", ") },
            onSuccess: () => { setBookingComplete(true); setPostBookingStep("success"); },
            onClose: () => { setBookingError("Payment cancelled. You can try again or reserve instead."); },
          });
        } catch { setBookingComplete(true); setPostBookingStep("success"); }
      } else { setBookingComplete(true); setPostBookingStep("success"); }
      return;
    }
    if (paymentMode === "now") {
      try {
        await initiatePaystackPayment({
          email: user.email, amount: totalPrice,
          metadata: { trip: `${selectedTrip.origin} → ${selectedTrip.destination}`, seats: selectedSeats.join(", ") },
          onSuccess: (ref) => saveBookings(true, ref),
          onClose: () => { setBookingError("Payment cancelled."); },
        });
      } catch { setBookingError("Paystack failed to load."); }
    } else { await saveBookings(false); }
  };

  const steps: { key: BookingStep; label: string }[] = [
    { key: "search", label: "Search" },
    { key: "select-trip", label: "Trip" },
    { key: "select-seat", label: "Seats" },
    { key: "confirm", label: "Pay" },
  ];
  const stepIdx = steps.findIndex((s) => s.key === step);

  if (bookingComplete) {
    if (!ticketIdRef.current) ticketIdRef.current = generateTicketId();
    const ticketId = ticketIdRef.current;
    if (postBookingStep === "success") {
      return (
        <><Navbar />
          <main className="min-h-screen bg-surface pt-24 pb-16">
            <div className="max-w-lg mx-auto px-5 text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-success" />
              </div>
              <h1 className="text-2xl font-black mb-2">Booking Confirmed!</h1>
              <p className="text-muted mb-6">Your ticket ID: <span className="font-mono font-bold text-accent">{ticketId}</span></p>
              {selectedTrip && (
                <div className="bg-white rounded-2xl border border-border p-5 text-left mb-6">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted">Route</span>
                    <span className="font-semibold">{selectedTrip.origin} → {selectedTrip.destination}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted">Departure</span>
                    <span className="font-semibold">{formatTime(selectedTrip.departure_time)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted">Seats</span>
                    <span className="font-semibold">{selectedSeats.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-3">
                    <span className="text-muted">Total</span>
                    <span className="font-black text-accent text-lg">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1" href="/dashboard">My Bookings</Button>
                <Button variant="accent" size="lg" className="flex-1" onClick={() => setPostBookingStep("luggage-select")}>
                  <Package size={16} /> Add Luggage
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </>
      );
    }
    if (postBookingStep === "luggage-select") {
      return (
        <><Navbar />
          <main className="min-h-screen bg-surface pt-24 pb-16">
            <div className="max-w-2xl mx-auto px-5 animate-fade-in-up">
              <button onClick={() => setPostBookingStep("success")} className="flex items-center gap-1 text-sm text-muted hover:text-text mb-4"><ArrowLeft size={14} /> Back</button>
              <h1 className="text-2xl font-black mb-1">Add Luggage</h1>
              <p className="text-muted text-sm mb-6">Select items you need transported</p>
              <div className="space-y-2">
                {SPECIAL_ITEMS.map((item) => {
                  const selected = selectedItems.includes(item.id);
                  return (
                    <button key={item.id} onClick={() => setSelectedItems((prev) => prev.includes(item.id) ? prev.filter((i) => i !== item.id) : [...prev, item.id])}
                      className={cn("w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left", selected ? "border-accent bg-accent-light" : "border-border bg-white hover:border-accent/30")}>
                      <div className="flex items-center gap-3">
                        <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors", selected ? "bg-accent border-accent" : "border-gray-300")}>
                          {selected && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-accent">{formatCurrency(item.price)}</span>
                    </button>
                  );
                })}
              </div>
              {selectedItems.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-lg font-bold">Total: <span className="text-accent">{formatCurrency(specialItemsCost)}</span></p>
                  <Button variant="accent" size="lg" onClick={() => setPostBookingStep("luggage-checkout")}>Checkout <ArrowRight size={16} /></Button>
                </div>
              )}
            </div>
          </main>
          <Footer />
        </>
      );
    }
    if (postBookingStep === "luggage-checkout") {
      return (
        <><Navbar />
          <main className="min-h-screen bg-surface pt-24 pb-16">
            <div className="max-w-lg mx-auto px-5 animate-fade-in-up">
              <button onClick={() => setPostBookingStep("luggage-select")} className="flex items-center gap-1 text-sm text-muted hover:text-text mb-4"><ArrowLeft size={14} /> Back</button>
              <h1 className="text-2xl font-black mb-6">Luggage Checkout</h1>
              <div className="bg-white rounded-2xl border border-border p-5 mb-6 space-y-3">
                {selectedItems.map((id) => { const item = SPECIAL_ITEMS.find((i) => i.id === id); if (!item) return null; return (
                  <div key={id} className="flex justify-between text-sm"><span>{item.name}</span><span className="font-semibold">{formatCurrency(item.price)}</span></div>
                ); })}
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span><span className="text-accent">{formatCurrency(specialItemsCost)}</span>
                </div>
              </div>
              <Button variant="accent" size="lg" className="w-full" onClick={() => setPostBookingStep("all-done")}>
                <CreditCard size={16} /> Pay {formatCurrency(specialItemsCost)}
              </Button>
            </div>
          </main>
          <Footer />
        </>
      );
    }
    return (
      <><Navbar />
        <main className="min-h-screen bg-surface pt-24 pb-16">
          <div className="max-w-lg mx-auto px-5 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-success" />
            </div>
            <h1 className="text-2xl font-black mb-2">All Done!</h1>
            <p className="text-muted mb-6">Your booking and luggage are confirmed.</p>
            <Button href="/dashboard" variant="accent" size="lg">Go to Dashboard <ArrowRight size={16} /></Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <><Navbar />
      <main className="min-h-screen bg-surface pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-5">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-1 mb-10">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-all", i <= stepIdx ? "bg-accent text-white border-accent" : "bg-white text-muted border-gray-200")}>
                    {i < stepIdx ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  <span className={cn("text-[10px] sm:text-xs mt-1 font-medium", i <= stepIdx ? "text-accent" : "text-muted")}>{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={cn("w-8 sm:w-16 h-0.5 mx-1 mt-[-14px]", i < stepIdx ? "bg-accent" : "bg-gray-200")} />}
              </div>
            ))}
          </div>

          {usingDemoData && step !== "search" && (
            <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> Demo mode — no real trips available. Bookings are simulated.
            </div>
          )}

          {/* STEP 1: Search */}
          {step === "search" && (
            <div className="max-w-xl mx-auto animate-fade-in-up">
              <h1 className="text-3xl font-black text-center mb-2">Book a Seat</h1>
              <p className="text-muted text-center mb-8">Find your perfect trip on the Takoradi ↔ KNUST route</p>
              <form onSubmit={handleSearch} noValidate className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Direction</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setDirection("takoradi-knust")} className={cn("flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all", direction === "takoradi-knust" ? "border-accent bg-accent-light text-accent" : "border-border text-muted hover:border-accent/30")}>
                      Takoradi → KNUST
                    </button>
                    <button type="button" onClick={() => setDirection(direction === "takoradi-knust" ? "knust-takoradi" : "takoradi-knust")} className="p-2 rounded-xl border border-border hover:bg-surface transition-colors">
                      <ArrowLeftRight size={16} className="text-muted" />
                    </button>
                    <button type="button" onClick={() => setDirection("knust-takoradi")} className={cn("flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all", direction === "knust-takoradi" ? "border-accent bg-accent-light text-accent" : "border-border text-muted hover:border-accent/30")}>
                      KNUST → Takoradi
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Travel Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
                  </div>
                </div>
                <Button type="submit" variant="accent" size="lg" className="w-full" loading={loadingTrips}>
                  <Search size={16} /> Search Available Trips
                </Button>
              </form>
            </div>
          )}

          {/* STEP 2: Select Trip */}
          {step === "select-trip" && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep("search")} className="flex items-center gap-1 text-sm text-muted hover:text-text"><ArrowLeft size={14} /> Back</button>
                <h2 className="text-xl font-black">Available Trips</h2>
                <span className="text-sm text-muted">{trips.length} found</span>
              </div>
              {loadingTrips ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-accent" size={32} /></div>
              ) : (
                <div className="space-y-3">
                  {trips.map((trip) => <TripCard key={trip.id} trip={trip} onSelect={handleSelectTrip} />)}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Select Seats */}
          {step === "select-seat" && selectedTrip && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => { setStep("select-trip"); setSelectedSeats([]); }} className="flex items-center gap-1 text-sm text-muted hover:text-text"><ArrowLeft size={14} /> Back</button>
                <h2 className="text-xl font-black">Pick Your Seats</h2>
                <span className="text-sm text-muted">{selectedTrip.bus?.name}</span>
              </div>
              <SeatMap
                seats={seatData}
                selectedSeats={selectedSeats}
                onToggleSeat={handleToggleSeat}
                rows={selectedTrip.bus?.seat_layout?.rows || 10}
                columns={selectedTrip.bus?.seat_layout?.columns || 4}
                aisleAfterColumn={selectedTrip.bus?.seat_layout?.aisle_after_column || 2}
              />
              {selectedSeats.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 sm:relative sm:mt-8 bg-white border-t sm:border border-border sm:rounded-2xl p-4 sm:p-5 flex items-center justify-between z-40 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)] sm:shadow-none">
                  <div>
                    <p className="text-xs sm:text-sm text-muted">Selected: <span className="font-semibold text-text">{selectedSeats.join(", ")}</span></p>
                    <p className="text-base sm:text-lg font-black text-accent mt-0.5 sm:mt-1">{formatCurrency(totalPrice)}</p>
                  </div>
                  <Button variant="accent" size="md" className="sm:!py-3 sm:!px-6" onClick={() => setStep("confirm")}>Continue <ArrowRight size={16} /></Button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Confirm & Pay */}
          {step === "confirm" && selectedTrip && (
            <div className="max-w-xl mx-auto animate-fade-in-up">
              <button onClick={() => setStep("select-seat")} className="flex items-center gap-1 text-sm text-muted hover:text-text mb-6"><ArrowLeft size={14} /> Back</button>
              <h2 className="text-2xl font-black mb-6">Confirm Booking</h2>
              <div className="bg-white rounded-2xl border border-border p-5 mb-6 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted">Route</span><span className="font-semibold">{selectedTrip.origin} → {selectedTrip.destination}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted">Bus</span><span className="font-semibold">{selectedTrip.bus?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted">Departure</span><span className="font-semibold">{formatTime(selectedTrip.departure_time)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted">Seats</span><span className="font-semibold">{selectedSeats.join(", ")}</span></div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span><span className="text-accent">{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <button onClick={() => setPaymentMode("now")} className={cn("w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left", paymentMode === "now" ? "border-accent bg-accent-light" : "border-border hover:border-accent/30")}>
                  <CreditCard size={20} className={paymentMode === "now" ? "text-accent" : "text-muted"} />
                  <div><p className="text-sm font-semibold">Pay Now</p><p className="text-xs text-muted">Instant confirmation via Paystack</p></div>
                </button>
                <button onClick={() => setPaymentMode("later")} className={cn("w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left", paymentMode === "later" ? "border-accent bg-accent-light" : "border-border hover:border-accent/30")}>
                  <Clock size={20} className={paymentMode === "later" ? "text-accent" : "text-muted"} />
                  <div><p className="text-sm font-semibold">Reserve & Pay Later</p><p className="text-xs text-muted">Pay within 5 days to keep your seat</p></div>
                </button>
              </div>

              {bookingError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle size={14} /> {bookingError}
                </div>
              )}

              <Button variant="accent" size="lg" className="w-full" onClick={handleConfirmBooking} loading={bookingSaving}>
                {paymentMode === "now" ? <><CreditCard size={16} /> Pay {formatCurrency(totalPrice)}</> : <>Reserve Seats</>}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
