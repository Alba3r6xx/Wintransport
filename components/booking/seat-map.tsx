"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Clock, X, User, Disc } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SeatInfo } from "@/lib/types";

interface SeatMapProps {
  seats: SeatInfo[];
  selectedSeats: string[];
  onToggleSeat: (seatNumber: string) => void;
  rows: number;
  columns: number;
  aisleAfterColumn: number;
}

export default function SeatMap({
  seats,
  selectedSeats,
  onToggleSeat,
  rows,
  columns,
  aisleAfterColumn,
}: SeatMapProps) {
  const [detailSeat, setDetailSeat] = useState<SeatInfo | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getSeatInfo = (seatNumber: string): SeatInfo => {
    return seats.find((s) => s.seat_number === seatNumber) || { seat_number: seatNumber, status: "available" };
  };

  const handleSeatClick = (info: SeatInfo) => {
    if (info.status === "confirmed" || info.status === "reserved") {
      setDetailSeat(detailSeat?.seat_number === info.seat_number ? null : info);
    } else {
      onToggleSeat(info.seat_number);
      setDetailSeat(null);
    }
  };

  const hasBackRow = rows >= 10;
  const standardRows = hasBackRow ? rows - 1 : rows;

  return (
    <div className="flex flex-col items-center select-none w-full max-w-3xl mx-auto font-sans pb-24 sm:pb-12">

      {/* Bus shell */}
      <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-b from-slate-50 to-white rounded-t-[3rem] rounded-b-2xl border border-border/70 shadow-sm overflow-hidden">

        {/* Driver area */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-slate-100 to-slate-50 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-6 h-6 rounded-full border-2 border-slate-400 flex items-center justify-center">
                <Disc size={12} className="text-slate-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Driver</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Front</span>
            </div>
          </div>
        </div>

        {/* Seats area */}
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="min-w-max flex flex-col items-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-5 sm:py-6">
            {/* Standard Rows */}
            {Array.from({ length: standardRows }).map((_, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={cn(
                  "flex items-center gap-3 sm:gap-5 transition-all duration-500 ease-out",
                  isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: `${rowIndex * 35}ms` }}
              >
                {/* Row label */}
                <div className="w-5 text-center text-[9px] font-bold text-slate-300 tabular-nums">{rowIndex + 1}</div>

                <div className="flex gap-1.5 sm:gap-2">
                  {Array.from({ length: columns }).map((_, colIndex) => {
                    const seatNum = String(rowIndex * columns + 1 + colIndex);
                    const info = getSeatInfo(seatNum);
                    const isSelected = selectedSeats.includes(seatNum);
                    const isActiveDetail = detailSeat?.seat_number === seatNum;
                    const isAfterAisle = colIndex === aisleAfterColumn;

                    return (
                      <div key={seatNum} className={cn("flex relative", isAfterAisle && "ml-5 sm:ml-8")}>
                        {isAfterAisle && (
                          <div className="absolute -left-3.5 sm:-left-5.5 top-0 bottom-0 w-2 sm:w-3 flex justify-center items-center pointer-events-none">
                            <div className="w-px h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                          </div>
                        )}
                        <SeatButton
                          info={info}
                          isSelected={isSelected}
                          isActiveDetail={isActiveDetail}
                          onClick={() => handleSeatClick(info)}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="w-5 text-center text-[9px] font-bold text-slate-300 tabular-nums">{rowIndex + 1}</div>
              </div>
            ))}

            {/* Back Row (5 seats across) */}
            {hasBackRow && (
              <div
                className={cn(
                  "flex items-center gap-3 sm:gap-5 mt-2 pt-3 border-t border-dashed border-slate-200 transition-all duration-500 ease-out",
                  isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: `${standardRows * 35}ms` }}
              >
                <div className="w-5 text-center text-[9px] font-bold text-slate-300 tabular-nums">{rows}</div>
                <div className="flex gap-1.5 sm:gap-2">
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    const seatNum = String(standardRows * columns + 1 + colIndex);
                    const info = getSeatInfo(seatNum);
                    const isSelected = selectedSeats.includes(seatNum);
                    const isActiveDetail = detailSeat?.seat_number === seatNum;

                    return (
                      <SeatButton
                        key={seatNum}
                        info={info}
                        isSelected={isSelected}
                        isActiveDetail={isActiveDetail}
                        onClick={() => handleSeatClick(info)}
                      />
                    );
                  })}
                </div>
                <div className="w-5 text-center text-[9px] font-bold text-slate-300 tabular-nums">{rows}</div>
              </div>
            )}
          </div>
        </div>

        {/* Rear bar */}
        <div className="px-6 py-3 bg-gradient-to-t from-slate-100 to-slate-50 border-t border-border/50 flex items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rear</span>
        </div>
      </div>

      {/* Detail Panel */}
      {detailSeat && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-[55] animate-fade-in-up">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-border/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className={cn(
              "absolute top-0 inset-x-0 h-1 rounded-t-2xl",
              detailSeat.status === "confirmed" ? "bg-accent" : "bg-amber-400"
            )} />
            <div className="p-4 sm:p-5 flex gap-4 items-center">
              <div className={cn(
                "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-black shrink-0",
                detailSeat.status === "confirmed"
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-amber-50 text-amber-600 border border-amber-200"
              )}>
                {detailSeat.seat_number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 min-w-0">
                    <User size={14} className="text-muted shrink-0" />
                    <h4 className="font-bold text-text truncate text-sm">
                      {detailSeat.occupant_name || "Unknown"}
                    </h4>
                  </div>
                  <button
                    onClick={() => setDetailSeat(null)}
                    className="w-7 h-7 rounded-full bg-surface hover:bg-surface-hover flex items-center justify-center text-muted hover:text-text transition-colors shrink-0 ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mt-1.5">
                  {detailSeat.status === "confirmed" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle2 size={10} /> Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                      <Clock size={10} /> Reserved
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-5 px-4 py-3 bg-white rounded-xl border border-border/50 shadow-sm">
        <LegendItem color="bg-white border-slate-200" label="Available" />
        <LegendItem color="bg-accent border-accent" label="Selected" icon={<CheckCircle2 size={10} className="text-white" />} />
        <LegendItem color="bg-amber-50 border-amber-300 border-dashed" label="Reserved" icon={<Clock size={9} className="text-amber-500" />} />
        <LegendItem color="bg-slate-100 border-slate-200" label="Occupied" icon={<User size={9} className="text-slate-400" />} />
      </div>
    </div>
  );
}

/* ─── SeatButton ─── */

function SeatButton({
  info,
  isSelected,
  isActiveDetail,
  onClick,
}: {
  info: SeatInfo;
  isSelected: boolean;
  isActiveDetail: boolean;
  onClick: () => void;
}) {
  const isOccupied = info.status === "confirmed" || info.status === "reserved";

  const base = "relative w-12 h-[3.5rem] sm:w-14 sm:h-16 rounded-t-2xl rounded-b-lg transition-all duration-200 ease-out flex flex-col items-center justify-center cursor-pointer";

  let classes = "";
  let inner = null;

  if (isSelected) {
    classes = "bg-accent border border-accent text-white shadow-[0_4px_16px_-2px_rgba(249,115,22,0.5)] scale-105 -translate-y-0.5 z-10";
    inner = (
      <>
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
        <CheckCircle2 size={18} strokeWidth={2.5} className="relative z-10" />
      </>
    );
  } else if (info.status === "confirmed") {
    classes = "bg-slate-100 border border-slate-200 text-slate-400 opacity-70";
    inner = (
      <div className="flex flex-col items-center gap-0.5 relative z-10">
        <User size={13} className="opacity-50" />
        <span className="text-[9px] font-bold opacity-50">{info.seat_number}</span>
      </div>
    );
  } else if (info.status === "reserved") {
    classes = "bg-amber-50 border-2 border-dashed border-amber-300 text-amber-600 hover:border-amber-400 hover:bg-amber-100/60";
    inner = (
      <div className="flex flex-col items-center gap-0.5 relative z-10">
        <Clock size={12} className="opacity-70" />
        <span className="text-[9px] font-bold">{info.seat_number}</span>
      </div>
    );
  } else {
    classes = "bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5 hover:bg-accent/5 active:scale-95";
    inner = <span className="relative z-10 text-sm font-semibold">{info.seat_number}</span>;
  }

  const ring = isActiveDetail ? "ring-[3px] ring-accent/40 border-transparent scale-105 z-10" : "";

  return (
    <button
      onClick={onClick}
      className={cn(base, classes, ring)}
      aria-label={`Seat ${info.seat_number}`}
    >
      {/* Headrest */}
      <div className={cn(
        "absolute top-1 inset-x-2 h-1.5 rounded-full",
        isSelected ? "bg-white/25" : isOccupied ? "bg-slate-200" : "bg-slate-100"
      )} />
      {/* Left armrest */}
      <div className={cn(
        "absolute left-0.5 top-3.5 bottom-2 w-[3px] rounded-full",
        isSelected ? "bg-white/15" : "bg-slate-100"
      )} />
      {/* Right armrest */}
      <div className={cn(
        "absolute right-0.5 top-3.5 bottom-2 w-[3px] rounded-full",
        isSelected ? "bg-white/15" : "bg-slate-100"
      )} />
      {inner}
    </button>
  );
}

/* ─── LegendItem ─── */

function LegendItem({ color, label, icon }: { color: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("w-5 h-5 rounded border flex items-center justify-center", color)}>
        {icon}
      </div>
      <span className="text-[11px] font-semibold text-slate-500">{label}</span>
    </div>
  );
}
