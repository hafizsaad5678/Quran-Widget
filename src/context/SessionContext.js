import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { pushUserDataToCloud } from "../services/cloudSyncService";
import { isSupabaseConfigured } from "../services/supabaseClient";
import { useAppStore } from "../store/useAppStore";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const completeReadingSession = useAppStore((s) => s.completeReadingSession);

  const [session, setSession] = useState(null);
  // session: { durationSeconds, surahName, surahNumber, remaining, running, completed, abandoned }

  const intervalRef = useRef(null);
  const streakMarked = useRef(false);

  const formatted = session
    ? (() => {
        const m = Math.floor(session.remaining / 60);
        const s = session.remaining % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      })()
    : null;

  // Countdown tick
  useEffect(() => {
    if (!session?.running) return;
    intervalRef.current = setInterval(() => {
      setSession((prev) => {
        if (!prev) return null;
        if (prev.remaining <= 1) {
          clearInterval(intervalRef.current);
          return { ...prev, remaining: 0, running: false, completed: true };
        }
        return { ...prev, remaining: prev.remaining - 1 };
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [session?.running]);

  // On natural completion
  useEffect(() => {
    if (!session?.completed || streakMarked.current) return;
    streakMarked.current = true;
    completeReadingSession(session.durationSeconds, session.surahName);
    // Cloud sync is disabled (offline app): skip the connectivity ping.
    if (isSupabaseConfigured)
    fetch("https://www.google.com/generate_204", {
      method: "HEAD",
      cache: "no-cache",
    })
      .then((res) => {
        if (res.status === 204 || res.ok) void pushUserDataToCloud();
      })
      .catch(() => {});
  }, [
    completeReadingSession,
    session?.completed,
    session?.durationSeconds,
    session?.surahName,
  ]);

  const startSession = useCallback(
    (durationSeconds, surahName, surahNumber = 1) => {
      streakMarked.current = false;
      setSession({
        durationSeconds,
        surahName,
        surahNumber,
        remaining: durationSeconds,
        running: true,
        completed: false,
        abandoned: false,
      });
    },
    [],
  );

  const pauseSession = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, running: false } : null));
  }, []);

  const resumeSession = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, running: true } : null));
  }, []);

  // User ends early — no streak
  const abandonSession = useCallback(() => {
    clearInterval(intervalRef.current);
    setSession((prev) =>
      prev ? { ...prev, running: false, abandoned: true } : null,
    );
    setTimeout(() => setSession(null), 100);
  }, []);

  // Called after completion alert is dismissed
  const clearSession = useCallback(() => {
    setSession(null);
    streakMarked.current = false;
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        formatted,
        startSession,
        pauseSession,
        resumeSession,
        abandonSession,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
