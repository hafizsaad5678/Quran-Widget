# Quran Daily Ayah

A minimal Expo app that displays one Quran ayah per day with 12 daily push notifications (every 2 hours).

## Features

- **Offline-first**: All data stored locally in JSON
- **Date-based Selection**: Same ayah shown throughout the day (deterministic, no randomness)
- **Push Notifications**: 12 notifications per day at 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22 hours
- **Same Ayah Everywhere**: Same ayah appears on home screen and in all notifications
- **Minimal UI**: Clean, centered design with Arabic text and translation
- **Single Screen**: No navigation, just the daily ayah
- **No Backend**: Completely offline, no API calls

## Project Structure

```
quran-daily-ayah/
├── app/
│   └── index.js              # Entry point (expo-router)
├── src/
│   ├── screens/
│   │   └── HomeScreen.js     # Main screen component
│   └── utils/
│       ├── getDailyAyah.js   # Logic to select ayah by day
│       └── notifications.js  # Notification setup and scheduling
├── assets/
│   └── ayat/
│       └── daily_50_ayat.json # 50 Quran ayat data
└── App.js                     # Root layout
```

## How It Works

### Daily Ayah Selection
- Uses day of year (1-365) modulo 50 to select an ayah
- Same ayah shown for entire day
- No randomness, deterministic selection

### Notifications
- Requests permission on first launch
- Schedules 12 notifications per day (every 2 hours)
- Each notification shows today's ayah translation
- Uses Expo Notifications (no backend required)
- Notifications repeat daily at the same times

## Setup

1. Install dependencies:
```bash
cd quran-daily-ayah
npm install
```

2. Start the app:
```bash
npm start
```

3. On first launch, grant notification permissions when prompted

## Run Commands

```bash
# Start the app (choose platform when prompted)
npm start

# Start for Android
npm run android

# Start for iOS
npm run ios

# Start for Web
npm run web
```

## Data Format

Each ayah in `daily_50_ayat.json` contains:
- `id`: Unique identifier
- `surah`: Chapter name
- `ayah`: Verse number
- `arabic`: Arabic text
- `translation`: English translation

## Technologies

- React Native
- Expo
- expo-router (navigation)
- expo-notifications (push notifications)
- AsyncStorage (permission tracking)

## Notification Schedule

Notifications are sent at:
- 00:00 (midnight)
- 02:00
- 04:00
- 06:00
- 08:00
- 10:00
- 12:00 (noon)
- 14:00
- 16:00
- 18:00
- 20:00
- 22:00

Each notification contains the same daily ayah translation.
