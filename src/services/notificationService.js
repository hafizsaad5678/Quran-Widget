import { isRunningInExpoGo } from "expo";
import { router } from "expo-router";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { getAyah, getCuratedAyat } from "../constants/quranCurated";
import { SITUATIONS } from "../constants/situations";
import {
    applyTranslationProfile,
    getReflectionLine,
} from "../constants/translations";
import {
    getReminderSettings,
    getTranslationKey,
    saveReminderSettings,
} from "./userService";
import { COLORS } from "../constants/theme";

let notificationsModule = null;
let isNotificationHandlerSet = false;

const isExpoGo = Constants?.appOwnership === "expo";
const isStoreClient = Constants?.executionEnvironment === "storeClient";
const isExpoGoRuntime = isRunningInExpoGo || isExpoGo || isStoreClient;
// Local notifications work in Expo Go on iOS; Android Expo Go has no support.
const shouldSkipNotifications =
  Platform.OS === "web" || (isExpoGoRuntime && Platform.OS === "android");

export const areNotificationsAvailable = !shouldSkipNotifications;

const SCHEDULE_DAYS = 30; // iOS keeps up to 64 pending local notifications

const MESSAGE_TEMPLATES = [
  "A gentle reminder to open Quran and let your heart rest.",
  "Take one quiet minute with an ayah today.",
  "Take a quiet moment for one sincere reflection today.",
  "Pause, breathe, and reconnect with Allah's words.",
];

const pickByDay = (items) => {
  const day = new Date().getDate();
  return items[day % items.length];
};

const buildReminderTitle = (window) => {
  if (window === "afternoon") return "\u2600\uFE0F Afternoon Quran Pause";
  if (window === "evening") return "\uD83C\uDF19 Evening Quran Reflection";
  return "\uD83C\uDF05 Morning Quran Reflection";
};

const buildReference = (ayah) =>
  `${ayah.surahName || "Surah"} \u00B7 ${ayah.surahNumber}:${ayah.ayahNumber}`;

// Arabic first, then a short translation, then the gentle line.
const buildReminderBody = (ayah, translationKey) => {
  const translated = applyTranslationProfile(ayah.translation, translationKey);
  const compact = String(translated || "")
    .replace(/\s+/g, " ")
    .trim();
  const trimmed =
    compact.length > 140 ? `${compact.slice(0, 137)}...` : compact;
  const softLine = pickByDay(MESSAGE_TEMPLATES);
  return `${ayah.arabic}\n\n${trimmed}\n\n${softLine}`.trim();
};

const MOTIVATION_TITLES = [
  "\u2728 A little motivation",
  "\uD83D\uDC9B You've got this",
  "\uD83C\uDF3F Take heart",
  "\uD83D\uDD4A\uFE0F Allah is with you",
  "\uD83C\uDF1F Keep going",
];

const MOTIVATION_LINES = [
  "Hard days pass. Allah's help is near.",
  "Small steps done with sincerity are never wasted.",
  "You are not alone. Allah sees every effort.",
  "Ease is coming. Keep your heart with Him.",
  "Be patient. Your reward is with Allah.",
];

const shuffle = (items) => {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

// Curated reflection ayahs + the ayahs used for situations (patience, peace,
// gratitude...) which double as motivational notifications.
const buildPools = () => {
  const curated = getCuratedAyat();
  const ids = new Set();
  SITUATIONS.forEach((item) => item.ayahIds.forEach((id) => ids.add(id)));
  const motivation = [...ids]
    .map((id) => {
      const [surah, ayah] = id.split(":").map(Number);
      return getAyah(surah, ayah);
    })
    .filter(Boolean);
  return { curated, motivation };
};

/**
 * Different ayah every day: reshuffled each time reminders are scheduled.
 * Every 3rd notification is a motivational one.
 */
const buildPlan = (count) => {
  const { curated, motivation } = buildPools();
  const reflections = shuffle(curated);
  const motivations = shuffle(motivation);
  const plan = [];
  let r = 0;
  let m = 0;
  for (let i = 0; i < count; i += 1) {
    if (i % 3 === 2 && motivations.length) {
      plan.push({ kind: "motivation", ayah: motivations[m % motivations.length], index: m });
      m += 1;
    } else {
      plan.push({ kind: "reflection", ayah: reflections[r % reflections.length], index: r });
      r += 1;
    }
  }
  return plan;
};

const buildContent = (
  ayah,
  window,
  translationKey,
  kind = "reflection",
  index = 0,
) => {
  const reflection = getReflectionLine(ayah.id);
  const isMotivation = kind === "motivation";
  const baseBody = buildReminderBody(ayah, translationKey);
  return {
    title: isMotivation
      ? MOTIVATION_TITLES[index % MOTIVATION_TITLES.length]
      : buildReminderTitle(window),
    subtitle: buildReference(ayah), // iOS
    body: isMotivation
      ? `${ayah.arabic}\n\n${baseBody.split("\n\n")[1] || ""}\n\n${
          MOTIVATION_LINES[index % MOTIVATION_LINES.length]
        }`.trim()
      : baseBody,
    sound: true,
    color: "#E6CA72", // Android accent
    data: {
      surah: ayah.surahNumber,
      ayah: ayah.ayahNumber,
      kind,
      reflection,
    },
  };
};

const getNotificationsModule = async () => {
  if (shouldSkipNotifications) return null;

  if (!notificationsModule) {
    try {
      notificationsModule = await import("expo-notifications");
    } catch (_error) {
      console.warn("expo-notifications not available in this runtime");
      return null;
    }
  }

  if (!isNotificationHandlerSet) {
    notificationsModule.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true, // banner drops from the top, even in foreground
        shouldShowList: true,
        shouldShowAlert: true, // older SDK name, kept for compatibility
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    isNotificationHandlerSet = true;
  }

  return notificationsModule;
};

export const requestNotificationPermission = async () => {
  const Notifications = await getNotificationsModule();
  if (!Notifications) return false;

  const { status } = await Notifications.requestPermissionsAsync();
  console.log("Notification permission status:", status);
  return status === "granted";
};

export const createNotificationChannel = async () => {
  const Notifications = await getNotificationsModule();
  if (!Notifications) return false;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("daily-ayah", {
      name: "Daily Ayah",
      description: "A gentle daily reminder with an ayah to reflect on",
      importance: Notifications.AndroidImportance.HIGH, // heads-up banner
      vibrationPattern: [0, 250, 250, 250],
      lightColor: COLORS.status.info,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      enableVibrate: true,
      showBadge: false,
    });
  }

  return true;
};

