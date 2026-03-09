"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle } from "lucide-react";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function SignupContent() {
  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) { setError("Please enter your full name."); return; }
    if (!formData.email.trim()) { setError("Please enter your email address."); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setError("");
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { full_name: formData.fullName, phone: formData.phone } },
      });
      if (authError) { setError(authError.message); setLoading(false); return; }
      router.push(`/login?registered=true${redirectTo ? `&redirect=${redirectTo}` : ""}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const fields = [
    { key: "fullName", label: "Full Name", type: "text", icon: User, placeholder: "Kwame Mensah" },
    { key: "phone", label: "Phone", type: "tel", icon: Phone, placeholder: "0XX XXX XXXX" },
    { key: "email", label: "Email", type: "email", icon: Mail, placeholder: "you@example.com" },
    { key: "password", label: "Password", type: "password", icon: Lock, placeholder: "••••••••" },
  ];

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Logo dark />
            <span className="font-bold text-xl">WinTransport</span>
          </Link>
          <h1 className="text-2xl font-black">Create your account</h1>
          <p className="text-muted text-sm mt-1">Start booking seats in seconds</p>
        </div>

        <form onSubmit={handleSignup} noValidate className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1.5">{f.label}</label>
              <div className="relative">
                <f.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type={f.type}
                  value={formData[f.key as keyof typeof formData]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  autoComplete={f.type === "email" ? "email" : f.type === "password" ? "new-password" : f.type === "tel" ? "tel" : "name"}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm"
                />
              </div>
            </div>
          ))}

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
            Create Account <ArrowRight size={16} />
          </Button>

          <p className="text-center text-xs text-muted pt-1">
            Already have an account?{" "}
            <Link href={`/login${redirectTo ? `?redirect=${redirectTo}` : ""}`} className="text-accent hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" /></div>}>
      <SignupContent />
    </Suspense>
  );
}
