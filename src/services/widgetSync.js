import Constants from "expo-constants";
import { AppState, NativeModules, Platform } from "react-native";
import { getCuratedAyat } from "../constants/quranCurated";
import { applyWidgetModeAyah } from "./widgetProvider";

const { AyahWidgetModule } = NativeModules;
const isExpoGo =
  Constants?.appOwnership === "expo" ||
  Constants?.executionEnvironment === "storeClient";
let hasLoggedWidgetUnavailableRuntime = false;

const logWidgetUnavailableOnce = () => {
  if (hasLoggedWidgetUnavailableRuntime) return;
  hasLoggedWidgetUnavailableRuntime = true;
  console.log(
    "ℹ️ Widget native module is unavailable in Expo Go; use a development build/APK to test widget updates.",
  );
};

export const forceUpdateAndroidWidget = async () => {
  if (Platform.OS !== "android") return false;
  if (isExpoGo) {
    logWidgetUnavailableOnce();
    return false;
  }

  if (!AyahWidgetModule) return false;

  try {
    // Keep widget content aligned with daily/favorite mode before requesting refresh.
    await applyWidgetModeAyah(getCuratedAyat());

    if (typeof AyahWidgetModule.refreshWidget === "function") {
      await AyahWidgetModule.refreshWidget();
      return true;
    }

    return false;
  } catch (error) {
    console.warn(
      "Failed to trigger Android widget refresh:",
      error?.message || error,
    );
    return false;
  }
};

export const registerAndroidWidgetBackgroundSync = () => {
  if (Platform.OS !== "android" || isExpoGo) {
    if (isExpoGo) {
      logWidgetUnavailableOnce();
    }
    return () => {};
  }

  const subscription = AppState.addEventListener("change", (nextState) => {
    if (nextState === "background") {
      void forceUpdateAndroidWidget();
    }
  });

  return () => {
    subscription.remove();
  };
};
