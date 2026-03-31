import { supabase } from './supabaseClient';

export const signUp = async (email, password, displayName) => {
  if (!supabase) throw new Error('Supabase not configured');
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });
};

export const signIn = async (email, password) => {
  if (!supabase) throw new Error('Supabase not configured');
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  if (!supabase) return;
  return supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

export const onAuthStateChange = (callback) => {
  if (!supabase) return { data: { subscription: { unsubscribe: () => { } } } };
  return supabase.auth.onAuthStateChange(callback);
};
