import { create } from "zustand";
import type { Profile, Trip, SeatInfo } from "./types";

interface AppState {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  authLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
  selectedTrip: Trip | null;
  setSelectedTrip: (trip: Trip | null) => void;
  selectedSeats: string[];
  toggleSeat: (seatNumber: string) => void;
  clearSeats: () => void;
  seatMap: SeatInfo[];
  setSeatMap: (seats: SeatInfo[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  authLoading: true,
  setAuthLoading: (loading) => set({ authLoading: loading }),
  selectedTrip: null,
  setSelectedTrip: (trip) => set({ selectedTrip: trip }),
  selectedSeats: [],
  toggleSeat: (seatNumber) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.includes(seatNumber)
        ? state.selectedSeats.filter((s) => s !== seatNumber)
        : [...state.selectedSeats, seatNumber],
    })),
  clearSeats: () => set({ selectedSeats: [] }),
  seatMap: [],
  setSeatMap: (seats) => set({ seatMap: seats }),
}));
