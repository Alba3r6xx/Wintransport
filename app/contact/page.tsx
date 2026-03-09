"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Contact <span className="text-gradient-orange">Us</span>
            </h1>
            <p className="text-lg text-muted max-w-xl mx-auto">Have a question or feedback? We&apos;d love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4 animate-fade-in-up stagger-1">
              {[
                { icon: Phone, label: "Phone", value: "+233 XX XXX XXXX", sub: "Mon-Fri, 8am-6pm" },
                { icon: Mail, label: "Email", value: "info@wintransport.com", sub: "We reply within 24 hours" },
                { icon: MapPin, label: "Office", value: "Takoradi, Western Region", sub: "Ghana" },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl border border-border p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5">{c.label}</p>
                    <p className="font-semibold text-sm">{c.value}</p>
                    <p className="text-xs text-muted">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 animate-fade-in-up stagger-2">
              {sent ? (
                <div className="bg-white rounded-2xl border border-border p-8 text-center">
                  <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-muted">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-border p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help?" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm resize-none" />
                  </div>
                  <Button type="submit" variant="accent" size="lg" className="w-full">
                    <Send size={16} /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
