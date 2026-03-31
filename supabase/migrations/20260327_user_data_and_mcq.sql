-- Anonymous per-device schema for Quran Daily Ayah

create extension if not exists pgcrypto;

create table if not exists public.app_devices (
  id uuid primary key default gen_random_uuid(),
  device_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_favorites (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  ayah_id text not null,
  updated_at timestamptz not null default now(),
  unique(device_id, ayah_id)
);

create table if not exists public.user_notes (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  ayah_id text not null,
  note_text text not null default '',
  updated_at timestamptz not null default now(),
  unique(device_id, ayah_id)
);

create table if not exists public.user_streaks (
  id uuid primary key default gen_random_uuid(),
  device_id text not null unique,
  current_streak integer not null default 0,
  best_streak integer not null default 0,
  last_read_date text,
  read_days jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_history (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  ayah_id text not null,
  ayah_data jsonb not null,
  viewed_at timestamptz not null default now(),
  unique(device_id, ayah_id)
);

create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  device_id text not null unique,
  reminder_window text not null default 'morning',
  reminder_hour integer not null default 8,
  reminder_minute integer not null default 0,
  translation_key text not null default 'sahih',
  updated_at timestamptz not null default now()
);

-- MCQ tables (if not already present)
create table if not exists public.mcq_questions (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question_text text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.mcq_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.mcq_questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false
);

create table if not exists public.mcq_attempts (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.mcq_questions(id) on delete cascade,
  selected_option_id text not null,
  is_correct boolean not null,
  attempted_at timestamptz not null default now()
);

create index if not exists idx_user_favorites_device on public.user_favorites(device_id);
create index if not exists idx_user_notes_device on public.user_notes(device_id);
create index if not exists idx_user_history_device on public.user_history(device_id);
create index if not exists idx_mcq_questions_category on public.mcq_questions(category);
create index if not exists idx_mcq_attempts_question on public.mcq_attempts(question_id);

alter table public.app_devices enable row level security;
alter table public.user_favorites enable row level security;
alter table public.user_notes enable row level security;
alter table public.user_streaks enable row level security;
alter table public.user_history enable row level security;
alter table public.user_settings enable row level security;
alter table public.mcq_questions enable row level security;
alter table public.mcq_options enable row level security;
alter table public.mcq_attempts enable row level security;

-- Per-device public access model. Adjust for auth-based model later if needed.
drop policy if exists "device_read_app_devices" on public.app_devices;
drop policy if exists "device_write_app_devices" on public.app_devices;
drop policy if exists "device_read_favorites" on public.user_favorites;
drop policy if exists "device_write_favorites" on public.user_favorites;
drop policy if exists "device_read_notes" on public.user_notes;
drop policy if exists "device_write_notes" on public.user_notes;
drop policy if exists "device_read_streaks" on public.user_streaks;
drop policy if exists "device_write_streaks" on public.user_streaks;
drop policy if exists "device_read_history" on public.user_history;
drop policy if exists "device_write_history" on public.user_history;
drop policy if exists "device_read_settings" on public.user_settings;
drop policy if exists "device_write_settings" on public.user_settings;
drop policy if exists "public_read_mcq_questions" on public.mcq_questions;
drop policy if exists "public_read_mcq_options" on public.mcq_options;
drop policy if exists "public_write_mcq_attempts" on public.mcq_attempts;

create policy "device_read_app_devices" on public.app_devices for select using (true);
create policy "device_write_app_devices" on public.app_devices for all using (true) with check (true);

create policy "device_read_favorites" on public.user_favorites for select using (true);
create policy "device_write_favorites" on public.user_favorites for all using (true) with check (true);

create policy "device_read_notes" on public.user_notes for select using (true);
create policy "device_write_notes" on public.user_notes for all using (true) with check (true);

create policy "device_read_streaks" on public.user_streaks for select using (true);
create policy "device_write_streaks" on public.user_streaks for all using (true) with check (true);

create policy "device_read_history" on public.user_history for select using (true);
create policy "device_write_history" on public.user_history for all using (true) with check (true);

create policy "device_read_settings" on public.user_settings for select using (true);
create policy "device_write_settings" on public.user_settings for all using (true) with check (true);

create policy "public_read_mcq_questions" on public.mcq_questions for select using (true);
create policy "public_read_mcq_options" on public.mcq_options for select using (true);
create policy "public_write_mcq_attempts" on public.mcq_attempts for insert with check (true);
