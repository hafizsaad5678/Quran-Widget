import { getDailyAyah } from "../constants/quranCurated";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { syncNow } from "./cloudSyncService";
import { getJson, getString, setJson, setString } from "./storageService";

const todayKey = () => new Date().toISOString().slice(0, 10);
const getStoreApi = () => require("../store/useAppStore").useAppStore;

export const getFavorites = async () => {
  return getJson(STORAGE_KEYS.FAVORITES, []);
};

export const toggleFavoriteAyah = async (ayahId) => {
  const favorites = await getFavorites();
  const exists = favorites.includes(ayahId);
  const next = exists
    ? favorites.filter((id) => id !== ayahId)
    : [ayahId, ...favorites];
  await setJson(STORAGE_KEYS.FAVORITES, next);
  void syncNow();
  return { favorites: next, isFavorite: !exists };
};

export const saveAyahToHistory = async (ayah) => {
  if (!ayah?.id) return [];
  const now = new Date();
  const timestamp = ayah.timestamp || now.toISOString();
  const dateKey = ayah.dateKey || timestamp.slice(0, 10);
  const entry = { ...ayah, timestamp, dateKey };
  const list = await getJson(STORAGE_KEYS.HISTORY, []);
  const next = [entry, ...list.filter((item) => item.id !== ayah.id)].slice(
    0,
    20,
  );
  await setJson(STORAGE_KEYS.HISTORY, next);

  const store = getStoreApi();
  const state = store.getState();
  const storeNext = [
    entry,
    ...(state.history || []).filter((item) => item.id !== ayah.id),
  ].slice(0, 20);
  store.setState({ history: storeNext });

  void syncNow();
  return next;
};

export const getHistory = async () => {
  const storeHistory = getStoreApi().getState().history || [];
  if (storeHistory.length) return storeHistory;
  return getJson(STORAGE_KEYS.HISTORY, []);
};

const getAyahNotes = async () => {
  return getJson(STORAGE_KEYS.NOTES, {});
};

export const getAyahNote = async (ayahId) => {
  const notes = await getAyahNotes();
  return notes[ayahId] || "";
};

export const saveAyahNote = async (ayahId, note) => {
  const notes = await getAyahNotes();
  const next = { ...notes, [ayahId]: note };
  await setJson(STORAGE_KEYS.NOTES, next);
  void syncNow();
  return next;
};

export const getTranslationKey = async () => {
  return getString(STORAGE_KEYS.TRANSLATION_KEY, "sahih");
};

export const saveTranslationKey = async (key) => {
  await setString(STORAGE_KEYS.TRANSLATION_KEY, key);
  void syncNow();
};

export const getWidgetMode = async () => {
  return getString(STORAGE_KEYS.WIDGET_MODE, "daily");
};

export const getWidgetStyleName = async () => {
  return getString(STORAGE_KEYS.WIDGET_STYLE_NAME, "goldClassic");
};

export const saveWidgetStyleName = async (styleName) => {
  const allowed = [
    "goldClassic",
    "minimalLight",
    "nightGold",
    "emerald",
    "sapphire",
  ];
  const normalized = allowed.includes(styleName) ? styleName : "goldClassic";
  await setString(STORAGE_KEYS.WIDGET_STYLE_NAME, normalized);
  return normalized;
};

export const getWidgetTapAction = async () => {
  return getString(STORAGE_KEYS.WIDGET_TAP_ACTION, "home");
};

export const saveWidgetTapAction = async (tapAction) => {
  await setString(
    STORAGE_KEYS.WIDGET_TAP_ACTION,
    tapAction === "current" ? "current" : "home",
  );
};

export const getWidgetFontSettings = async () => {
  return getJson(STORAGE_KEYS.WIDGET_FONT_SETTINGS, {
    arabicSize: 20,
    translationSize: 14,
    lineSpacing: 1.25,
  });
};

export const getWidgetLayoutSettings = async () => {
  return getJson(STORAGE_KEYS.WIDGET_LAYOUT_SETTINGS, {
    width: 340,
    height: 170,
    arabicLines: 3,
    translationLines: 3,
    previewStyle: "widget",
  });
};

export const getWidgetStyleSettings = async () => {
  return getJson(STORAGE_KEYS.WIDGET_STYLE_SETTINGS, {
    backgroundColor: "#FFF7E0",
    arabicColor: "#3D2B00",
    translationColor: "#5F4A1B",
    metaColor: "#8B6B12",
    glassEnabled: true,
    glassOpacity: 0.78,
    borderOpacity: 0.28,
  });
};

export const getWidgetInterval = async () => {
  const value = await getString(STORAGE_KEYS.WIDGET_INTERVAL, "6");
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(24, Math.max(1, parsed)) : 6;
};

export const saveWidgetFontSettings = async (settings) => {
  const normalized = {
    arabicSize: Math.min(32, Math.max(14, Number(settings?.arabicSize || 20))),
    translationSize: Math.min(
      26,
      Math.max(12, Number(settings?.translationSize || 14)),
    ),
    lineSpacing: Math.min(
      2,
      Math.max(1, Number(settings?.lineSpacing || 1.25)),
    ),
  };
  await setJson(STORAGE_KEYS.WIDGET_FONT_SETTINGS, normalized);
  
  // Also update store so HomeScreen gets new font settings immediately
  const store = getStoreApi();
  store.getState().updateSettings({ 
    widgetFontSettings: normalized 
  });
  
  return normalized;
};

export const saveWidgetLayoutSettings = async (settings) => {
  const normalized = {
    width: Math.min(400, Math.max(220, Number(settings?.width || 340))),
    height: Math.min(260, Math.max(130, Number(settings?.height || 170))),
    arabicLines: Math.min(5, Math.max(1, Number(settings?.arabicLines || 3))),
    translationLines: Math.min(
      4,
      Math.max(1, Number(settings?.translationLines || 3)),
    ),
    previewStyle: settings?.previewStyle === "home" ? "home" : "widget",
  };
  await setJson(STORAGE_KEYS.WIDGET_LAYOUT_SETTINGS, normalized);
  return normalized;
};

export const saveWidgetStyleSettings = async (settings) => {
  const normalized = {
    backgroundColor: settings?.backgroundColor || "#FFF7E0",
    arabicColor: settings?.arabicColor || "#3D2B00",
    translationColor: settings?.translationColor || "#5F4A1B",
    metaColor: settings?.metaColor || "#8B6B12",
    glassEnabled: settings?.glassEnabled !== false,
    glassOpacity: Math.min(
      1,
      Math.max(0.2, Number(settings?.glassOpacity ?? 0.78)),
    ),
    borderOpacity: Math.min(
      1,
      Math.max(0.05, Number(settings?.borderOpacity ?? 0.28)),
    ),
  };
  await setJson(STORAGE_KEYS.WIDGET_STYLE_SETTINGS, normalized);
  return normalized;
};

export const saveWidgetInterval = async (hours) => {
  const normalized = Math.min(24, Math.max(1, Number(hours || 6)));
  await setString(STORAGE_KEYS.WIDGET_INTERVAL, String(normalized));
  return normalized;
};

export const getReminderSettings = async () => {
  return getJson(STORAGE_KEYS.REMINDER_SETTINGS, {
    enabled: true,
    window: "morning",
    customHour: 8,
    customMinute: 0,
  });
};

export const saveReminderSettings = async (settings) => {
  const normalized = {
    enabled: settings?.enabled !== false,
    window: settings?.window || "morning",
    customHour: Number(settings?.customHour ?? 8),
    customMinute: Number(settings?.customMinute ?? 0),
  };
  await setJson(STORAGE_KEYS.REMINDER_SETTINGS, normalized);
  void syncNow();
  return normalized;
};

export const markReadToday = async () => {
  const store = getStoreApi();
  const before = store.getState().streak;
  store.getState().markReadToday();
  const next = store.getState().streak;

  if (
    before.current !== next.current ||
    before.best !== next.best ||
    before.lastReadDate !== next.lastReadDate
  ) {
    await setJson(STORAGE_KEYS.STREAK_DATA, {
      current: next.current || 0,
      best: next.best || 0,
      lastReadDate: next.lastReadDate || null,
      readDays: next.readDays || {},
    });
  }

  void syncNow();
  return next;
};

export const getStreakStats = async () => {
  const store = getStoreApi();
  return store.getState().getStreakStats();
};

export const getSmartStreakGoals = async () => {
  const [history, streak] = await Promise.all([
    getHistory(),
    getJson(STORAGE_KEYS.STREAK_DATA, {
      current: 0,
      best: 0,
      lastReadDate: null,
      readDays: {},
    }),
  ]);

  const DAILY_AYAH_GOAL = 5;
  const DAILY_PAGE_EQUIVALENT_AYAHS = 10;
  const WEEKLY_TARGET_DAYS = 5;

  const byDayUnique = {};
  (history || []).forEach((item) => {
    const key = item?.dateKey || item?.timestamp?.slice?.(0, 10);
    if (!key) return;
    if (!byDayUnique[key]) byDayUnique[key] = new Set();
    byDayUnique[key].add(item.id);
  });

  const today = todayKey();
  const todayAyahCount = byDayUnique[today]?.size || 0;
  const dailyByAyahDone = todayAyahCount >= DAILY_AYAH_GOAL;
  const dailyByPageDone = todayAyahCount >= DAILY_PAGE_EQUIVALENT_AYAHS;
  const dailyDone =
    dailyByAyahDone || dailyByPageDone || Boolean(streak.readDays?.[today]);

  const weekly = [];
  let weeklyCompletedDays = 0;
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = byDayUnique[key]?.size || 0;
    const done = count >= DAILY_AYAH_GOAL || Boolean(streak.readDays?.[key]);
    if (done) weeklyCompletedDays += 1;
    weekly.push({
      key,
      label: d.toLocaleDateString(undefined, { weekday: "short" }),
      ayahs: count,
      done,
    });
  }

  const weeklyProgress = Math.min(1, weeklyCompletedDays / WEEKLY_TARGET_DAYS);
  const points =
    (streak.current || 0) * 2 +
    weeklyCompletedDays * 3 +
    Math.min(todayAyahCount, 10);

  let badge = {
    id: "starter",
    label: "Starter",
    icon: "seed-outline",
    color: "#10b981",
    nextAt: 10,
  };
  if (points >= 10)
    badge = {
      id: "bronze",
      label: "Bronze",
      icon: "shield-sun-outline",
      color: "#cd7f32",
      nextAt: 25,
    };
  if (points >= 25)
    badge = {
      id: "silver",
      label: "Silver",
      icon: "shield-star-outline",
      color: "#9ca3af",
      nextAt: 45,
    };
  if (points >= 45)
    badge = {
      id: "gold",
      label: "Gold",
      icon: "medal-outline",
      color: "#d4af37",
      nextAt: 70,
    };
  if (points >= 70)
    badge = {
      id: "diamond",
      label: "Diamond",
      icon: "diamond-stone",
      color: "#60a5fa",
      nextAt: null,
    };

  return {
    points,
    daily: {
      ayahCount: todayAyahCount,
      ayahGoal: DAILY_AYAH_GOAL,
      pageEquivalentAyahs: DAILY_PAGE_EQUIVALENT_AYAHS,
      byAyahProgress: Math.min(1, todayAyahCount / DAILY_AYAH_GOAL),
      byPageProgress: Math.min(1, todayAyahCount / DAILY_PAGE_EQUIVALENT_AYAHS),
      done: dailyDone,
    },
    weekly: {
      targetDays: WEEKLY_TARGET_DAYS,
      completedDays: weeklyCompletedDays,
      progress: weeklyProgress,
      days: weekly,
    },
    badge,
  };
};

export const resolveWidgetAyah = async (allAyat) => {
  const mode = await getWidgetMode();
  if (mode === "favorite") {
    const favorites = await getFavorites();
    if (favorites.length > 0) {
      const found = allAyat.find((item) => item.id === favorites[0]);
      if (found) return found;
    }
  }
  return getDailyAyah() || allAyat[0] || null;
};
