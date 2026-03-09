import Image from "next/image";
import { Shield, Clock, MapPin, ArrowRight, CheckCircle2, Phone, CreditCard, Package, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background overflow-x-hidden">

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[#0c0f14]" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-transparent to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-20">
            <div className="flex flex-col items-center text-center">

              <div className="animate-fade-in-up mb-1">
                <Image src="/newlogo.png" alt="WinTransport" width={500} height={500} className="w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain" priority />
              </div>

              <h1 className="animate-fade-in-up stagger-1 max-w-3xl">
                <span className="block text-[2.2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                  The bus service that<br />
                  <span className="text-gradient-orange">respects your time.</span>
                </span>
              </h1>

              <p className="animate-fade-in-up stagger-3 mt-5 sm:mt-6 text-sm sm:text-base text-white/40 max-w-md leading-relaxed">
                Pick your exact seat, pay with mobile money, and track your bus — all from your phone. No queues, no guessing.
              </p>

              <div className="animate-fade-in-up stagger-4 mt-8 flex flex-col sm:flex-row items-center gap-3">
                <Button href="/booking" size="lg" variant="accent" className="min-w-[200px] text-base py-3.5">
                  Book a Seat <ArrowRight size={16} />
                </Button>
                <Button href="/about" size="lg" variant="ghost" className="min-w-[180px] text-base text-white/50 border border-white/[0.08] hover:bg-white/[0.04] hover:text-white/70 py-3.5">
                  How It Works
                </Button>
              </div>

              {/* Route card */}
              <div className="animate-fade-in-up stagger-4 mt-14 w-full max-w-lg">
                <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">From</p>
                        <p className="text-xl sm:text-2xl font-black text-white">Takoradi</p>
                        <p className="text-[11px] text-white/30 mt-0.5">Market Circle Station</p>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full border border-white/20" />
                          <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-white/10 via-orange-500/40 to-white/10" />
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <span className="text-[9px] text-white/20 font-medium">~3.5 hrs</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">To</p>
                        <p className="text-xl sm:text-2xl font-black text-white">KNUST</p>
                        <p className="text-[11px] text-white/30 mt-0.5">Tech Junction</p>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div><p className="text-[9px] text-white/20 uppercase">Next bus</p><p className="text-xs text-white/60 font-semibold">6:00 AM</p></div>
                        <div><p className="text-[9px] text-white/20 uppercase">From</p><p className="text-xs text-accent font-bold">GH₵ 80</p></div>
                        <div><p className="text-[9px] text-white/20 uppercase">Seats left</p><p className="text-xs text-white/60 font-semibold">12</p></div>
                      </div>
                      <Button href="/booking" variant="accent" size="sm" className="text-xs px-3 py-1.5">
                        Book <ChevronRight size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST BAR ═══ */}
        <section className="py-5 border-b border-border bg-white">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-text-secondary">
              {[
                { icon: CheckCircle2, text: "DVLA Registered Fleet" },
                { icon: Shield, text: "Insured Journeys" },
                { icon: CreditCard, text: "Paystack Secured" },
                { icon: Phone, text: "24/7 Rider Support" },
              ].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 font-medium">
                  <t.icon size={13} className="text-accent" /> {t.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="mb-12">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">How it works</p>
              <h2 className="text-2xl sm:text-3xl font-black text-text">Booked in under a minute.</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                { step: "01", title: "Search your route", desc: "Choose Takoradi → KNUST or the reverse, pick a date, and see every available departure.", color: "from-orange-500/10 to-orange-500/5" },
                { step: "02", title: "Pick your seat", desc: "Our interactive bus map shows exactly which seats are open, reserved, or taken — in real time.", color: "from-orange-500/10 to-orange-500/5" },
                { step: "03", title: "Pay & ride", desc: "Pay instantly with mobile money or card via Paystack — or reserve now and pay within 5 days.", color: "from-orange-500/10 to-orange-500/5" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className={`rounded-2xl bg-gradient-to-br ${item.color} border border-border p-6 h-full`}>
                    <span className="text-3xl sm:text-4xl font-black text-accent/15 block mb-3">{item.step}</span>
                    <h3 className="text-base font-bold text-text mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className="py-16 sm:py-24 bg-surface border-y border-border">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="mb-12">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Built for this route</p>
              <h2 className="text-2xl sm:text-3xl font-black text-text">Everything a Tadi–KNUST rider needs.</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, title: "Interactive Seat Selection", desc: "See the full bus layout. Pick window, aisle, or sit with friends." },
                { icon: CreditCard, title: "Flexible Payment", desc: "Pay now for instant confirmation or reserve and pay within 5 days." },
                { icon: Shield, title: "Verified & Insured", desc: "Every bus is DVLA-registered, regularly serviced, and fully insured." },
                { icon: Clock, title: "99.2% On-Time Rate", desc: "We leave when we say we leave. Track your bus in real time." },
                { icon: Package, title: "Luggage & Cargo", desc: "Moving to campus? Add fridges, ACs, and furniture right from the booking page." },
                { icon: Phone, title: "Rider Support", desc: "Call or message us anytime. Real humans, not bots." },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border hover:border-accent/15 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-accent/8 flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon size={17} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text mb-0.5">{f.title}</h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="py-14 bg-background">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: "5,200+", label: "Riders served" },
                { value: "99.2%", label: "On-time departures" },
                { value: "4.8/5", label: "Rider satisfaction" },
                { value: "3.5 hrs", label: "Average trip time" },
              ].map((s, i) => (
                <div key={i} className="animate-count-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <p className="text-2xl sm:text-3xl font-black text-text">{s.value}</p>
                  <p className="text-xs text-text-secondary mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-16 sm:py-20 bg-[#0c0f14]">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <Image src="/newlogo.png" alt="WinTransport" width={120} height={120} className="w-12 h-12 object-contain mx-auto mb-5 opacity-60" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">Your next trip is one tap away.</h2>
            <p className="mt-3 text-white/35 text-sm sm:text-base max-w-md mx-auto">No sign-up required to browse. Book a seat, pick up your luggage add-ons, and you&apos;re set.</p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/booking" size="lg" variant="accent" className="min-w-[200px] text-base py-3.5">
                Book Now <ArrowRight size={16} />
              </Button>
              <Button href="/contact" size="lg" variant="ghost" className="min-w-[180px] text-base text-white/40 border border-white/[0.08] hover:bg-white/[0.04] hover:text-white/60 py-3.5">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
