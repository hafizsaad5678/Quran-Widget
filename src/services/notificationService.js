import AsyncStorage from "@react-native-async-storage/async-storage";
import { isRunningInExpoGo } from "expo";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { getDailyAyah } from "../constants/quranCurated";
import {
    applyTranslationProfile,
    getReflectionLine,
} from "../constants/translations";
import {
    getReminderSettings,
    getTranslationKey,
    saveReminderSettings,
} from "./userService";

let notificationsModule = null;
let isNotificationHandlerSet = false;

const isExpoGo = Constants?.appOwnership === "expo";
const isStoreClient = Constants?.executionEnvironment === "storeClient";
const shouldSkipNotifications =
  Platform.OS === "web" || isRunningInExpoGo || isExpoGo || isStoreClient;

export const areNotificationsAvailable = !shouldSkipNotifications;

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
  if (window === "afternoon") return "Afternoon Quran Pause";
  if (window === "evening") return "Evening Quran Reflection";
  return "Morning Quran Reflection";
};

const buildReminderBody = (ayah, translationKey) => {
  const translated = applyTranslationProfile(ayah.translation, translationKey);
  const compact = String(translated || "")
    .replace(/\s+/g, " ")
    .trim();
  const trimmed =
    compact.length > 110 ? `${compact.slice(0, 107)}...` : compact;
  const softLine = pickByDay(MESSAGE_TEMPLATES);
  return `${softLine} ${trimmed}`.trim();
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
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
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
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2196F3",
    });
  }

  return true;
};

export const scheduleNotifications = async () => {
  try {
    const Notifications = await getNotificationsModule();
    if (!Notifications) return false;

    const ayah = getDailyAyah();
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

    const body = buildReminderBody(ayah, translationKey);
    const reflection = getReflectionLine(ayah.id);

    // Ensure channel exists
    await createNotificationChannel();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: buildReminderTitle(reminder.window),
        body,
        subtitle: reflection,
        sound: true,
        badge: 1,
        data: {
          ayah: JSON.stringify(ayah),
          arabic: ayah.arabic,
          reflection,
        },
        sticky: false,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
        channelId: "daily-ayah",
      },
    });

    console.log("Daily reminder scheduled:", {
      window: reminder.window,
      hour,
      minute,
    });
    return true;
  } catch (error) {
    console.error("Error scheduling notifications:", error);
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
      console.log(
        "Notification tapped:",
        response.notification.request.content.title,
      );
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

    const reminder = await getReminderSettings();
    if (reminder?.enabled === false) {
      await scheduleNotifications();
      return;
    }

    const hasAskedPermission = await AsyncStorage.getItem(
      "notificationPermissionAsked",
    );

    if (!hasAskedPermission) {
      const granted = await requestNotificationPermission();
      await AsyncStorage.setItem("notificationPermissionAsked", "true");

      if (granted) {
        await scheduleNotifications();
        console.log("Notifications scheduled");
      }
    } else {
      await scheduleNotifications();
      console.log("Notifications rescheduled");
    }

    // Setup listeners
    await setupNotificationListeners();
  } catch (error) {
    console.error("Error initializing notifications:", error);
  }
};
