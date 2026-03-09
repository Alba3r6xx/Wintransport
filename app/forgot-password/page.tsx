"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (err) { setError(err.message); } else { setSent(true); }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Logo dark />
            <span className="font-bold text-xl">WinTransport</span>
          </Link>
          <h1 className="text-2xl font-black">Reset password</h1>
          <p className="text-muted text-sm mt-1">We&apos;ll send you a reset link</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle2 size={40} className="text-success mx-auto mb-3" />
              <p className="font-semibold">Check your email</p>
              <p className="text-sm text-muted mt-1">We sent a reset link to {email}</p>
              <Button href="/login" variant="outline" size="sm" className="mt-4">
                <ArrowLeft size={14} /> Back to login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
                </div>
              </div>
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
              <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">Send Reset Link</Button>
              <p className="text-center text-xs text-muted">
                <Link href="/login" className="text-accent hover:underline">Back to login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
