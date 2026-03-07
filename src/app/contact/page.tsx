"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqItems = [
  {
    q: "What is the fare from Takoradi to KNUST?",
    a: "The fare is GH₵80 per person for a one-way trip. Group discounts are available for parties of 5 or more — contact us for details.",
  },
  {
    q: "How long does the trip take?",
    a: "The journey takes approximately 3 hours and 30 minutes, depending on traffic and road conditions.",
  },
  {
    q: "What time do buses depart?",
    a: "We have 8 daily departures in each direction. The first bus departs at 5:00 AM, and the last at 6:00 PM. Check the booking page for the full schedule.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes, cancellations made at least 24 hours before departure are eligible for a full refund. Rescheduling is free and subject to seat availability.",
  },
  {
    q: "Where are the terminals located?",
    a: "In Takoradi, our terminal is at Market Circle. In Kumasi, our terminal is at Tech Junction, near the KNUST campus main gate.",
  },
  {
    q: "Do your buses have air conditioning?",
    a: "Yes, all our coaches are fully air-conditioned with reclining seats, USB charging ports, and ample legroom.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have a question, need help with a booking, or want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    placeholder="Kwame"
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    placeholder="Asante"
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <select className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-colors">
                  <option>General Inquiry</option>
                  <option>Booking Help</option>
                  <option>Cancellation / Refund</option>
                  <option>Group Booking</option>
                  <option>Partnership / Business</option>
                  <option>Feedback / Complaint</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Map Placeholder */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Takoradi Terminal</div>
                    <div className="text-sm text-gray-600">Market Circle, Takoradi, Western Region</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">KNUST Terminal</div>
                    <div className="text-sm text-gray-600">Tech Junction, KNUST Campus, Kumasi</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <div className="text-sm text-gray-600">+233 XX XXX XXXX</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-sm text-gray-600">info@wintransport.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Operating Hours</div>
                    <div className="text-sm text-gray-600">Daily: 4:30 AM – 7:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold pr-4">{item.q}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
