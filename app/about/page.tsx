import { Shield, Users, Clock, Heart, Target, Zap } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";

const values = [
  { icon: Shield, title: "Safety First", desc: "GPS-tracked buses, verified drivers, and regularly inspected vehicles ensure your journey is always secure." },
  { icon: Users, title: "Community Driven", desc: "Built by students, for students. We understand the Takoradi-KNUST corridor because we've traveled it ourselves." },
  { icon: Clock, title: "Always On Time", desc: "99.2% on-time departure rate. We respect your schedule and plan accordingly." },
  { icon: Heart, title: "Rider Focused", desc: "From seat selection to luggage handling, every feature is designed with your comfort in mind." },
  { icon: Target, title: "Transparent Pricing", desc: "No hidden fees, no surge pricing. What you see is what you pay, always." },
  { icon: Zap, title: "Tech Forward", desc: "Real-time tracking, instant booking confirmations, and seamless mobile payments." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              About <span className="text-gradient-orange">WinTransport</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              The Tadi-to-Tech express that doesn&apos;t stress you. We&apos;re building the most reliable, comfortable, and affordable bus service between Takoradi and KNUST.
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-2xl border border-border p-8 mb-12 animate-fade-in-up stagger-1">
            <h2 className="text-2xl font-black mb-4">Our Story</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>WinTransport was born from a simple frustration: the Takoradi to KNUST journey shouldn&apos;t be a gamble. Too many students and commuters faced unreliable schedules, uncomfortable rides, and opaque pricing.</p>
              <p>We set out to change that. By combining modern technology with a deep understanding of the Western Region&apos;s transport needs, we created a service that puts riders first — every single trip.</p>
              <p>Today, we&apos;re proud to serve thousands of riders monthly, maintaining a 99.2% on-time rate and a 4.8-star satisfaction score. But we&apos;re just getting started.</p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-2xl font-black text-center mb-8">What We Stand For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-6 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center mb-4">
                    <v.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in-up">
            <h2 className="text-2xl font-black mb-3">Ready to experience the difference?</h2>
            <p className="text-muted mb-6">Book your first ride and see why thousands trust WinTransport.</p>
            <Button href="/booking" variant="accent" size="lg">Book a Seat</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
