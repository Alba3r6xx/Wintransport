export type UserRole = "customer" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface Bus {
  id: string;
  name: string;
  plate_number: string;
  total_seats: number;
  seat_layout: SeatLayout;
  amenities: string[];
  is_active: boolean;
  created_at: string;
}

export interface SeatLayout {
  rows: number;
  columns: number;
  aisle_after_column: number;
  unavailable_seats: string[];
}

export interface Trip {
  id: string;
  bus_id: string;
  bus?: Bus;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  status: "scheduled" | "boarding" | "departed" | "arrived" | "cancelled";
  created_at: string;
}

export type BookingStatus = "reserved" | "confirmed" | "cancelled" | "expired";

export interface Booking {
  id: string;
  trip_id: string;
  trip?: Trip;
  user_id: string;
  user?: Profile;
  seat_number: string;
  status: BookingStatus;
  payment_deadline: string;
  paid_at?: string;
  created_at: string;
}

export interface SeatInfo {
  seat_number: string;
  status: "available" | "reserved" | "confirmed";
  occupant_name?: string;
  booking_id?: string;
}
