import { getJson, setJson } from "./storageService";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const MCQ_CACHE_KEY = "mcqCache";
const MCQ_ATTEMPTS_KEY = "mcqAttempts";
const CACHE_TTL_MS = 1000 * 60 * 15;

const fallbackQuestions = [
  {
    id: "local-1",
    category: "stress",
    question_text: "Which ayah reminds us that ease comes with hardship?",
    options: [
      { id: "a", option_text: "94:5", is_correct: true },
      { id: "b", option_text: "2:255", is_correct: false },
      { id: "c", option_text: "1:1", is_correct: false },
      { id: "d", option_text: "112:4", is_correct: false },
    ],
  },
];

export const getMcqQuestions = async (category) => {
  const cache = await getJson(MCQ_CACHE_KEY, { data: [], timestamp: 0 });
  const isFresh = Date.now() - Number(cache.timestamp || 0) < CACHE_TTL_MS;

  if (isFresh && cache.data?.length) {
    return category
      ? cache.data.filter((q) => q.category === category)
      : cache.data;
  }

  if (!isSupabaseConfigured || !supabase) {
    return category
      ? fallbackQuestions.filter((q) => q.category === category)
      : fallbackQuestions;
  }

  try {
    let query = supabase
      .from("mcq_questions")
      .select(
        "id, category, question_text, mcq_options(id, option_text, is_correct)",
      );

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query.limit(20);
    if (error) throw error;

    const normalized = (data || []).map((item) => ({
      ...item,
      options: (item.mcq_options || []).map((opt) => ({
        id: String(opt.id),
        option_text: opt.option_text,
        is_correct: Boolean(opt.is_correct),
      })),
    }));

    await setJson(MCQ_CACHE_KEY, { data: normalized, timestamp: Date.now() });
    return normalized;
  } catch (error) {
    console.warn("MCQ fetch failed", error?.message || error);
    return category
      ? fallbackQuestions.filter((q) => q.category === category)
      : fallbackQuestions;
  }
};

export const submitMcqAttempt = async ({ questionId, optionId, isCorrect }) => {
  const attempt = {
    id: `${questionId}-${Date.now()}`,
    question_id: questionId,
    selected_option_id: optionId,
    is_correct: Boolean(isCorrect),
    attempted_at: new Date().toISOString(),
    synced: false,
  };

  const existing = await getJson(MCQ_ATTEMPTS_KEY, []);
  await setJson(MCQ_ATTEMPTS_KEY, [attempt, ...existing]);

  if (!isSupabaseConfigured || !supabase) {
    return attempt;
  }

  try {
    const { error } = await supabase.from("mcq_attempts").insert({
      question_id: questionId,
      selected_option_id: optionId,
      is_correct: Boolean(isCorrect),
      attempted_at: attempt.attempted_at,
    });
    if (!error) {
      const updated = await getJson(MCQ_ATTEMPTS_KEY, []);
      await setJson(
        MCQ_ATTEMPTS_KEY,
        updated.map((x) => (x.id === attempt.id ? { ...x, synced: true } : x)),
      );
    }
  } catch (error) {
    console.warn("MCQ attempt sync failed", error?.message || error);
  }

  return attempt;
};
