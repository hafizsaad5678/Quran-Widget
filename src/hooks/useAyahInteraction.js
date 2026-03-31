import { useCallback } from "react";
import { useAppStore } from "../store/useAppStore";

/**
 * Handles ayah tap logic:
 * - Adds to history (Zustand → auto-syncs to Supabase)
 * - Marks streak for today (respects daily-once rule)
 */
export const useAyahInteraction = () => {
    const addToHistory = useAppStore((s) => s.addToHistory);
    const markReadToday = useAppStore((s) => s.markReadToday);

    const onAyahTap = useCallback((ayah) => {
        if (!ayah) return;
        addToHistory(ayah);
        markReadToday();
    }, [addToHistory, markReadToday]);

    return { onAyahTap };
};
