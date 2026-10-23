import { Audio } from "../services/audioCompat";
import * as Network from "expo-network";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLocalAudioUri } from "../services/audioStore";
import { useAppStore } from "../store/useAppStore";

const AYAH_AUDIO_ENDPOINT = "https://api.alquran.cloud/v1/ayah";
const AYAH_AUDIO_CDN = "https://cdn.islamic.network/quran/audio/128/ar.alafasy";

const buildCdnAudioUrl = (ayah) => {
  if (!ayah?.globalAyahNumber) return null;
  return `${AYAH_AUDIO_CDN}/${ayah.globalAyahNumber}.mp3`;
};

/**
 * Handles ayah tap logic:
 * - Adds to history (Zustand → auto-syncs to Supabase)
 * - Marks streak for today (respects daily-once rule)
 */
export const useAyahInteraction = () => {
  const addToHistory = useAppStore((s) => s.addToHistory);
  const markReadToday = useAppStore((s) => s.markReadToday);
  const soundRef = useRef(null);
  const preloadedSoundRef = useRef(null);
  const preloadedIndexRef = useRef(-1);
  const queueRef = useRef([]);
  const indexRef = useRef(-1);
  const stoppedRef = useRef(false);
  const [activeAyahId, setActiveAyahId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const unloadCurrentAudio = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch (_error) {
      soundRef.current = null;
    }
  }, []);

  const unloadPreloadedAudio = useCallback(async () => {
    try {
      if (preloadedSoundRef.current) {
        await preloadedSoundRef.current.unloadAsync();
        preloadedSoundRef.current = null;
      }
      preloadedIndexRef.current = -1;
    } catch (_error) {
      preloadedSoundRef.current = null;
      preloadedIndexRef.current = -1;
    }
  }, []);

  const clearPlaybackState = useCallback(() => {
    queueRef.current = [];
    indexRef.current = -1;
    preloadedIndexRef.current = -1;
    setActiveAyahId(null);
    setIsPlaying(false);
  }, []);

  const resolveAyahAudioUrl = useCallback(async (ayah) => {
    // Offline first: use the downloaded file when it exists.
    const localUri = getLocalAudioUri(ayah?.globalAyahNumber);
    if (localUri) return localUri;

    let audioUrl = buildCdnAudioUrl(ayah);
    if (audioUrl) return audioUrl;

    const endpoint = `${AYAH_AUDIO_ENDPOINT}/${ayah.surahNumber}:${ayah.ayahNumber}/ar.alafasy`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Audio API request failed.");
    }

    const payload = await response.json();
    audioUrl = payload?.data?.audio;
    if (!audioUrl) {
      throw new Error("Audio URL missing in API response.");
    }

    return audioUrl;
  }, []);

  const preloadQueueAt = useCallback(
    async (index) => {
      const queue = queueRef.current;
      if (!queue.length || index >= queue.length || stoppedRef.current) {
        await unloadPreloadedAudio();
        return;
      }

      if (preloadedSoundRef.current && preloadedIndexRef.current === index) {
        return;
      }

      const ayah = queue[index];

      try {
        const audioUrl = await resolveAyahAudioUrl(ayah);
        await unloadPreloadedAudio();

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
        );

        preloadedSoundRef.current = sound;
        preloadedIndexRef.current = index;
      } catch (_error) {
        // Ignore preload failures; normal playback path will retry.
      }
    },
    [resolveAyahAudioUrl, unloadPreloadedAudio],
  );

  const playQueueAt = useCallback(
    async (index) => {
      if (stoppedRef.current) return { ok: false, message: "Stopped." };

      const queue = queueRef.current;
      if (!queue.length || index >= queue.length) {
        await unloadCurrentAudio();
        clearPlaybackState();
        return { ok: true, message: "Surah recitation completed." };
      }

      const ayah = queue[index];
      indexRef.current = index;
      setActiveAyahId(ayah.id);
      setIsPlaying(true);

      try {
        let sound = null;

        if (preloadedSoundRef.current && preloadedIndexRef.current === index) {
          sound = preloadedSoundRef.current;
          preloadedSoundRef.current = null;
          preloadedIndexRef.current = -1;

          await unloadCurrentAudio();
          soundRef.current = sound;
          await sound.playAsync();
        } else {
          const audioUrl = await resolveAyahAudioUrl(ayah);
          await unloadCurrentAudio();

          const created = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: true },
          );
          sound = created.sound;
          soundRef.current = sound;
        }

        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status?.isLoaded) return;
          if (
            status.didJustFinish &&
            !status.isLooping &&
            !stoppedRef.current
          ) {
            void playQueueAt(index + 1);
          }
        });

        void preloadQueueAt(index + 1);
        return { ok: true, message: "Playing recitation." };
      } catch (_error) {
        await unloadCurrentAudio();
        await unloadPreloadedAudio();
        clearPlaybackState();
        return { ok: false, message: "Could not play ayah audio." };
      }
    },
    [
      clearPlaybackState,
      preloadQueueAt,
      resolveAyahAudioUrl,
      unloadCurrentAudio,
      unloadPreloadedAudio,
    ],
  );

  const stopAyah = useCallback(
    async (ayahId) => {
      if (!activeAyahId || (ayahId && activeAyahId !== ayahId)) {
        return { ok: false, message: "No active recitation for this ayah." };
      }
      stoppedRef.current = true;
      await unloadCurrentAudio();
      await unloadPreloadedAudio();
      clearPlaybackState();
      return { ok: true, message: "Recitation stopped." };
    },
    [
      activeAyahId,
      clearPlaybackState,
      unloadCurrentAudio,
      unloadPreloadedAudio,
    ],
  );

  const pauseAyah = useCallback(
    async (ayahId) => {
      if (!soundRef.current || activeAyahId !== ayahId) {
        return { ok: false, message: "No active recitation for this ayah." };
      }
      try {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        return { ok: true, message: "Paused." };
      } catch (_error) {
        return { ok: false, message: "Could not pause recitation." };
      }
    },
    [activeAyahId],
  );

  const resumeAyah = useCallback(
    async (ayahId) => {
      if (!soundRef.current || activeAyahId !== ayahId) {
        return { ok: false, message: "No paused recitation for this ayah." };
      }
      try {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        return { ok: true, message: "Resumed." };
      } catch (_error) {
        return { ok: false, message: "Could not resume recitation." };
      }
    },
    [activeAyahId],
  );

  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      void unloadCurrentAudio();
      void unloadPreloadedAudio();
    };
  }, [unloadCurrentAudio, unloadPreloadedAudio]);

  const onAyahTap = useCallback(
    async (ayah, surahAyahs = []) => {
      if (!ayah) {
        return { ok: false, message: "Ayah not found." };
      }

      addToHistory(ayah);
      markReadToday();

      const network = await Network.getNetworkStateAsync();
      const hasInternet =
        network.isConnected !== false && network.isInternetReachable !== false;
      if (!hasInternet && !getLocalAudioUri(ayah.globalAyahNumber)) {
        return {
          ok: false,
          message: "No internet. Download this surah's audio to listen offline.",
        };
      }

      const queueSource =
        Array.isArray(surahAyahs) && surahAyahs.length ? surahAyahs : [ayah];
      const sorted = [...queueSource].sort(
        (a, b) => Number(a.ayahNumber) - Number(b.ayahNumber),
      );
      const startIndex = Math.max(
        0,
        sorted.findIndex((item) => item.id === ayah.id),
      );

      queueRef.current = sorted.slice(startIndex);
      indexRef.current = 0;
      stoppedRef.current = false;
      await unloadPreloadedAudio();

      const result = await playQueueAt(0);
      if (!result.ok) {
        clearPlaybackState();
      }
      return result;
    },
    [
      addToHistory,
      clearPlaybackState,
      markReadToday,
      playQueueAt,
      unloadPreloadedAudio,
    ],
  );

  return {
    onAyahTap,
    activeAyahId,
    isPlaying,
    pauseAyah,
    resumeAyah,
    stopAyah,
  };
};
