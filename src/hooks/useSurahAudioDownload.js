import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  deleteSurahAudio,
  downloadSurahAudio,
  getSurahAudioStatus,
} from "../services/audioStore";

/** Download / remove a surah's recitation for offline use. */
export const useSurahAudioDownload = (surahNumber) => {
  const [tick, setTick] = useState(0);
  const [progress, setProgress] = useState(null); // { surah, done, total }
  const [downloadingSurah, setDownloadingSurah] = useState(null);
  const [error, setError] = useState("");
  const tokenRef = useRef({ cancelled: false });

  // Stop an in-flight download when leaving this surah / unmounting.
  useEffect(() => {
    return () => {
      tokenRef.current.cancelled = true;
    };
  }, [surahNumber]);

  const downloading = downloadingSurah === surahNumber;

  const status = useMemo(() => {
    if (downloading && progress?.surah === surahNumber) {
      return {
        done: progress.done,
        total: progress.total,
        complete: progress.done === progress.total,
      };
    }
    // `tick` forces a re-read of the files after a download / delete.
    void tick;
    return getSurahAudioStatus(surahNumber);
  }, [downloading, progress, surahNumber, tick]);

  const start = useCallback(async () => {
    const token = { cancelled: false };
    tokenRef.current = token;
    setError("");
    setDownloadingSurah(surahNumber);
    const result = await downloadSurahAudio(
      surahNumber,
      (done, total) => setProgress({ surah: surahNumber, done, total }),
      token,
    );
    setDownloadingSurah(null);
    setTick((t) => t + 1);
    if (!result.complete && !result.cancelled) {
      setError("Download incomplete. Check your internet and try again.");
    }
    return result;
  }, [surahNumber]);

  const cancel = useCallback(() => {
    tokenRef.current.cancelled = true;
  }, []);

  const remove = useCallback(() => {
    deleteSurahAudio(surahNumber);
    setTick((t) => t + 1);
  }, [surahNumber]);

  return { status, downloading, error, start, cancel, remove };
};
