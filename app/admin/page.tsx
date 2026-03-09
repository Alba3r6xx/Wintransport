"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Bus, Route, Ticket, Users, Plus, Trash2, AlertCircle, Loader2, X,
  DollarSign, Calendar, Activity, ArrowUpRight,
  BarChart3, Clock, MapPin, UserCheck, Shield,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import { cn, formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";

type AdminTab = "overview" | "buses" | "trips" | "bookings" | "passengers";

export default function AdminPage() {
  const user = useAppStore((s) => s.user);
  const authLoading = useAppStore((s) => s.authLoading);
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [buses, setBuses] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [passengers, setPassengers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddBus, setShowAddBus] = useState(false);
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [busForm, setBusForm] = useState({ name: "", plate_number: "", total_seats: 45, amenities: "AC" });
  const [tripForm, setTripForm] = useState({ bus_id: "", origin: "Takoradi", destination: "KNUST", departure_time: "", arrival_time: "", price: 100 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const supabase = createClient();
    const [busRes, tripRes, bookRes, passRes] = await Promise.all([
      supabase.from("buses").select("*").order("created_at", { ascending: false }),
      supabase.from("trips").select("*, bus:buses(name, plate_number)").order("departure_time", { ascending: false }),
      supabase.from("bookings").select("*, trip:trips(origin, destination, departure_time, price), profile:profiles(full_name, email)").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    ]);
    setBuses(busRes.data || []);
    setTrips(tripRes.data || []);
    setBookings(bookRes.data || []);
    setPassengers(passRes.data || []);
    setLoading(false);
  };

  const addBus = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("buses").insert({
      name: busForm.name, plate_number: busForm.plate_number, total_seats: busForm.total_seats,
      seat_layout: { rows: Math.ceil(busForm.total_seats / 4), columns: 4, aisle_after_column: 2, unavailable_seats: [] },
      amenities: busForm.amenities.split(",").map((a: string) => a.trim()),
      is_active: true,
    });
    setShowAddBus(false);
    setBusForm({ name: "", plate_number: "", total_seats: 45, amenities: "AC" });
    setSaving(false);
    fetchAll();
  };

  const addTrip = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("trips").insert({
      bus_id: tripForm.bus_id, origin: tripForm.origin, destination: tripForm.destination,
      departure_time: tripForm.departure_time, arrival_time: tripForm.arrival_time,
      price: tripForm.price, status: "scheduled",
    });
    setShowAddTrip(false);
    setTripForm({ bus_id: "", origin: "Takoradi", destination: "KNUST", departure_time: "", arrival_time: "", price: 100 });
    setSaving(false);
    fetchAll();
  };

  const deleteBus = async (id: string) => {
    if (!confirm("Delete this bus?")) return;
    const supabase = createClient();
    await supabase.from("buses").delete().eq("id", id);
    fetchAll();
  };

  const deleteTrip = async (id: string) => {
    if (!confirm("Delete this trip?")) return;
    const supabase = createClient();
    await supabase.from("trips").delete().eq("id", id);
    fetchAll();
  };

  /* ── derived stats ── */
  const stats = useMemo(() => {
    const confirmedBookings = bookings.filter((b: any) => b.status === "confirmed");
    const totalRevenue = confirmedBookings.reduce((sum: number, b: any) => sum + (b.trip?.price || 0), 0);
    const scheduledTrips = trips.filter((t: any) => t.status === "scheduled");
    const activeBuses = buses.filter((b: any) => b.is_active);
    const todayStr = new Date().toISOString().split("T")[0];
    const todayBookings = bookings.filter((b: any) => b.created_at?.startsWith(todayStr));
    const occupancyRate = trips.length > 0
      ? Math.round((confirmedBookings.length / (trips.length * 45)) * 100)
      : 0;
    return { totalRevenue, confirmedCount: confirmedBookings.length, scheduledTrips: scheduledTrips.length, activeBuses: activeBuses.length, todayBookings: todayBookings.length, occupancyRate, totalPassengers: passengers.length };
  }, [bookings, trips, buses, passengers]);

  const recentBookings = bookings.slice(0, 6);
  const upcomingTrips = trips.filter((t: any) => t.status === "scheduled").slice(0, 5);

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

  if (!user || user.role !== "admin") {
    return (
      <><Navbar />
        <main className="min-h-screen bg-surface pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle size={40} className="text-danger mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted mb-4">You need admin privileges to access this page.</p>
            <Button href="/dashboard" variant="accent">Go to Dashboard</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tabs: { key: AdminTab; label: string; icon: any; count?: number }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "buses", label: "Buses", icon: Bus, count: buses.length },
    { key: "trips", label: "Trips", icon: Route, count: trips.length },
    { key: "bookings", label: "Bookings", icon: Ticket, count: bookings.length },
    { key: "passengers", label: "Passengers", icon: Users, count: passengers.length },
  ];

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-colors";

  return (
    <><Navbar />
      <main className="min-h-screen bg-surface pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={18} className="text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Admin Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-text">Welcome back, {user.full_name?.split(" ")[0] || "Admin"}</h1>
              <p className="text-sm text-muted mt-1">Here&apos;s what&apos;s happening with WinTransport today.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchAll}><Activity size={14} /> Refresh</Button>
              <Button variant="accent" size="sm" onClick={() => { setTab("trips"); setShowAddTrip(true); }}><Plus size={14} /> New Trip</Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white rounded-xl border border-border p-1 overflow-x-auto">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={cn(
                "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                tab === t.key ? "bg-accent text-white shadow-sm" : "text-muted hover:text-text hover:bg-surface"
              )}>
                <t.icon size={15} />
                <span className="hidden sm:inline">{t.label}</span>
                {t.count !== undefined && (
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-semibold", tab === t.key ? "bg-white/20" : "bg-surface")}>{t.count}</span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-accent" size={32} /></div>
          ) : (
            <>
              {/* ═══ OVERVIEW ═══ */}
              {tab === "overview" && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Revenue", value: formatCurrency(stats.totalRevenue), icon: DollarSign, change: "+12%", up: true, color: "text-green-600 bg-green-50" },
                      { label: "Bookings", value: String(stats.confirmedCount), icon: Ticket, change: `${stats.todayBookings} today`, up: true, color: "text-accent bg-accent-light" },
                      { label: "Scheduled Trips", value: String(stats.scheduledTrips), icon: Calendar, change: `${trips.length} total`, up: true, color: "text-blue-600 bg-blue-50" },
                      { label: "Passengers", value: String(stats.totalPassengers), icon: Users, change: `${stats.activeBuses} buses`, up: true, color: "text-purple-600 bg-purple-50" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.color)}>
                            <s.icon size={18} />
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-medium text-green-600">
                            <ArrowUpRight size={12} />
                            <span>{s.change}</span>
                          </div>
                        </div>
                        <p className="text-2xl font-black text-text">{s.value}</p>
                        <p className="text-xs text-muted mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Occupancy + Quick actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Occupancy */}
                    <div className="bg-white rounded-2xl border border-border p-5">
                      <h3 className="text-sm font-semibold text-text mb-4">Fleet Occupancy</h3>
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f0f1f3" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f97316" strokeWidth="3"
                            strokeDasharray={`${stats.occupancyRate} ${100 - stats.occupancyRate}`}
                            strokeLinecap="round" className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-text">{stats.occupancyRate}%</span>
                          <span className="text-[10px] text-muted">occupied</span>
                        </div>
                      </div>
                      <div className="flex justify-center gap-4 text-xs text-muted">
                        <span><span className="inline-block w-2 h-2 rounded-full bg-accent mr-1" />Confirmed: {stats.confirmedCount}</span>
                        <span><span className="inline-block w-2 h-2 rounded-full bg-gray-200 mr-1" />Available</span>
                      </div>
                    </div>

                    {/* Recent bookings */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-text">Recent Bookings</h3>
                        <button onClick={() => setTab("bookings")} className="text-xs text-accent font-medium hover:underline">View all</button>
                      </div>
                      {recentBookings.length === 0 ? (
                        <p className="text-center text-muted py-8 text-sm">No bookings yet</p>
                      ) : (
                        <div className="space-y-2">
                          {recentBookings.map((b: any) => (
                            <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors">
                              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                <UserCheck size={14} className="text-accent" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-text truncate">{b.profile?.full_name || b.profile?.email || "Unknown"}</p>
                                <p className="text-[11px] text-muted">Seat {b.seat_number} · {b.trip?.origin} → {b.trip?.destination}</p>
                              </div>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0",
                                b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "reserved" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
                              )}>{b.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upcoming trips */}
                  <div className="bg-white rounded-2xl border border-border p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-text">Upcoming Trips</h3>
                      <button onClick={() => setTab("trips")} className="text-xs text-accent font-medium hover:underline">Manage trips</button>
                    </div>
                    {upcomingTrips.length === 0 ? (
                      <p className="text-center text-muted py-8 text-sm">No upcoming trips</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {upcomingTrips.map((t: any) => (
                          <div key={t.id} className="rounded-xl border border-border p-4 hover:border-accent/20 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin size={13} className="text-accent shrink-0" />
                              <span className="text-sm font-semibold text-text">{t.origin} → {t.destination}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-muted">
                              <span className="flex items-center gap-1"><Clock size={10} /> {formatDate(t.departure_time)} {formatTime(t.departure_time)}</span>
                              <span className="font-semibold text-accent">{formatCurrency(t.price)}</span>
                            </div>
                            <p className="text-[10px] text-muted mt-1.5">{t.bus?.name} · {t.bus?.plate_number}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ═══ BUSES ═══ */}
              {tab === "buses" && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Fleet Management</h2>
                    <Button variant="accent" size="sm" onClick={() => setShowAddBus(true)}><Plus size={14} /> Add Bus</Button>
                  </div>
                  {showAddBus && (
                    <div className="bg-white rounded-2xl border border-border p-5 mb-4 space-y-3 animate-fade-in-up">
                      <div className="flex items-center justify-between"><h3 className="font-semibold">New Bus</h3><button onClick={() => setShowAddBus(false)} className="p-1 hover:bg-surface rounded-lg"><X size={16} /></button></div>
                      <input placeholder="Bus Name (e.g. Express Coach A)" value={busForm.name} onChange={(e) => setBusForm({ ...busForm, name: e.target.value })} className={inputCls} />
                      <input placeholder="Plate Number (e.g. GR-2845-24)" value={busForm.plate_number} onChange={(e) => setBusForm({ ...busForm, plate_number: e.target.value })} className={inputCls} />
                      <input type="number" placeholder="Total Seats" value={busForm.total_seats} onChange={(e) => setBusForm({ ...busForm, total_seats: +e.target.value })} className={inputCls} />
                      <input placeholder="Amenities (comma-separated, e.g. AC, WiFi, USB)" value={busForm.amenities} onChange={(e) => setBusForm({ ...busForm, amenities: e.target.value })} className={inputCls} />
                      <Button variant="accent" size="sm" onClick={addBus} loading={saving}>Save Bus</Button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {buses.map((b: any) => (
                      <div key={b.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Bus size={18} className="text-accent" />
                          </div>
                          <button onClick={() => deleteBus(b.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                        </div>
                        <p className="font-bold text-text">{b.name}</p>
                        <p className="text-xs text-muted mt-0.5">{b.plate_number}</p>
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                          <span className="text-xs text-muted"><strong className="text-text">{b.total_seats}</strong> seats</span>
                          <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-semibold", b.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{b.is_active ? "Active" : "Inactive"}</span>
                        </div>
                        {b.amenities?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {b.amenities.map((a: string, i: number) => (
                              <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-surface text-muted font-medium">{a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {buses.length === 0 && <p className="text-center text-muted py-12 col-span-full">No buses in fleet. Add your first bus above.</p>}
                  </div>
                </div>
              )}

              {/* ═══ TRIPS ═══ */}
              {tab === "trips" && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Trip Schedule</h2>
                    <Button variant="accent" size="sm" onClick={() => setShowAddTrip(true)}><Plus size={14} /> Add Trip</Button>
                  </div>
                  {showAddTrip && (
                    <div className="bg-white rounded-2xl border border-border p-5 mb-4 space-y-3 animate-fade-in-up">
                      <div className="flex items-center justify-between"><h3 className="font-semibold">New Trip</h3><button onClick={() => setShowAddTrip(false)} className="p-1 hover:bg-surface rounded-lg"><X size={16} /></button></div>
                      <select value={tripForm.bus_id} onChange={(e) => setTripForm({ ...tripForm, bus_id: e.target.value })} className={inputCls}>
                        <option value="">Select Bus</option>
                        {buses.map((b: any) => <option key={b.id} value={b.id}>{b.name} ({b.plate_number})</option>)}
                      </select>
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Origin" value={tripForm.origin} onChange={(e) => setTripForm({ ...tripForm, origin: e.target.value })} className={inputCls} />
                        <input placeholder="Destination" value={tripForm.destination} onChange={(e) => setTripForm({ ...tripForm, destination: e.target.value })} className={inputCls} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-1 block">Departure</label><input type="datetime-local" value={tripForm.departure_time} onChange={(e) => setTripForm({ ...tripForm, departure_time: e.target.value })} className={inputCls} /></div>
                        <div><label className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-1 block">Arrival</label><input type="datetime-local" value={tripForm.arrival_time} onChange={(e) => setTripForm({ ...tripForm, arrival_time: e.target.value })} className={inputCls} /></div>
                      </div>
                      <input type="number" placeholder="Price (GHS)" value={tripForm.price} onChange={(e) => setTripForm({ ...tripForm, price: +e.target.value })} className={inputCls} />
                      <Button variant="accent" size="sm" onClick={addTrip} loading={saving}>Save Trip</Button>
                    </div>
                  )}
                  <div className="space-y-2">
                    {trips.map((t: any) => (
                      <div key={t.id} className="bg-white rounded-xl border border-border p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <Route size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{t.origin} → {t.destination}</p>
                            <p className="text-xs text-muted">{t.bus?.name} · {formatDate(t.departure_time)} {formatTime(t.departure_time)} · {formatCurrency(t.price)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold", t.status === "scheduled" ? "bg-blue-100 text-blue-700" : t.status === "boarding" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{t.status}</span>
                          <button onClick={() => deleteTrip(t.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-danger transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                    {trips.length === 0 && <p className="text-center text-muted py-12">No trips scheduled. Create your first trip above.</p>}
                  </div>
                </div>
              )}

              {/* ═══ BOOKINGS ═══ */}
              {tab === "bookings" && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">All Bookings</h2>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="px-2 py-1 rounded-lg bg-green-50 text-green-700 font-semibold">{bookings.filter((b: any) => b.status === "confirmed").length} confirmed</span>
                      <span className="px-2 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold">{bookings.filter((b: any) => b.status === "reserved").length} reserved</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {bookings.map((b: any) => (
                      <div key={b.id} className="bg-white rounded-xl border border-border p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", b.status === "confirmed" ? "bg-green-50" : "bg-amber-50")}>
                            <Ticket size={16} className={b.status === "confirmed" ? "text-green-600" : "text-amber-600"} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{b.profile?.full_name || b.profile?.email || "Unknown"} · <span className="text-accent">Seat {b.seat_number}</span></p>
                            <p className="text-xs text-muted">{b.trip?.origin} → {b.trip?.destination} · {b.trip ? formatDate(b.trip.departure_time) : "—"} · {b.trip ? formatCurrency(b.trip.price) : ""}</p>
                          </div>
                        </div>
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold", b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "reserved" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{b.status}</span>
                      </div>
                    ))}
                    {bookings.length === 0 && <p className="text-center text-muted py-12">No bookings yet</p>}
                  </div>
                </div>
              )}

              {/* ═══ PASSENGERS ═══ */}
              {tab === "passengers" && (
                <div className="animate-fade-in-up">
                  <h2 className="text-lg font-bold mb-4">Registered Passengers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {passengers.map((p: any) => (
                      <div key={p.id} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-accent">{(p.full_name || p.email || "?")[0].toUpperCase()}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-text truncate">{p.full_name || "—"}</p>
                          <p className="text-[11px] text-muted truncate">{p.email}</p>
                        </div>
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize shrink-0", p.role === "admin" ? "bg-accent-light text-accent" : "bg-surface text-muted")}>{p.role}</span>
                      </div>
                    ))}
                    {passengers.length === 0 && <p className="text-center text-muted py-12 col-span-full">No passengers registered yet</p>}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
