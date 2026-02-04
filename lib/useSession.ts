"use client";

import { useEffect, useState } from "react";

type SessionUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

type SessionResponse = {
  data?: {
    user?: SessionUser | null;
    session?: Record<string, unknown> | null;
  } | null;
  user?: SessionUser | null;
  session?: Record<string, unknown> | null;
  error?: unknown;
};

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/auth/get-session", {
          method: "GET",
          credentials: "include"
        });
        const payload = (await response.json()) as SessionResponse;
        if (!isMounted) return;
        const resolvedUser = payload?.data?.user ?? payload?.user ?? null;
        setUser(resolvedUser);
      } catch {
        if (!isMounted) return;
        setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
}
