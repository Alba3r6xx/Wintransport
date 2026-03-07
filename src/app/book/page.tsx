"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const departures = [
  { id: 1, time: "05:00 AM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 18, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging"] },
  { id: 2, time: "06:30 AM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 10, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging"] },
  { id: 3, time: "08:00 AM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 5, bus: "AC Mini Bus", amenities: ["AC", "Comfortable Seats"] },
  { id: 4, time: "10:00 AM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 22, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging", "Entertainment"] },
  { id: 5, time: "12:00 PM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 15, bus: "AC Coach", amenities: ["AC", "Reclining Seats"] },
  { id: 6, time: "02:00 PM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 20, bus: "AC Mini Bus", amenities: ["AC", "Comfortable Seats"] },
  { id: 7, time: "04:00 PM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 8, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging"] },
  { id: 8, time: "06:00 PM", from: "Takoradi (Market Circle)", to: "KNUST (Tech Junction)", duration: "3h 30m", price: 80, seatsLeft: 12, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging", "Entertainment"] },
];

const departuresReverse = [
  { id: 9, time: "05:00 AM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 16, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging"] },
  { id: 10, time: "06:30 AM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 14, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging"] },
  { id: 11, time: "08:00 AM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 9, bus: "AC Mini Bus", amenities: ["AC", "Comfortable Seats"] },
  { id: 12, time: "10:00 AM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 20, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging", "Entertainment"] },
  { id: 13, time: "12:00 PM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 18, bus: "AC Coach", amenities: ["AC", "Reclining Seats"] },
  { id: 14, time: "02:00 PM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 11, bus: "AC Mini Bus", amenities: ["AC", "Comfortable Seats"] },
  { id: 15, time: "04:00 PM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 6, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging"] },
  { id: 16, time: "06:00 PM", from: "KNUST (Tech Junction)", to: "Takoradi (Market Circle)", duration: "3h 30m", price: 80, seatsLeft: 19, bus: "AC Coach", amenities: ["AC", "Reclining Seats", "USB Charging", "Entertainment"] },
];

export default function BookPage() {
  const [direction, setDirection] = useState<"takoradi-knust" | "knust-takoradi">("takoradi-knust");
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);

  const trips = direction === "takoradi-knust" ? departures : departuresReverse;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">Book Your Trip</h1>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Direction</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-500 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <select
                  value={direction}
                  onChange={(e) => { setDirection(e.target.value as typeof direction); setSelectedTrip(null); }}
                  className="flex-1 bg-transparent outline-none"
                >
                  <option value="takoradi-knust">Takoradi → KNUST</option>
                  <option value="knust-takoradi">KNUST → Takoradi</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Travel Date</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-500 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="date" className="flex-1 bg-transparent outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Passengers</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-500 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <select className="flex-1 bg-transparent outline-none">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4+ Passengers</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Route Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-semibold">{direction === "takoradi-knust" ? "Takoradi" : "KNUST"}</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-semibold">{direction === "takoradi-knust" ? "KNUST" : "Takoradi"}</span>
            </div>
            <div className="h-6 w-px bg-gray-300 hidden sm:block" />
            <span className="text-gray-500 text-sm">~3.5 hours</span>
          </div>
          <p className="text-sm text-gray-500"><span className="font-semibold text-gray-900">{trips.length} departures</span> available</p>
        </div>

        {/* Departure List */}
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-6 border-2 cursor-pointer ${
                selectedTrip === trip.id ? "border-orange-500" : "border-gray-100 hover:border-orange-200"
              }`}
              onClick={() => setSelectedTrip(trip.id)}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Time & Route */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-4 mb-4 items-center">
                    <div>
                      <div className="text-2xl font-bold">{trip.time}</div>
                      <div className="text-sm text-gray-600">{trip.from}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">{trip.duration}</div>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t-2 border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                          <svg className="w-6 h-6 bg-white text-orange-500 px-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {/* Calculate arrival: parse time + 3.5h */}
                        {(() => {
                          const [h, m] = trip.time.replace(/ AM| PM/, "").split(":").map(Number);
                          const isPM = trip.time.includes("PM");
                          let hours24 = isPM && h !== 12 ? h + 12 : !isPM && h === 12 ? 0 : h;
                          let arrH = hours24 + 3;
                          let arrM = m + 30;
                          if (arrM >= 60) { arrH += 1; arrM -= 60; }
                          const arrPM = arrH >= 12;
                          const displayH = arrH > 12 ? arrH - 12 : arrH === 0 ? 12 : arrH;
                          return `${String(displayH).padStart(2, "0")}:${String(arrM).padStart(2, "0")} ${arrPM ? "PM" : "AM"}`;
                        })()}
                      </div>
                      <div className="text-sm text-gray-600">{trip.to}</div>
                    </div>
                  </div>

                  {/* Bus type + Amenities */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium">{trip.bus}</span>
                    {trip.amenities.map((a) => (
                      <span key={a} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg">{a}</span>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex-shrink-0 flex flex-col items-end justify-between border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-600">GH₵{trip.price}</div>
                    <div className="text-sm text-gray-600">per person</div>
                    <div className={`text-xs font-medium mt-1 ${trip.seatsLeft <= 8 ? "text-red-600" : "text-green-600"}`}>
                      {trip.seatsLeft} seats left
                    </div>
                  </div>
                  <button
                    className={`w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-all text-center ${
                      selectedTrip === trip.id
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-xl"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedTrip === trip.id ? "Book This Trip" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Tips */}
        <div className="mt-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 lg:p-8">
          <h3 className="text-xl font-semibold mb-4">Travel Tips</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium mb-1">Arrive Early</div>
                <div className="text-sm text-gray-600">Please arrive at the terminal 15 minutes before departure</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium mb-1">Valid ID Required</div>
                <div className="text-sm text-gray-600">Carry a valid ID card for verification at boarding</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium mb-1">Group Bookings</div>
                <div className="text-sm text-gray-600">Traveling with 5+ people? Contact us for group rates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
