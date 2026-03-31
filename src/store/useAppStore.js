import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getDailyAyah } from '../constants/quranCurated';
import { syncNow } from '../services/cloudSyncService';

const todayKey = () => new Date().toISOString().slice(0, 10);

export const useAppStore = create(
  persist(
    (set, get) => ({
      // State
      favorites: [],
      notes: {},
      history: [],
      collections: [
        { id: 'sabr', name: 'Sabr (Patience)', ayahIds: [], color: '#b0926a', icon: 'leaf' },
        { id: 'shukr', name: 'Shukr (Gratitude)', ayahIds: [], color: '#574a1e', icon: 'hands-pray' },
      ],
      streak: {
        current: 0,
        best: 0,
        lastReadDate: null,
        readDays: {},
      },
      settings: {
        translationKey: 'sahih',
        themeMode: 'auto', // 'light', 'dark', 'auto'
        widgetMode: 'daily',
        widgetStyleName: 'goldClassic',
        widgetTapAction: 'home',
        widgetFontSettings: { arabicSize: 20, translationSize: 14, lineSpacing: 1.25 },
        reminderSettings: { window: 'morning', customHour: 8, customMinute: 0 },
      },
      
      // Actions
      toggleFavorite: (ayahId) => {
        const { favorites } = get();
        const exists = favorites.includes(ayahId);
        const next = exists ? favorites.filter((id) => id !== ayahId) : [ayahId, ...favorites];
        set({ favorites: next });
        void syncNow();
      },
      
      saveNote: (ayahId, noteText) => {
        set((state) => ({ notes: { ...state.notes, [ayahId]: noteText } }));
        void syncNow();
      },
      
      addToHistory: (ayah) => {
        if (!ayah?.id) return;
        set((state) => {
          const next = [ayah, ...state.history.filter((item) => item.id !== ayah.id)].slice(0, 20);
          return { history: next };
        });
        void syncNow();
      },
      
      markReadToday: () => {
        const dateKey = todayKey();
        const { streak } = get();
        if (streak.readDays[dateKey]) return; // already read today

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().slice(0, 10);

        const current = streak.lastReadDate === yesterdayKey ? streak.current + 1 : 1;
        
        const nextStreak = {
          ...streak,
          current,
          best: Math.max(streak.best || 0, current),
          lastReadDate: dateKey,
          readDays: { ...streak.readDays, [dateKey]: true },
        };
        
        set({ streak: nextStreak });
        void syncNow();
      },
      
      updateSettings: (partial) => {
        set((state) => ({ settings: { ...state.settings, ...partial } }));
        void syncNow();
      },
      
      addCollection: (collection) => {
        set((state) => ({ collections: [...state.collections, collection] }));
        void syncNow();
      },
      
      toggleAyahInCollection: (collectionId, ayahId) => {
         set((state) => {
             const collections = state.collections.map(c => {
                 if (c.id === collectionId) {
                     const exists = c.ayahIds.includes(ayahId);
                     const nextIds = exists ? c.ayahIds.filter(id => id !== ayahId) : [...c.ayahIds, ayahId];
                     return { ...c, ayahIds: nextIds };
                 }
                 return c;
             });
             return { collections };
         });
         void syncNow();
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
      }
    }),
    {
      name: 'sanctuary-app-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
