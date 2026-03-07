import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Safety First",
    description: "Every bus undergoes rigorous maintenance checks. Our drivers are trained professionals with years of experience on the Takoradi–KNUST route.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Punctuality",
    description: "We respect your time. Our buses depart on schedule, every day, rain or shine. You can count on us to get you there when we say we will.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Customer Care",
    description: "Our friendly team is always ready to assist. From booking to arrival, we make sure every passenger has a pleasant experience.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Growth & Innovation",
    description: "We continuously invest in better buses, improved technology, and new ways to make your journey more comfortable and convenient.",
    color: "from-green-500 to-emerald-500",
  },
];

const milestones = [
  { year: "2020", title: "Founded", description: "WinTransport started with 2 buses serving the Takoradi–KNUST corridor." },
  { year: "2021", title: "Fleet Expansion", description: "Grew to 6 AC coaches and added more daily departures to meet demand." },
  { year: "2023", title: "10,000 Passengers", description: "Reached our first major milestone — 10,000 happy passengers served." },
  { year: "2025", title: "Online Booking", description: "Launched our online booking platform for seamless trip reservations." },
  { year: "2026", title: "50K+ Passengers", description: "Surpassed 50,000 passengers with a 4.8-star rating and growing fleet." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">About WinTransport</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connecting Takoradi and KNUST with safe, reliable, and comfortable bus service since 2020.
            We&apos;re more than a transport service — we&apos;re your trusted travel partner.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Story</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  WinTransport was born out of a simple observation: students, lecturers, and professionals 
                  traveling between Takoradi and KNUST deserved a better, more reliable transport option.
                </p>
                <p>
                  Founded in 2020, we started with just two buses and a vision — to provide a safe, 
                  comfortable, and punctual bus service on one of the busiest corridors in the Western 
                  and Ashanti regions of Ghana.
                </p>
                <p>
                  Today, we operate a growing fleet of air-conditioned coaches, serving thousands of 
                  passengers every month. Our commitment to safety, punctuality, and passenger comfort 
                  has earned us a reputation as the most trusted transport service on the Takoradi–KNUST route.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 sm:p-12">
                <Image
                  src="/logo.png"
                  alt="WinTransport"
                  width={300}
                  height={100}
                  className="w-full max-w-xs mx-auto mb-6"
                />
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">50K+</div>
                    <div className="text-sm text-gray-600">Passengers Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">5+</div>
                    <div className="text-sm text-gray-600">Years of Service</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">12+</div>
                    <div className="text-sm text-gray-600">Daily Departures</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">4.8★</div>
                    <div className="text-sm text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything we do is guided by these core principles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${v.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-lg text-gray-600">Key milestones in our growth</p>
          </div>

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                  {m.year}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold mb-1">{m.title}</h3>
                  <p className="text-gray-600 text-sm">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Route */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Route</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One dedicated route, perfected over years of service
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-orange-500 rounded-full" />
                  <div>
                    <div className="font-semibold text-lg">Takoradi (Market Circle Terminal)</div>
                    <div className="text-sm text-gray-500">Western Region, Ghana</div>
                  </div>
                </div>
                <div className="ml-2 border-l-2 border-dashed border-orange-300 h-12" />
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full" />
                  <div>
                    <div className="font-semibold text-lg">KNUST (Tech Junction Terminal)</div>
                    <div className="text-sm text-gray-500">Kumasi, Ashanti Region, Ghana</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700"><strong>Duration:</strong> ~3.5 hours</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700"><strong>Departures:</strong> 8 daily (each direction)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-gray-700"><strong>Fare:</strong> GH₵80 per person</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700"><strong>First Departure:</strong> 5:00 AM daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Experience the WinTransport Difference
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied passengers who trust us for their Takoradi–KNUST travels.
          </p>
          <Link
            href="/book"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>Book Your Trip Today</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
