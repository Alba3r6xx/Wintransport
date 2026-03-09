"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Shield, Ticket, LogOut, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";

type Tab = "details" | "trips" | "security";

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const authLoading = useAppStore((s) => s.authLoading);
  const setUser = useAppStore((s) => s.setUser);
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("details");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    if (authLoading || !user) return;
    setFullName(user.full_name || "");
    setPhone(user.phone || "");
    const fetchStats = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("bookings").select("id, trip:trips(price)").eq("user_id", user.id);
      if (data) {
        setBookingCount(data.length);
        setTotalSpent(data.reduce((sum: number, b: any) => sum + (b.trip?.price || 0), 0));
      }
    };
    fetchStats();
  }, [user, authLoading]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profiles").update({ full_name: fullName, phone }).eq("id", user.id);
    setUser({ ...user, full_name: fullName, phone });
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

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
            <Button href="/login?redirect=/profile" variant="accent">Sign In</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "trips", label: "My Trips" },
    { key: "security", label: "Security" },
  ];

  return (
    <><Navbar />
      <main className="min-h-screen bg-surface pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-5">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center">
              <User size={28} className="text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-black">{user.full_name || "Rider"}</h1>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white rounded-xl border border-border p-1">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={cn("flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors", tab === t.key ? "bg-accent text-white" : "text-muted hover:text-text")}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Details Tab */}
          {tab === "details" && (
            <div className="bg-white rounded-2xl border border-border p-6 space-y-4 animate-fade-in-up">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="email" value={user.email} disabled className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-gray-100 text-muted text-sm cursor-not-allowed" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
                </div>
              </div>
              <Button variant="accent" onClick={handleSave} loading={saving}>
                {saved ? <><CheckCircle2 size={14} /> Saved!</> : "Save Changes"}
              </Button>
            </div>
          )}

          {/* Trips Tab */}
          {tab === "trips" && (
            <div className="animate-fade-in-up space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-border p-4">
                  <Ticket size={18} className="text-accent mb-1" />
                  <p className="text-2xl font-black">{bookingCount}</p>
                  <p className="text-xs text-muted">Total Trips</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4">
                  <Shield size={18} className="text-accent mb-1" />
                  <p className="text-2xl font-black">{formatCurrency(totalSpent)}</p>
                  <p className="text-xs text-muted">Total Spent</p>
                </div>
              </div>
              <Button href="/dashboard" variant="outline" className="w-full">View All Bookings</Button>
            </div>
          )}

          {/* Security Tab */}
          {tab === "security" && (
            <div className="animate-fade-in-up space-y-4">
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-1">Account Role</h3>
                <p className="text-sm text-muted mb-4">Your role: <span className="font-semibold text-accent capitalize">{user.role}</span></p>
                <h3 className="font-semibold mb-1">Password</h3>
                <p className="text-sm text-muted mb-4">Use the forgot password flow to reset.</p>
                <Button href="/forgot-password" variant="outline" size="sm">Reset Password</Button>
              </div>
              <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-red-50 border border-red-200 transition-colors">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
