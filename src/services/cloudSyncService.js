/**
 * cloudSyncService
 * Syncs user data to Supabase for authenticated users only.
 * Anonymous users keep data local only.
 */
import { isSupabaseConfigured, supabase } from "./supabaseClient";

// Lazy import to break circular dependency:
// useAppStore → cloudSyncService → useAppStore
const getStore = () => require("../store/useAppStore").useAppStore;

// Returns the authenticated user's UUID, or null if not logged in
const getAuthUserId = async () => {
  try {
    const {
      data: { session },
    } = (await supabase?.auth.getSession()) ?? { data: {} };
    return session?.user?.id ?? null;
  } catch (_error) {
    return null;
  }
};

// Generic upsert helper
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
    console.warn(`Sync failed for ${table}:`, error?.message || error);
    return { synced: false, reason: error?.message || "unknown" };
  }
};

// Push all local data to Supabase
export const pushUserDataToCloud = async () => {
  if (!isSupabaseConfigured || !supabase)
    return { synced: false, reason: "supabase-not-configured" };

  const uid = await getAuthUserId();
  if (!uid) return { synced: false, reason: "not-authenticated" };
  const store = getStore().getState();
  const now = new Date().toISOString();

  const results = await Promise.all([
    // Favorites
    store.favorites.length > 0
      ? upsertTable(
          "user_favorites",
          store.favorites.map((ayahId) => ({
            user_id: uid,
            ayah_id: ayahId,
            updated_at: now,
          })),
          "user_id,ayah_id",
        )
      : { synced: true },

    // Notes
    Object.keys(store.notes).length > 0
      ? upsertTable(
          "user_notes",
          Object.entries(store.notes).map(([ayahId, note]) => ({
            user_id: uid,
            ayah_id: ayahId,
            note_text: note,
            updated_at: now,
          })),
          "user_id,ayah_id",
        )
      : { synced: true },

    // Streak
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

    // Settings
    upsertTable(
      "user_settings",
      {
        user_id: uid,
        reminder_window: store.settings.reminderSettings?.window || "morning",
        reminder_hour: store.settings.reminderSettings?.customHour || 8,
        reminder_minute: store.settings.reminderSettings?.customMinute || 0,
        translation_key: store.settings.translationKey || "sahih",
        updated_at: now,
      },
      "user_id",
    ),

    // History
    store.history.length > 0
      ? upsertTable(
          "user_history",
          store.history.map((item) => ({
            user_id: uid,
            ayah_id: item.id,
            ayah_data: item,
            viewed_at: item.timestamp || now,
          })),
          "user_id,ayah_id",
        )
      : { synced: true },

    // Collections
    store.collections.length > 0
      ? upsertTable(
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
        )
      : { synced: true },
  ]);

  const hasFailure = results.some((x) => !x.synced);
  return { synced: !hasFailure, results };
};

// Pull data from Supabase and merge into local store
export const pullUserDataFromCloud = async () => {
  if (!isSupabaseConfigured || !supabase) return false;

  const uid = await getAuthUserId();
  if (!uid) return false;

  try {
    const [favsRes, notesRes, streakRes, settingsRes, collectionsRes] =
      await Promise.all([
        supabase.from("user_favorites").select("ayah_id").eq("user_id", uid),
        supabase
          .from("user_notes")
          .select("ayah_id, note_text")
          .eq("user_id", uid),
        supabase.from("user_streaks").select("*").eq("user_id", uid).single(),
        supabase.from("user_settings").select("*").eq("user_id", uid).single(),
        supabase.from("user_collections").select("*").eq("user_id", uid),
      ]);

    const store = getStore().getState();

    if (favsRes.data?.length) {
      const serverFavs = favsRes.data.map((f) => f.ayah_id);
      getStore().setState({
        favorites: Array.from(new Set([...store.favorites, ...serverFavs])),
      });
    }

    if (notesRes.data?.length) {
      const serverNotes = {};
      notesRes.data.forEach((n) => {
        serverNotes[n.ayah_id] = n.note_text;
      });
      getStore().setState({ notes: { ...store.notes, ...serverNotes } });
    }

    if (
      streakRes.data &&
      streakRes.data.best_streak >= (store.streak.best || 0)
    ) {
      getStore().setState({
        streak: {
          current: streakRes.data.current_streak,
          best: streakRes.data.best_streak,
          lastReadDate: streakRes.data.last_read_date,
          readDays: streakRes.data.read_days || {},
        },
      });
    }

    if (settingsRes.data) {
      getStore().setState({
        settings: {
          ...store.settings,
          translationKey: settingsRes.data.translation_key || "sahih",
          reminderSettings: {
            window: settingsRes.data.reminder_window || "morning",
            customHour: settingsRes.data.reminder_hour || 8,
            customMinute: settingsRes.data.reminder_minute || 0,
          },
        },
      });
    }

    if (collectionsRes.data?.length) {
      const serverCollections = collectionsRes.data.map((c) => ({
        id: c.collection_id,
        name: c.name,
        ayahIds: c.ayah_ids || [],
        color: c.color,
        icon: c.icon,
      }));
      // Merge: keep local collections not on server, update ones that are
      const serverIds = serverCollections.map((c) => c.id);
      const localOnly = store.collections.filter(
        (c) => !serverIds.includes(c.id),
      );
      getStore().setState({
        collections: [...serverCollections, ...localOnly],
      });
    }

    return true;
  } catch (err) {
    console.warn("Pull from cloud failed:", err?.message || err);
    return false;
  }
};

// Debounced sync - waits 2s after last change before syncing
let syncTimer = null;
export const syncNow = () => {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    void pushUserDataToCloud();
  }, 2000);
};

// Sync when internet is restored (handles offline streak → online push)
let _networkListenerStarted = false;
export const startNetworkSyncListener = () => {
  if (_networkListenerStarted) return;
  _networkListenerStarted = true;
  // Poll every 2 minutes using fetch-based check — no native module needed
  setInterval(() => {
    fetch("https://www.google.com/generate_204", {
      method: "HEAD",
      cache: "no-cache",
    })
      .then((res) => {
        if (res.status === 204 || res.ok) void pushUserDataToCloud();
      })
      .catch(() => {});
  }, 120000);
};
