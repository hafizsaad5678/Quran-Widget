import AsyncStorage from "@react-native-async-storage/async-storage";

export const getString = async (key, fallback = "") => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ?? fallback;
  } catch (error) {
    console.warn("getString failed", key, error?.message || error);
    return fallback;
  }
};

export const setString = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const getJson = async (key, fallback) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn("getJson failed", key, error?.message || error);
    return fallback;
  }
};

export const setJson = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};
