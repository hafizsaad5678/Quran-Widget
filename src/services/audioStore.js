/**
 * Offline audio store (Mishary Alafasy, per-ayah MP3).
 *
 * Audio is far too large to ship inside the app (~300-600 MB), so the user
 * downloads surahs once ("Download for offline"). Playback then prefers the
 * local file and only streams from the CDN when a file is missing.
 */
import { Directory, File, Paths } from "expo-file-system";
import { getSurah } from "../constants/quranCurated";

const CDN = "https://cdn.islamic.network/quran/audio/128/ar.alafasy";
const MIN_VALID_BYTES = 2000;
const CONCURRENCY = 4;

const audioDir = () => new Directory(Paths.document, "audio-alafasy");
const fileFor = (globalAyah) => new File(audioDir(), `${globalAyah}.mp3`);

export const remoteAudioUrl = (globalAyah) => `${CDN}/${globalAyah}.mp3`;

const isValid = (file) => {
  try {
    return file.exists && (file.size ?? 0) >= MIN_VALID_BYTES;
  } catch (_error) {
    return false;
  }
};

/** file:// uri of the downloaded ayah, or null when not downloaded. */
export const getLocalAudioUri = (globalAyah) => {
  if (!globalAyah) return null;
  try {
    const f = fileFor(globalAyah);
    return isValid(f) ? f.uri : null;
  } catch (_error) {
    return null;
  }
};

/** Local uri when downloaded, otherwise the streaming url. */
export const resolveAudioSource = (globalAyah) =>
  getLocalAudioUri(globalAyah) ?? remoteAudioUrl(globalAyah);

const surahGlobals = (surahNumber) =>
  getSurah(surahNumber).map((a) => a.globalAyahNumber);

export const getSurahAudioStatus = (surahNumber) => {
  const globals = surahGlobals(surahNumber);
  const done = globals.filter((g) => getLocalAudioUri(g)).length;
  return { done, total: globals.length, complete: done === globals.length };
};

/**
 * Download every missing ayah of a surah.
 * onProgress(done, total). Pass an object { cancelled: false } as `token`
 * and set token.cancelled = true to stop. Resolves with the final status.
 */
export const downloadSurahAudio = async (
  surahNumber,
  onProgress,
  token = { cancelled: false },
) => {
  const globals = surahGlobals(surahNumber);
  const dir = audioDir();
  if (!dir.exists) dir.create({ intermediates: true });

  let done = globals.filter((g) => getLocalAudioUri(g)).length;
  onProgress?.(done, globals.length);
  const queue = globals.filter((g) => !getLocalAudioUri(g));
  let failed = 0;

  const worker = async () => {
    while (queue.length && !token.cancelled) {
      const g = queue.shift();
      const target = fileFor(g);
      try {
        await File.downloadFileAsync(remoteAudioUrl(g), target, {
          idempotent: true,
        });
        if (!isValid(target)) throw new Error("Incomplete download");
        done += 1;
        onProgress?.(done, globals.length);
      } catch (_error) {
        failed += 1;
        try {
          if (target.exists) target.delete();
        } catch (_e) {
          // ignore
        }
      }
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return {
    done,
    total: globals.length,
    complete: done === globals.length,
    failed,
    cancelled: Boolean(token.cancelled),
  };
};

export const deleteSurahAudio = (surahNumber) => {
  surahGlobals(surahNumber).forEach((g) => {
    try {
      const f = fileFor(g);
      if (f.exists) f.delete();
    } catch (_error) {
      // ignore
    }
  });
};
