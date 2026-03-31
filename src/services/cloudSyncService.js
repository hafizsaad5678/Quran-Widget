import { useAppStore } from "../store/useAppStore";
import { getCurrentUser } from "./authService";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const upsertTable = async (table, payload, conflictColumns) => {
  if (!isSupabaseConfigured || !supabase)
    return { synced: false, reason: "supabase-not-configured" };
  try {
    const { error } = await supabase
      .from(table)
      .upsert(payload, { onConflict: conflictColumns });
    if (error) throw error;
    return { synced: true };
  } catch (error) {
    console.warn(`Sync failed for ${table}`, error?.message || error);
    return { synced: false, reason: error?.message || "unknown" };
  }
};

export const pushUserDataToCloud = async () => {
  const user = await getCurrentUser();
  if (!user) return { synced: false, reason: "not-authenticated" };

  const store = useAppStore.getState();
  const uid = user.id;
  const now = new Date().toISOString();

  const results = await Promise.all([
    upsertTable(
      "user_favorites",
      store.favorites.map((ayahId) => ({
        user_id: uid,
        ayah_id: ayahId,
        updated_at: now,
      })),
      "user_id,ayah_id",
    ),
    upsertTable(
      "user_notes",
      Object.entries(store.notes).map(([ayahId, note]) => ({
        user_id: uid,
        ayah_id: ayahId,
        note_text: note,
        updated_at: now,
      })),
      "user_id,ayah_id",
    ),
    upsertTable(
      "user_streaks",
      {
        user_id: uid,
        current_streak: store.streak.current || 0,
        best_streak: store.streak.best || 0,
        last_read_date: store.streak.lastReadDate,
        read_days: store.streak.readDays || {},
        updated_at: now,
      },
      "user_id",
    ),
    upsertTable(
      "user_settings",
      {
        user_id: uid,
        reminder_window: store.settings.reminderSettings.window,
        reminder_hour: store.settings.reminderSettings.customHour,
        reminder_minute: store.settings.reminderSettings.customMinute,
        translation_key: store.settings.translationKey,
        updated_at: now,
      },
      "user_id",
    ),
    upsertTable(
      "user_history",
      store.history.map((item) => ({
        user_id: uid,
        ayah_id: item.id,
        ayah_data: item,
        viewed_at: item.timestamp || now,
      })),
      "user_id,ayah_id",
    ),
    upsertTable(
      "user_collections",
      store.collections.map((c) => ({
        user_id: uid,
        collection_id: c.id,
        name: c.name,
        ayah_ids: c.ayahIds,
        color: c.color,
        icon: c.icon,
        updated_at: now,
      })),
      "user_id,collection_id",
    ),
  ]);

  const hasFailure = results.some((x) => !x.synced);
  return { synced: !hasFailure, results };
};

export const pullUserDataFromCloud = async () => {
  const user = await getCurrentUser();
  if (!user || !supabase) return false;

  try {
    const [favsMsg, notesMsg, streaksMsg, collectionsMsg] = await Promise.all([
      supabase.from("user_favorites").select("ayah_id").eq("user_id", user.id),
      supabase
        .from("user_notes")
        .select("ayah_id, note_text")
        .eq("user_id", user.id),
      supabase.from("user_streaks").select("*").eq("user_id", user.id).single(),
      supabase.from("user_collections").select("*").eq("user_id", user.id),
    ]);

    const store = useAppStore.getState();

    // Merge logic
    if (favsMsg.data) {
      const serverFavs = favsMsg.data.map((f) => f.ayah_id);
      useAppStore.setState({
        favorites: Array.from(new Set([...store.favorites, ...serverFavs])),
      });
    }

    if (notesMsg.data) {
      const serverNotes = {};
      notesMsg.data.forEach((n) => {
        serverNotes[n.ayah_id] = n.note_text;
      });
      useAppStore.setState({ notes: { ...store.notes, ...serverNotes } });
    }

    if (streaksMsg.data && streaksMsg.data.best_streak >= store.streak.best) {
      useAppStore.setState({
        streak: {
          current: streaksMsg.data.current_streak,
          best: streaksMsg.data.best_streak,
          lastReadDate: streaksMsg.data.last_read_date,
          readDays: streaksMsg.data.read_days || {},
        },
      });
    }

    if (collectionsMsg.data) {
      const mappedCols = collectionsMsg.data.map((c) => ({
        id: c.collection_id,
        name: c.name,
        ayahIds: c.ayah_ids,
        color: c.color,
        icon: c.icon,
      }));
      // Just overwrite collections from server for simplicity to avoid complex merges
      if (mappedCols.length > 0) {
        useAppStore.setState({ collections: mappedCols });
      }
    }

    return true;
  } catch (err) {
    console.warn("Pull from cloud failed", err);
    return false;
  }
};

export const syncNow = async () => {
  return pushUserDataToCloud();
};
