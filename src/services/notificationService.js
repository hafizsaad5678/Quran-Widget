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

    let hour = 8;
    let minute = 0;
    if (reminder.window === "evening") {
      hour = 19;
      minute = 15;
    } else if (reminder.window === "custom") {
      hour = reminder.customHour;
      minute = reminder.customMinute;
    }

    const body = applyTranslationProfile(ayah.translation, translationKey);
    const reflection = getReflectionLine(ayah.id);

    // Ensure channel exists
    await createNotificationChannel();

    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Daily Ayah - ${ayah.surahName} ${ayah.ayahNumber}`,
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
  await saveReminderSettings({
    window,
    customHour,
    customMinute,
  });
  await scheduleNotifications();
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
