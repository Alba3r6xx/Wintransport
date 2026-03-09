"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showRegistered, setShowRegistered] = useState(false);
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  // Hydration-safe: read searchParams in useEffect only
  useEffect(() => {
    if (searchParams.get("registered")) setShowRegistered(true);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true);
    setError("");
    try {
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out. Please try again.")), 15000));
      const authPromise = supabase.auth.signInWithPassword({ email: email.trim(), password });
      const { error: authError } = await Promise.race([authPromise, timeoutPromise]) as Awaited<typeof authPromise>;
      if (authError) { setError(authError.message); setLoading(false); return; }
      setSuccess(true);
      setLoading(false);
      await new Promise((r) => setTimeout(r, 400));
      window.location.href = redirectTo || "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Logo dark />
            <span className="font-bold text-xl">WinTransport</span>
          </Link>
          <h1 className="text-2xl font-black">Welcome back</h1>
          <p className="text-muted text-sm mt-1">Sign in to manage your bookings</p>
        </div>

        {showRegistered && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} /> Account created! Please sign in.
          </div>
        )}

        <form onSubmit={handleLogin} noValidate className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
            {success ? <><CheckCircle2 size={16} /> Signed in!</> : <>Sign In <ArrowRight size={16} /></>}
          </Button>

          <div className="flex items-center justify-between text-xs text-muted pt-1">
            <Link href="/forgot-password" className="hover:text-accent transition-colors">Forgot password?</Link>
            <Link href={`/signup${redirectTo ? `?redirect=${redirectTo}` : ""}`} className="hover:text-accent transition-colors">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
