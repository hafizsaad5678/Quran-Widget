/**
 * Thin expo-av style wrapper on top of expo-audio.
 * expo-av was removed in newer Expo SDKs; this keeps the existing
 * `Audio.Sound.createAsync(...)` call sites working unchanged.
 */
import { createAudioPlayer } from "expo-audio";

const wrapPlayer = (player) => {
  let listener = null;
  let subscription = null;
  let released = false;

  const attach = () => {
    if (subscription || !listener) return;
    subscription = player.addListener("playbackStatusUpdate", (status) => {
      listener?.({
        isLoaded: status?.isLoaded ?? true,
        didJustFinish: Boolean(status?.didJustFinish),
        isLooping: Boolean(status?.loop),
        isPlaying: Boolean(status?.playing),
      });
    });
  };

  return {
    playAsync: async () => player.play(),
    pauseAsync: async () => player.pause(),
    stopAsync: async () => {
      player.pause();
      await player.seekTo(0);
    },
    unloadAsync: async () => {
      if (released) return;
      released = true;
      try {
        subscription?.remove();
      } catch (_error) {
        // ignore
      }
      subscription = null;
      listener = null;
      player.remove();
    },
    setOnPlaybackStatusUpdate: (cb) => {
      listener = cb;
      attach();
    },
  };
};

export const Audio = {
  Sound: {
    createAsync: async (source, { shouldPlay = false } = {}) => {
      const player = createAudioPlayer(source);
      if (shouldPlay) player.play();
      return { sound: wrapPlayer(player) };
    },
  },
};