export const scheduleNotifications = async () => {
  try {
    const Notifications = await getNotificationsModule();
    if (!Notifications) return false;

    const reminder = await getReminderSettings();
    const translationKey = await getTranslationKey();

    // Always clear previously scheduled reminders before re-applying.
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (reminder?.enabled === false) {
      return true;
    }

    let hour = 8;
    let minute = 0;
    if (reminder.window === "afternoon") {
      hour = 13;
      minute = 0;
    } else if (reminder.window === "evening") {
      hour = 19;
      minute = 15;
    } else if (reminder.window === "custom") {
      hour = reminder.customHour;
      minute = reminder.customMinute;
    }

    // Ensure channel exists
    await createNotificationChannel();

    // Schedule the next SCHEDULE_DAYS days, each with a different ayah.
    // Reminders are re-planned (and reshuffled) every time the app opens.
    const now = new Date();
    const plan = buildPlan(SCHEDULE_DAYS);
    let scheduled = 0;
    for (let i = 0; i < SCHEDULE_DAYS; i += 1) {
      const when = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + i,
        hour,
        minute,
        0,
      );
      if (when <= now) continue;
      const item = plan[i];
      await Notifications.scheduleNotificationAsync({
        content: buildContent(
          item.ayah,
          reminder.window,
          translationKey,
          item.kind,
          item.index,
        ),
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: when,
          channelId: "daily-ayah",
        },
      });
      scheduled += 1;
    }

    console.log("Reminders scheduled:", {
      window: reminder.window,
      hour,
      minute,
      scheduled,
    });
    return true;
  } catch (error) {
    console.error("Error scheduling notifications:", error);
    return false;
  }
};

/** Sends a preview notification in a few seconds (same look as the daily one). */
export const sendTestNotification = async () => {
  try {
    const Notifications = await getNotificationsModule();
    if (!Notifications) return false;

    const granted = await requestNotificationPermission();
    if (!granted) return false;

    const reminder = await getReminderSettings();
    const translationKey = await getTranslationKey();
    await createNotificationChannel();

    // Random pick, with a fair chance of a motivational one.
    const [plan] = buildPlan(Math.random() < 0.5 ? 3 : 1).slice(-1);

    await Notifications.scheduleNotificationAsync({
      content: buildContent(
        plan.ayah,
        reminder?.window,
        translationKey,
        plan.kind,
        plan.index,
      ),
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
        channelId: "daily-ayah",
      },
    });
    return true;
  } catch (error) {
    console.error("Error sending test notification:", error);
    return false;
  }
};

export const updateReminderWindow = async (
  window,
  customHour = 8,
  customMinute = 0,
) => {
  const current = await getReminderSettings();
  await saveReminderSettings({
    enabled: current?.enabled !== false,
    window,
    customHour,
    customMinute,
  });
  return scheduleNotifications();
};

export const setReminderEnabled = async (enabled) => {
  const current = await getReminderSettings();
  await saveReminderSettings({
    ...current,
    enabled,
  });
  return scheduleNotifications();
};

export const setupNotificationListeners = async () => {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return () => {};
  }

  // Handle notification when app is in foreground
  const foregroundSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Notification received:", notification.request.content.title);
    },
  );

  // Handle notification when user taps it
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data || {};
      if (data.surah && data.ayah) {
        router.push({
          pathname: "/ayah",
          params: { surah: data.surah, ayah: data.ayah },
        });
      }
    });

  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
};

export const initializeNotifications = async () => {
  try {
    if (shouldSkipNotifications) {
      return;
    }

    const Notifications = await getNotificationsModule();
    if (!Notifications) return;

    const reminder = await getReminderSettings();
    if (reminder?.enabled === false) {
      await scheduleNotifications();
      return;
    }

    // Do not interrupt users with a permission prompt at startup. The Settings
    // toggle owns the permission request and explicitly enables reminders.
    const permission = await Notifications.getPermissionsAsync();
    if (permission.status === "granted") {
      await scheduleNotifications();
      console.log("Notifications rescheduled");
    }

    // Setup listeners
    await setupNotificationListeners();
  } catch (error) {
    console.error("Error initializing notifications:", error);
  }
};
