import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Safe & Reliable",
    description: "Well-maintained buses, experienced drivers, and strict safety protocols for every trip.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Always On Time",
    description: "Consistent departure schedules from 5:00 AM. We value your time as much as you do.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Affordable Fares",
    description: "Competitive pricing for students and regular commuters. Group discounts available.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Comfortable Ride",
    description: "Air-conditioned buses with reclining seats, ample legroom, and onboard entertainment.",
    color: "from-purple-500 to-pink-500",
  },
];

const stats = [
  { label: "Happy Passengers", value: "50K+" },
  { label: "Daily Trips", value: "12+" },
  { label: "Years of Service", value: "5+" },
  { label: "Customer Rating", value: "4.8★" },
];

const testimonials = [
  {
    name: "Kwame Asante",
    role: "KNUST Student",
    comment: "WinTransport is my go-to for traveling between campus and home in Takoradi. Always on time and the buses are very comfortable.",
    rating: 5,
  },
  {
    name: "Ama Serwah",
    role: "Business Professional",
    comment: "I commute weekly for work. The consistency and reliability of WinTransport saves me so much stress. Highly recommended!",
    rating: 5,
  },
  {
    name: "Kofi Mensah",
    role: "Lecturer, KNUST",
    comment: "Great service, friendly staff, and the booking process is seamless. Best transport option on this route by far.",
    rating: 5,
  },
];

const howItWorks = [
  { step: "1", title: "Choose Your Trip", description: "Select your departure point — Takoradi or KNUST — and pick your travel date." },
  { step: "2", title: "Pick a Departure", description: "Browse available departure times and choose the one that fits your schedule." },
  { step: "3", title: "Book Your Seat", description: "Reserve your seat online or at our terminal. Receive instant confirmation." },
  { step: "4", title: "Travel & Arrive", description: "Board the bus, enjoy a comfortable ride, and arrive safely at your destination." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-amber-600/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Takoradi ↔ KNUST Express
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                Travel Between{" "}
                <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                  Takoradi &amp; KNUST
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                Reliable, comfortable, and affordable bus service connecting Takoradi and KNUST campus. 
                Book your seat and travel with confidence.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <span>Book a Seat</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:shadow-xl transition-all border-2 border-gray-200"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Quick Booking Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Quick Booking</h3>
                    <p className="text-sm text-gray-500">Takoradi ↔ KNUST</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Direction</label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <select className="flex-1 bg-transparent outline-none text-gray-700">
                        <option>Takoradi → KNUST</option>
                        <option>KNUST → Takoradi</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Travel Date</label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input type="date" className="flex-1 bg-transparent outline-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Passengers</label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <select className="flex-1 bg-transparent outline-none text-gray-700">
                        <option>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3 Passengers</option>
                        <option>4+ Passengers</option>
                      </select>
                    </div>
                  </div>

                  <Link
                    href="/book"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                  >
                    Search Departures
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Booking your trip with WinTransport is quick and easy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                WinTransport
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to making your Takoradi–KNUST journey the best it can be
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Passengers
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              See what our travelers have to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{t.comment}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Travel?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your Takoradi ↔ KNUST trip today. Comfortable buses, reliable schedules, and affordable fares.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/book"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Book Your Seat Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-semibold hover:bg-white/20 transition-all border-2 border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
