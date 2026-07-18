import { useEffect, useRef, useState } from "react";
import { pushUserDataToCloud } from "../services/cloudSyncService";
import { useAppStore } from "../store/useAppStore";

/**
 * useReadingSession
 * Manages a timed reading session.
 * - Counts down from `durationSeconds`
 * - On completion: marks streak + records session locally, attempts cloud sync
 */
export const useReadingSession = (durationSeconds, surahName = "") => {
  const completeReadingSession = useAppStore((s) => s.completeReadingSession);

  const [remaining, setRemaining] = useState(durationSeconds);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef(null);
  const streakMarked = useRef(false);

  const formatted = (() => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  })();

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(durationSeconds);
    setCompleted(false);
    streakMarked.current = false;
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (!completed || streakMarked.current) return;
    streakMarked.current = true;

    completeReadingSession(durationSeconds, surahName);

    // Try cloud sync
    fetch("https://www.google.com/generate_204", {
      method: "HEAD",
      cache: "no-cache",
    })
      .then((res) => {
        if (res.status === 204 || res.ok) void pushUserDataToCloud();
      })
      .catch(() => {});
  }, [completed, completeReadingSession, durationSeconds, surahName]);

  return { remaining, formatted, running, completed, start, pause, reset };
};
