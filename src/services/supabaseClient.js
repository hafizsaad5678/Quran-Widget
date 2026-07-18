import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const resolveProjectRef = (url) => {
  try {
    if (!url) return null;
    const host = new URL(url).hostname || "";
    const ref = host.split(".")[0];
    return ref || null;
  } catch (_error) {
    return null;
  }
};

export const supabaseProjectRef = resolveProjectRef(supabaseUrl);
export const SUPABASE_AUTH_STORAGE_KEY = supabaseProjectRef
  ? `sb-${supabaseProjectRef}-auth-token`
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const isWeb = Platform.OS === "web";
const hasWindow = typeof window !== "undefined";

const webStorage = {
  getItem: async (key) => (hasWindow ? window.localStorage.getItem(key) : null),
  setItem: async (key, value) => {
    if (hasWindow) window.localStorage.setItem(key, value);
  },
  removeItem: async (key) => {
    if (hasWindow) window.localStorage.removeItem(key);
  },
};

const authStorage = isWeb ? webStorage : AsyncStorage;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: authStorage,
        autoRefreshToken: true,
        persistSession: !isWeb || hasWindow,
        detectSessionInUrl: isWeb,
      },
    })
  : null;
