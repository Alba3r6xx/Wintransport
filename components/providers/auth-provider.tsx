"use client";

import { useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/lib/store";
import type { Profile } from "@/lib/types";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAppStore((s) => s.setUser);
  const setAuthLoading = useAppStore((s) => s.setAuthLoading);
  const resolved = useRef(false);

  const fetchAndSetProfile = useCallback(
    async (
      supabase: ReturnType<typeof createClient>,
      userId: string,
      email: string,
      meta?: Record<string, unknown>
    ) => {
      try {
        const timeout = new Promise<null>((r) => setTimeout(() => r(null), 6000));
        const query = supabase.from("profiles").select("*").eq("id", userId).single();
        const result = await Promise.race([query, timeout]);

        const profile = result && typeof result === "object" && "data" in result ? (result as { data: Profile | null }).data : null;

        if (profile) {
          setUser(profile as Profile);
        } else {
          const newProfile: Profile = {
            id: userId,
            email,
            full_name: (meta?.full_name as string) || "",
            phone: (meta?.phone as string) || "",
            role: "customer",
            created_at: new Date().toISOString(),
          };
          await Promise.race([
            supabase.from("profiles").upsert(newProfile, { onConflict: "id" }),
            new Promise((r) => setTimeout(r, 4000)),
          ]);
          setUser(newProfile);
        }
      } catch {
        setUser({ id: userId, email, full_name: "", phone: "", role: "customer", created_at: new Date().toISOString() });
      }
    },
    [setUser]
  );

  const markDone = useCallback(() => {
    if (!resolved.current) {
      resolved.current = true;
      setAuthLoading(false);
    }
  }, [setAuthLoading]);

  useEffect(() => {
    const supabase = createClient();

    // Safety timeout: never let authLoading hang more than 8 seconds
    const safetyTimer = setTimeout(markDone, 8000);

    const checkSession = async () => {
      try {
        const sessionTimeout = new Promise<{ data: { session: null } }>((r) =>
          setTimeout(() => r({ data: { session: null } }), 6000)
        );
        const { data: { session } } = await Promise.race([
          supabase.auth.getSession(),
          sessionTimeout,
        ]);
        if (session?.user) {
          await fetchAndSetProfile(supabase, session.user.id, session.user.email!, session.user.user_metadata);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        markDone();
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") { setUser(null); return; }
      if (session?.user) {
        await fetchAndSetProfile(supabase, session.user.id, session.user.email!, session.user.user_metadata);
        markDone();
      }
    });

    return () => {
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, [setUser, setAuthLoading, fetchAndSetProfile, markDone]);

  return <>{children}</>;
}
