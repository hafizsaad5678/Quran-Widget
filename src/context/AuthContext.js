import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { pullUserDataFromCloud } from "../services/cloudSyncService";
import {
    supabase,
    SUPABASE_AUTH_STORAGE_KEY,
} from "../services/supabaseClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUserIdRef = useRef(null);

  const resetLocalUserData = useCallback(() => {
    try {
      const store = require("../store/useAppStore").useAppStore;
      store.getState().resetUserData?.();
    } catch (_error) {
      // Keep auth flow resilient even if store is unavailable momentarily.
    }
  }, []);

  const handleSessionChange = useCallback(
    async (session) => {
      const nextUser = session?.user ?? null;
      const nextUserId = nextUser?.id ?? null;
      const prevUserId = currentUserIdRef.current;

      if (prevUserId !== nextUserId) {
        resetLocalUserData();
        await AsyncStorage.removeItem("onboardingComplete");
        if (nextUserId) {
          await pullUserDataFromCloud();
        }
      }

      currentUserIdRef.current = nextUserId;
      setUser(nextUser);
    },
    [resetLocalUserData],
  );

  const clearBrokenLocalSession = useCallback(async () => {
    setUser(null);
    currentUserIdRef.current = null;

    try {
      await supabase?.auth?.signOut({ scope: "local" });
    } catch (_error) {
      // Ignore: local cleanup fallback continues below.
    }

    if (SUPABASE_AUTH_STORAGE_KEY) {
      try {
        await AsyncStorage.removeItem(SUPABASE_AUTH_STORAGE_KEY);
      } catch (_error) {
        // Ignore storage cleanup failures to keep startup resilient.
      }
    }
  }, []);

  useEffect(() => {
    if (!supabase?.auth) {
      setUser(null);
      setLoading(false);
      return () => {};
    }

    const bootstrapSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        await handleSessionChange(data?.session ?? null);
      } catch (error) {
        const message = String(error?.message || "");
        if (/refresh token/i.test(message)) {
          // Invalid/expired refresh token in local storage: clear once and continue signed-out.
          await clearBrokenLocalSession();
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    void bootstrapSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void handleSessionChange(session);
    });

    return () => subscription.unsubscribe();
  }, [clearBrokenLocalSession, handleSessionChange]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        displayName: user?.user_metadata?.display_name ?? user?.email ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
