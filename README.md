# Quran Daily Ayah

Quran Daily Ayah is an Expo Router React Native app with NativeWind styling, offline-first persistence, and optional Supabase cloud sync.

## Tech Stack

- Expo SDK 58
- React Native 0.88
- Expo Router (routes under src/app)
- NativeWind + Tailwind config
- AsyncStorage for offline-first local data
- Supabase code retained for a future cloud build, disabled in the current offline build
- Existing native integrations (widget + notifications) via JS services only

## Architecture

### Frontend

- Routing: src/app
- Screens: src/screens
- Reusable UI primitives: src/components/ui
- Feature components: src/components/feature
- Legacy reusable components retained and gradually refactored in src/components

### Data Layer

- Local persistence wrappers: src/services/storageService.js
- User data logic: src/services/userService.js
- Daily ayah and curated dataset: src/constants/quranCurated.js
- Situation definitions: src/constants/situations.js
- Translation profiles: src/constants/translations.js

### Retained Cloud Layer (disabled)

- Client: src/services/supabaseClient.js
- Cloud sync service: src/services/cloudSyncService.js
- SQL migration: supabase/migrations/20260327_user_data_and_mcq.sql

## Current Feature Set

### Core Screens

- Home
- Ayah Library
- Quotes
- Settings
- About
- Situation Selector (new)
- Situation Detail with offline guidance and audio

### Guided and utility screens

- Morning Calm (three-step offline journey)
- Countdown reading sessions
- Collections
- Stats
- Widget Studio

These are implemented as route screens and linked from Home quick actions.

### Local + Cloud Behavior

- Offline-first by default: all user actions persist locally first.
- The current product is offline-only: favorites, notes, history, collections, settings and progress stay on-device.
- Supabase auth/sync code remains disabled behind `CLOUD_ENABLED = false`.

### Reminder UX

- Settings now supports custom hour/minute controls for reminder window `custom`.
- Selected values are passed only through existing service interface:
  - updateReminderWindow(window, customHour, customMinute)
- No native module code changes required.

## Native Module Boundary

Widget and notification native implementations are treated as black boxes.

App integration is done only through existing service interfaces:

- src/services/widgetProvider.js
- src/services/notificationService.js

The checked-in `android/` project is the native source of truth because it
contains the home-screen widget. Native settings should be changed there (or
intentionally regenerated with Expo prebuild); app.json does not automatically
rewrite these checked-in native files.

## Supabase Tables

Migration file creates/ensures:

- app_devices
- user_favorites
- user_notes
- user_streaks
- user_history
- user_settings
- mcq_questions
- mcq_options
- mcq_attempts

These migrations are retained for a future cloud-enabled build and are not used by the current offline build.

## Environment Variables

In addition to MCP variables, app runtime needs:

- EXPO_PUBLIC_SUPABASE_URL
- EXPO_PUBLIC_SUPABASE_ANON_KEY

See .env.example.

## Run

```bash
npm install
npm start
```

Android development build:

```bash
npx expo run:android
```

## Quality Checks

Lint:

```bash
npm run lint
npx tsc --noEmit
```

## Notes

- This codebase currently contains both older styled components and newer NativeWind components.
- Refactoring is incremental: after each screen batch, old or duplicated code is removed as flows are stabilized.
