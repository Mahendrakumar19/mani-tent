'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity
const WARNING_BEFORE_MS = 2 * 60 * 1000; // show warning 2 minutes before expiry
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'touchstart', 'scroll'] as const;

/**
 * SessionTimeoutProvider implements client-side idle session timeout
 * for the admin panel. When the admin is inactive for 30 minutes,
 * the session cookie is cleared via the logout API and the user is
 * redirected to the login page.
 *
 * The server cookie (admin-auth) maxAge remains 24 hours for legitimate
 * multi-day sessions; this client guard protects unattended tabs.
 */
export default function SessionTimeoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSecondsLeft(null);
    clearIntervalRef();
    intervalRef.current = setInterval(() => {
      const idleFor = Date.now() - lastActivityRef.current;
      const remaining = SESSION_TIMEOUT_MS - idleFor;

      if (remaining <= 0) {
        clearIntervalRef();
        handleTimeout();
        return;
      }

      setSecondsLeft(
        remaining <= WARNING_BEFORE_MS ? Math.ceil(remaining / 1000) : null
      );
    }, 1000);
  }, []);

  const handleTimeout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({ logout: true }),
      });
    } catch (error) {
      console.error('Session timeout logout failed:', error);
    } finally {
      window.location.href = '/admin/login?reason=session-timeout';
    }
  };

  const stayLoggedIn = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSecondsLeft(null);
  }, []);

  useEffect(() => {
    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true })
    );
    resetTimer();

    return () => {
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      clearIntervalRef();
    };
  }, [resetTimer]);

  return (
    <>
      {children}
      {secondsLeft != null && (
        <div className="fixed top-0 left-0 right-0 z-[100] p-4 pointer-events-none">
          <div className="mx-auto max-w-md bg-red-900 border border-red-700 rounded-lg p-6 shadow-2xl pointer-events-auto">
            <h3 className="text-lg font-bold text-red-100 mb-2">
              Session Expiring Soon
            </h3>
            <p className="text-red-200 mb-4">
              Your admin session will expire in <strong>{secondsLeft}s</strong>
              due to inactivity.
            </p>
            <button
              onClick={() => {
                stayLoggedIn();
                // Keep showing timer but reset
                setTimeout(() => setSecondsLeft(120), 500);
              }}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      )}
    </>
  );
}
