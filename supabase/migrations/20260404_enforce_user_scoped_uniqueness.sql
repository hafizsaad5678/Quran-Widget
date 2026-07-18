-- Enforce per-user uniqueness for synced Quran app data.
-- This migration is idempotent and safe to run multiple times.

-- Ensure tables that are synced by authenticated user exist.
create table if not exists public.user_collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  collection_id text not null,
  name text not null,
  ayah_ids jsonb not null default '[]'::jsonb,
  color text,
  icon text,
  updated_at timestamptz not null default now()
);

-- Add user_id columns where missing so auth-scoped sync can enforce uniqueness.
alter table if exists public.user_favorites add column if not exists user_id uuid;
alter table if exists public.user_notes add column if not exists user_id uuid;
alter table if exists public.user_streaks add column if not exists user_id uuid;
alter table if exists public.user_history add column if not exists user_id uuid;
alter table if exists public.user_settings add column if not exists user_id uuid;
alter table if exists public.user_collections add column if not exists user_id uuid;

-- Per-user uniqueness for all synced entities.
create unique index if not exists user_favorites_user_ayah_unique
  on public.user_favorites(user_id, ayah_id)
  where user_id is not null;

create unique index if not exists user_notes_user_ayah_unique
  on public.user_notes(user_id, ayah_id)
  where user_id is not null;

create unique index if not exists user_streaks_user_unique
  on public.user_streaks(user_id)
  where user_id is not null;

create unique index if not exists user_history_user_ayah_unique
  on public.user_history(user_id, ayah_id)
  where user_id is not null;

create unique index if not exists user_settings_user_unique
  on public.user_settings(user_id)
  where user_id is not null;

create unique index if not exists user_collections_user_collection_unique
  on public.user_collections(user_id, collection_id)
  where user_id is not null;

-- Helpful lookup indexes.
create index if not exists user_favorites_user_idx on public.user_favorites(user_id);
create index if not exists user_notes_user_idx on public.user_notes(user_id);
create index if not exists user_streaks_user_idx on public.user_streaks(user_id);
create index if not exists user_history_user_idx on public.user_history(user_id);
create index if not exists user_settings_user_idx on public.user_settings(user_id);
create index if not exists user_collections_user_idx on public.user_collections(user_id);

-- Keep RLS enabled and add auth-scoped policies for authenticated users.
alter table if exists public.user_favorites enable row level security;
alter table if exists public.user_notes enable row level security;
alter table if exists public.user_streaks enable row level security;
alter table if exists public.user_history enable row level security;
alter table if exists public.user_settings enable row level security;
alter table if exists public.user_collections enable row level security;

drop policy if exists "auth_user_favorites_select" on public.user_favorites;
drop policy if exists "auth_user_favorites_write" on public.user_favorites;
create policy "auth_user_favorites_select" on public.user_favorites
  for select using (auth.uid() = user_id);
create policy "auth_user_favorites_write" on public.user_favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "auth_user_notes_select" on public.user_notes;
drop policy if exists "auth_user_notes_write" on public.user_notes;
create policy "auth_user_notes_select" on public.user_notes
  for select using (auth.uid() = user_id);
create policy "auth_user_notes_write" on public.user_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "auth_user_streaks_select" on public.user_streaks;
drop policy if exists "auth_user_streaks_write" on public.user_streaks;
create policy "auth_user_streaks_select" on public.user_streaks
  for select using (auth.uid() = user_id);
create policy "auth_user_streaks_write" on public.user_streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "auth_user_history_select" on public.user_history;
drop policy if exists "auth_user_history_write" on public.user_history;
create policy "auth_user_history_select" on public.user_history
  for select using (auth.uid() = user_id);
create policy "auth_user_history_write" on public.user_history
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "auth_user_settings_select" on public.user_settings;
drop policy if exists "auth_user_settings_write" on public.user_settings;
create policy "auth_user_settings_select" on public.user_settings
  for select using (auth.uid() = user_id);
create policy "auth_user_settings_write" on public.user_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "auth_user_collections_select" on public.user_collections;
drop policy if exists "auth_user_collections_write" on public.user_collections;
create policy "auth_user_collections_select" on public.user_collections
  for select using (auth.uid() = user_id);
create policy "auth_user_collections_write" on public.user_collections
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
