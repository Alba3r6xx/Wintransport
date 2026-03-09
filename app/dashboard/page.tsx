"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Ticket, Clock, CheckCircle2, AlertCircle, Calendar, MapPin, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import { cn, formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import type { Booking } from "@/lib/types";

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);
  const authLoading = useAppStore((s) => s.authLoading);
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  useEffect(() => {
    if (authLoading || !user) return;
    const fetchBookings = async () => {
      try {
        const supabase = createClient();
        const query = supabase
          .from("bookings")
          .select("*, trip:trips(*, bus:buses(*))")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        const timeout = new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000));
        const { data } = await Promise.race([query, timeout]);
        setBookings((data as unknown as Booking[]) || []);
      } catch {
        setBookings([]);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <><Navbar />
        <main className="min-h-screen bg-surface pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="animate-spin text-accent" size={32} />
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <><Navbar />
        <main className="min-h-screen bg-surface pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle size={40} className="text-muted mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Not signed in</h2>
            <p className="text-muted mb-4">Sign in to view your bookings</p>
            <Button href="/login?redirect=/dashboard" variant="accent">Sign In</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const now = new Date();
  const upcoming = bookings.filter((b) => b.trip && new Date(b.trip.departure_time) >= now);
  const past = bookings.filter((b) => b.trip && new Date(b.trip.departure_time) < now);
  const displayed = tab === "upcoming" ? upcoming : past;

  return (
    <><Navbar />
      <main className="min-h-screen bg-surface pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="text-3xl font-black mb-2">Dashboard</h1>
          <p className="text-muted mb-8">Welcome back, {user.full_name || "Rider"}!</p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Bookings", value: bookings.length, icon: Ticket, color: "text-accent" },
              { label: "Upcoming", value: upcoming.length, icon: Clock, color: "text-blue-500" },
              { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: CheckCircle2, color: "text-success" },
              { label: "Reserved", value: bookings.filter((b) => b.status === "reserved").length, icon: AlertCircle, color: "text-amber-500" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-4">
                <s.icon size={20} className={cn("mb-2", s.color)} />
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white rounded-xl border border-border p-1 w-fit">
            <button onClick={() => setTab("upcoming")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", tab === "upcoming" ? "bg-accent text-white" : "text-muted hover:text-text")}>
              Upcoming ({upcoming.length})
            </button>
            <button onClick={() => setTab("past")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", tab === "past" ? "bg-accent text-white" : "text-muted hover:text-text")}>
              Past ({past.length})
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-accent" size={32} /></div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-border">
              <Ticket size={40} className="text-muted mx-auto mb-4" />
              <p className="font-semibold mb-1">No {tab} bookings</p>
              <p className="text-muted text-sm mb-4">{tab === "upcoming" ? "Book your next trip!" : "Your travel history will appear here."}</p>
              {tab === "upcoming" && <Button href="/booking" variant="accent" size="sm">Book a Seat</Button>}
            </div>
          ) : (
            <div className="space-y-3">
              {displayed.map((b) => (
                <div key={b.id} className="bg-white rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} className="text-accent shrink-0" />
                      <span className="font-semibold text-sm truncate">
                        {b.trip?.origin} → {b.trip?.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {b.trip ? formatDate(b.trip.departure_time) : "—"}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {b.trip ? formatTime(b.trip.departure_time) : "—"}</span>
                      <span>Seat {b.seat_number}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "reserved" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>
                      {b.status}
                    </span>
                    <span className="font-bold text-accent">{b.trip ? formatCurrency(b.trip.price) : "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
