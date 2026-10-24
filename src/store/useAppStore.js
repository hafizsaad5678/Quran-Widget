import { STREAK_ENABLED } from "../constants/features";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDailyAyah } from "../constants/quranCurated";
// REMOVED: import { syncNow } from "../services/cloudSyncService"; - No cloud sync needed

const todayKey = () => new Date().toISOString().slice(0, 10);
const DAILY_STREAK_GOAL_SECONDS = 5 * 60;
const DEFAULT_COLLECTIONS = [
  {
    id: "sabr",
    name: "Sabr (Patience)",
    ayahIds: [],
    color: "#b0926a",
    icon: "leaf",
  },
  {
    id: "shukr",
    name: "Shukr (Gratitude)",
    ayahIds: [],
    color: "#574a1e",
    icon: "hands-pray",
  },
];

const buildNextStreak = (streak, dateKey) => {
  if (!STREAK_ENABLED) return streak;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  const current = streak.lastReadDate === yesterdayKey ? streak.current + 1 : 1;

  return {
    ...streak,
    current,
    best: Math.max(streak.best || 0, current),
    lastReadDate: dateKey,
    readDays: { ...streak.readDays, [dateKey]: true },
  };
};

export const useAppStore = create(
  persist(
    (set, get) => ({
      // State
      favorites: [],
      notes: {},
      history: [],
      collections: DEFAULT_COLLECTIONS,
      streak: {
        current: 0,
        best: 0,
        lastReadDate: null,
        readDays: {},
      },
      appUsageSecondsByDay: {},
      lastSession: null, // { date, durationMinutes, surahName }
      settings: {
        translationKey: "sahih",
        themeMode: "auto", // 'light', 'dark', 'auto'
        widgetMode: "daily",
        widgetStyleName: "goldClassic",
        widgetTapAction: "home",
        widgetFontSettings: {
          arabicSize: 20,
          translationSize: 14,
          lineSpacing: 1.25,
          arabicFont: "platform",
          translationFont: "platform",
        },
        reminderSettings: {
          enabled: true,
          window: "morning",
          customHour: 8,
          customMinute: 0,
        },
      },

      // Actions - LOCAL ONLY (no cloud sync)
      toggleFavorite: (ayahId) => {
        const { favorites } = get();
        const exists = favorites.includes(ayahId);
        const next = exists
          ? favorites.filter((id) => id !== ayahId)
          : [ayahId, ...favorites];
        set({ favorites: next });
        // REMOVED: void syncNow(); - No cloud sync
      },

      saveNote: (ayahId, noteText) => {
        set((state) => ({ notes: { ...state.notes, [ayahId]: noteText } }));
        // REMOVED: void syncNow(); - No cloud sync
      },

      addToHistory: (ayah) => {
        if (!ayah?.id) return;
        const now = new Date();
        const date = now.toISOString();
        const dateKey = date.slice(0, 10);
        const withMeta = {
          ...ayah,
          timestamp: ayah.timestamp || date,
          dateKey: ayah.dateKey || dateKey,
        };
        set((state) => {
          const next = [
            withMeta,
            ...state.history.filter((item) => item.id !== ayah.id),
          ].slice(0, 20);
          return { history: next };
        });
        // REMOVED: void syncNow(); - No cloud sync
      },

      // Streak tracking - LOCAL ONLY (no cloud sync)
      addAppUsageSeconds: (seconds = 30) => {
        const dateKey = todayKey();
        const { appUsageSecondsByDay, streak } = get();
        const prev = Number(appUsageSecondsByDay[dateKey] || 0);
        const nextSeconds = Math.min(
          24 * 60 * 60,
          prev + Math.max(1, Number(seconds || 30)),
        );
        const nextUsage = { ...appUsageSecondsByDay, [dateKey]: nextSeconds };

        if (
          !streak.readDays[dateKey] &&
          nextSeconds >= DAILY_STREAK_GOAL_SECONDS
        ) {
          const nextStreak = buildNextStreak(streak, dateKey);
          set({ appUsageSecondsByDay: nextUsage, streak: nextStreak });
          // REMOVED: void syncNow(); - No cloud sync
          return;
        }

        set({ appUsageSecondsByDay: nextUsage });
      },

      // Streak tracking - LOCAL ONLY (no cloud sync)
      completeReadingSession: (durationSeconds = 0, surahName = "") => {
        const dateKey = todayKey();
        const { appUsageSecondsByDay, streak } = get();

        const safeSeconds = Math.max(0, Number(durationSeconds || 0));
        const prevUsage = Number(appUsageSecondsByDay[dateKey] || 0);
        const nextSeconds = Math.min(24 * 60 * 60, prevUsage + safeSeconds);
        const nextUsage = { ...appUsageSecondsByDay, [dateKey]: nextSeconds };

        let nextStreak = streak;
        if (
          !streak.readDays[dateKey] &&
          nextSeconds >= DAILY_STREAK_GOAL_SECONDS
        ) {
          nextStreak = buildNextStreak(streak, dateKey);
        }

        set({
          appUsageSecondsByDay: nextUsage,
          streak: nextStreak,
          lastSession: {
            date: dateKey,
            durationMinutes: Math.round(safeSeconds / 60),
            surahName,
          },
        });

        // REMOVED: void syncNow(); - No cloud sync
      },

      // Streak tracking - LOCAL ONLY (no cloud sync)
      markReadToday: () => {
        const dateKey = todayKey();
        const { streak } = get();
        if (!STREAK_ENABLED || streak.readDays[dateKey]) return; // already read today

        const nextStreak = buildNextStreak(streak, dateKey);

        set({ streak: nextStreak });
        // REMOVED: void syncNow(); - No cloud sync
      },

      recordSession: (durationMinutes, surahName) => {
        set({ lastSession: { date: todayKey(), durationMinutes, surahName } });
        // REMOVED: void syncNow(); - No cloud sync
      },

      updateSettings: (partial) => {
        set((state) => ({ 
          settings: { 
            ...state.settings, 
            ...partial,
            // If widgetFontSettings is updated, ensure it syncs properly
            widgetFontSettings: partial.widgetFontSettings 
              ? { ...state.settings.widgetFontSettings, ...partial.widgetFontSettings }
              : state.settings.widgetFontSettings
          } 
        }));
        // REMOVED: void syncNow(); - No cloud sync
      },

      addCollection: (collection) => {
        set((state) => ({ collections: [...state.collections, collection] }));
        // REMOVED: void syncNow(); - No cloud sync
      },

      toggleAyahInCollection: (collectionId, ayahId) => {
        set((state) => {
          const collections = state.collections.map((c) => {
            if (c.id === collectionId) {
              const exists = c.ayahIds.includes(ayahId);
              const nextIds = exists
                ? c.ayahIds.filter((id) => id !== ayahId)
                : [...c.ayahIds, ayahId];
              return { ...c, ayahIds: nextIds };
            }
            return c;
          });
          return { collections };
        });
        // REMOVED: void syncNow(); - No cloud sync
      },

      resetUserData: () => {
        set((state) => ({
          favorites: [],
          notes: {},
          history: [],
          collections: DEFAULT_COLLECTIONS,
          streak: {
            current: 0,
            best: 0,
            lastReadDate: null,
            readDays: {},
          },
          appUsageSecondsByDay: {},
          lastSession: null,
          settings: {
            ...state.settings,
            translationKey: "sahih",
            widgetMode: "daily",
            widgetStyleName: "goldClassic",
            widgetTapAction: "home",
            widgetFontSettings: {
              arabicSize: 20,
              translationSize: 14,
              lineSpacing: 1.25,
            },
            reminderSettings: {
              enabled: true,
              window: "morning",
              customHour: 8,
              customMinute: 0,
            },
          },
        }));
      },

      // Selectors / Helpers
      getStreakStats: () => {
        const { streak } = get();
        const weekly = [];
        for (let i = 6; i >= 0; i -= 1) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          weekly.push({
            key,
            read: Boolean(streak.readDays[key]),
            label: d.toLocaleDateString(undefined, { weekday: "short" }),
          });
        }
        return {
          current: streak.current || 0,
          best: streak.best || 0,
          weekly,
        };
      },

      resolveWidgetAyah: (allAyat) => {
        const { settings, favorites } = get();
        if (settings.widgetMode === "favorite" && favorites.length > 0) {
          const found = allAyat.find((item) => item.id === favorites[0]);
          if (found) return found;
        }
        return getDailyAyah() || allAyat[0] || null;
      },
    }),
    {
      name: "sanctuary-app-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
