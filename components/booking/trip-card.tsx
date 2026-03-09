"use client";

import { Clock, MapPin, Bus, Wifi, Zap } from "lucide-react";
import { cn, formatTime, formatCurrency } from "@/lib/utils";
import type { Trip } from "@/lib/types";

interface TripCardProps {
  trip: Trip;
  onSelect: (trip: Trip) => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  AC: <Zap size={12} />,
  WiFi: <Wifi size={12} />,
};

export default function TripCard({ trip, onSelect }: TripCardProps) {
  return (
    <button
      onClick={() => onSelect(trip)}
      className="w-full text-left bg-white border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted mb-2">
            <Bus size={13} className="text-accent" />
            <span className="font-medium">{trip.bus?.name || "WinTransport"}</span>
            {trip.bus?.plate_number && (
              <span className="text-muted/60">· {trip.bus.plate_number}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div>
              <p className="text-lg font-bold">{formatTime(trip.departure_time)}</p>
              <p className="text-xs text-muted">{trip.origin}</p>
            </div>
            <div className="flex-1 flex items-center gap-1 px-2">
              <div className="h-px flex-1 bg-border" />
              <MapPin size={14} className="text-accent shrink-0" />
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{formatTime(trip.arrival_time)}</p>
              <p className="text-xs text-muted">{trip.destination}</p>
            </div>
          </div>

          {trip.bus?.amenities && trip.bus.amenities.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {trip.bus.amenities.map((a) => (
                <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface text-[10px] text-muted font-medium">
                  {amenityIcons[a] || null} {a}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-xl font-black text-accent">{formatCurrency(trip.price)}</p>
          <p className="text-[10px] text-muted mt-0.5">per seat</p>
          <div className="mt-3 px-4 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            Select →
          </div>
        </div>
      </div>
    </button>
  );
}
