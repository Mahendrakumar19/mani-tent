'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity
const WARNING_BEFORE_MS = 2 * 60 * 1000; // show warning 2 min before expiry
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'touchstart', 'scroll'] as const;

interface UseAdminSessionOptions {
  enabled?: boolean;
  timeoutMs?: number;
}

/**
 * Client-side idle session timeout for the admin panel.
 * The server cookie expires after 24h; this logs the admin out after
 * a period of inactivity so an unattended tab does not stay authenticated.
 */
export function useAdminSession({
  enabled = true,
  timeoutMs = SESSION_TIMEOUT_MS,
}: UseAdminSessionOptions = {}) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({ logout: true }),
      });
    } catch (error) {
      console.error('Session timeout logout failed:', error);
    } finally {
      router.push('/admin/login?reason=timeout');
    }
  }, [router]);

  useEffect(() => {
    if (!enabled) return;

    const recordActivity = () => {
      lastActivityRef.current = Date.now();
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, recordActivity, { passive: true })
    );

    const interval = setInterval(() => {
      const idleFor = Date.now() - lastActivityRef.current;
      const remaining = timeoutMs - idleFor;

      if (remaining <= 0) {
        clearInterval(interval);
        void logout();
        return;
      }

      setSecondsLeft(remaining <= WARNING_BEFORE_MS ? Math.ceil(remaining / 1000) : null);
    }, 1000);

    return () => {
      clearInterval(interval);
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, recordActivity)
      );
    };
  }, [enabled, timeoutMs, logout]);

  return {
    secondsLeft,
    stayLoggedIn: useCallback(() => {
      lastActivityRef.current = Date.now();
      setSecondsLeft(null);
    }, []),
    logout,
  };
}
