-- ============================================================
-- WinTransport Supabase Migration
-- Consolidated RLS policies, triggers, views
-- ============================================================

-- ═══ TABLES ═══

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone text,
  role text NOT NULL DEFAULT 'passenger' CHECK (role IN ('passenger', 'admin')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.buses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  plate_number text NOT NULL UNIQUE,
  total_seats integer NOT NULL DEFAULT 45,
  seat_layout jsonb NOT NULL DEFAULT '{"rows":10,"columns":4,"aisle_after_column":2,"unavailable_seats":[]}',
  amenities text[] DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id uuid NOT NULL REFERENCES public.buses(id) ON DELETE CASCADE,
  origin text NOT NULL,
  destination text NOT NULL,
  departure_time timestamptz NOT NULL,
  arrival_time timestamptz NOT NULL,
  price numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'boarding', 'departed', 'completed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seat_number text NOT NULL,
  status text NOT NULL DEFAULT 'reserved' CHECK (status IN ('reserved', 'confirmed', 'cancelled', 'expired')),
  payment_deadline timestamptz,
  paid_at timestamptz,
  paystack_reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (trip_id, seat_number)
);

-- ═══ INDEXES ═══

CREATE INDEX IF NOT EXISTS idx_trips_departure ON public.trips(departure_time);
CREATE INDEX IF NOT EXISTS idx_trips_status ON public.trips(status);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trip ON public.bookings(trip_id);

-- ═══ AUTO-CREATE PROFILE TRIGGER ═══

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'passenger'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ═══ SEAT OCCUPANCY VIEW (security_invoker) ═══

CREATE OR REPLACE VIEW public.seat_occupancy
WITH (security_invoker = true)
AS
SELECT
  b.trip_id,
  b.seat_number,
  b.status,
  b.id AS booking_id,
  p.full_name AS occupant_name
FROM public.bookings b
LEFT JOIN public.profiles p ON p.id = b.user_id
WHERE b.status IN ('reserved', 'confirmed');

-- ═══ ENABLE RLS ═══

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- ═══ DROP ALL EXISTING POLICIES (clean slate) ═══

DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('profiles', 'buses', 'trips', 'bookings')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END;
$$;

-- ═══ PROFILES POLICIES ═══

-- Users can read their own profile; admins can read all
CREATE POLICY profiles_select ON public.profiles
  FOR SELECT USING (
    id = (SELECT auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Users can insert their own profile
CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT WITH CHECK (id = (SELECT auth.uid()));

-- Users can update their own profile
CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

-- ═══ BUSES POLICIES ═══

-- Everyone can read active buses; admins can read all
CREATE POLICY buses_select ON public.buses
  FOR SELECT USING (
    is_active = true
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Admin CRUD
CREATE POLICY buses_insert ON public.buses
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

CREATE POLICY buses_update ON public.buses
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

CREATE POLICY buses_delete ON public.buses
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- ═══ TRIPS POLICIES ═══

-- Everyone can read non-cancelled trips; admins can read all
CREATE POLICY trips_select ON public.trips
  FOR SELECT USING (
    status != 'cancelled'
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Admin CRUD
CREATE POLICY trips_insert ON public.trips
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

CREATE POLICY trips_update ON public.trips
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

CREATE POLICY trips_delete ON public.trips
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- ═══ BOOKINGS POLICIES ═══

-- Users see own bookings; admins see all
CREATE POLICY bookings_select ON public.bookings
  FOR SELECT USING (
    user_id = (SELECT auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Authenticated users can create bookings for themselves
CREATE POLICY bookings_insert ON public.bookings
  FOR INSERT WITH CHECK (
    user_id = (SELECT auth.uid())
  );

-- Users can update own bookings; admins can update all
CREATE POLICY bookings_update ON public.bookings
  FOR UPDATE USING (
    user_id = (SELECT auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Admins can delete bookings
CREATE POLICY bookings_delete ON public.bookings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );
