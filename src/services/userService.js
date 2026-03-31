import { getDailyAyah } from "../constants/quranCurated";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { syncNow } from "./cloudSyncService";
import { getJson, getString, setJson, setString } from "./storageService";

const todayKey = () => new Date().toISOString().slice(0, 10);

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
  const list = await getJson(STORAGE_KEYS.HISTORY, []);
  const next = [ayah, ...list.filter((item) => item.id !== ayah.id)].slice(
    0,
    20,
  );
  await setJson(STORAGE_KEYS.HISTORY, next);
  void syncNow();
  return next;
};

export const getHistory = async () => {
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
  });
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
  return normalized;
};

export const saveWidgetLayoutSettings = async (settings) => {
  const normalized = {
    width: Math.min(400, Math.max(220, Number(settings?.width || 340))),
    height: Math.min(260, Math.max(130, Number(settings?.height || 170))),
  };
  await setJson(STORAGE_KEYS.WIDGET_LAYOUT_SETTINGS, normalized);
  return normalized;
};

export const getReminderSettings = async () => {
  return getJson(STORAGE_KEYS.REMINDER_SETTINGS, {
    window: "morning",
    customHour: 8,
    customMinute: 0,
  });
};

export const saveReminderSettings = async (settings) => {
  const normalized = {
    window: settings?.window || "morning",
    customHour: Number(settings?.customHour ?? 8),
    customMinute: Number(settings?.customMinute ?? 0),
  };
  await setJson(STORAGE_KEYS.REMINDER_SETTINGS, normalized);
  void syncNow();
  return normalized;
};

export const markReadToday = async () => {
  const dateKey = todayKey();
  const streak = await getJson(STORAGE_KEYS.STREAK_DATA, {
    current: 0,
    best: 0,
    lastReadDate: null,
    readDays: {},
  });

  if (streak.readDays[dateKey]) {
    return streak;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  const current = streak.lastReadDate === yesterdayKey ? streak.current + 1 : 1;
  const next = {
    ...streak,
    current,
    best: Math.max(streak.best || 0, current),
    lastReadDate: dateKey,
    readDays: {
      ...streak.readDays,
      [dateKey]: true,
    },
  };

  await setJson(STORAGE_KEYS.STREAK_DATA, next);
  void syncNow();
  return next;
};

export const getStreakStats = async () => {
  const streak = await getJson(STORAGE_KEYS.STREAK_DATA, {
    current: 0,
    best: 0,
    lastReadDate: null,
    readDays: {},
  });

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
