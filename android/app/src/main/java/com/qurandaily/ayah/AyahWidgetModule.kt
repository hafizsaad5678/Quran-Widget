package com.qurandaily.ayah

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AyahWidgetModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val TAG = "AyahWidgetModule"

        private fun parseColorOrDefault(value: String?, fallback: Int): Int {
            return try {
                if (value.isNullOrBlank()) fallback else Color.parseColor(value)
            } catch (_: Exception) {
                fallback
            }
        }

        private fun clampSize(size: Double, fallback: Float): Float {
            if (size.isNaN()) return fallback
            return size.toFloat().coerceIn(10f, 30f)
        }
    }

    override fun getName(): String {
        return "AyahWidgetModule"
    }

    @ReactMethod
    fun updateWidget(
        arabic: String,
        translation: String,
        surah: String,
        ayahNumber: String,
        surahNumber: String,
        promise: Promise
    ) {
        try {
            val context = reactApplicationContext
            Log.d(TAG, "updateWidget called: surah=$surah ayah=$ayahNumber")

            val prefs = context.getSharedPreferences("AyahWidgetPrefs", Context.MODE_PRIVATE)
            val writeOk = prefs.edit().run {
                putString("arabic", if (arabic.isBlank()) "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" else arabic)
                putString("translation", if (translation.isBlank()) "In the name of Allah, the Most Gracious, the Most Merciful" else translation)
                putString("surah", if (surah.isBlank()) "Al-Fatiha" else surah)
                putString("ayahNumber", if (ayahNumber.isBlank()) "1" else ayahNumber)
                putString("surahNumber", if (surahNumber.isBlank()) "1" else surahNumber)
                putLong("lastUpdate", System.currentTimeMillis())
                commit()
            }
            Log.d(TAG, "Prefs write success=$writeOk")

            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, AyahWidgetProvider::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
            Log.d(TAG, "Active widget count=${appWidgetIds.size}")

            if (appWidgetIds.isNotEmpty()) {
                for (appWidgetId in appWidgetIds) {
                    AyahWidgetProvider.updateAppWidget(context, appWidgetManager, appWidgetId)
                }

                // Trigger host refresh explicitly after writing all RemoteViews.
                val intent = Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE).apply {
                    component = componentName
                    putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds)
                }
                context.sendBroadcast(intent)

                promise.resolve("Widget updated successfully")
            } else {
                promise.resolve("Data saved for widget (no active widgets)")
            }
        } catch (e: Exception) {
            Log.e(TAG, "updateWidget failed", e)
            promise.reject("WIDGET_UPDATE_ERROR", e.message ?: "Unknown error")
        }
    }

    @ReactMethod
    fun setTapAction(action: String, promise: Promise) {
        try {
            val context = reactApplicationContext
            val prefs = context.getSharedPreferences("AyahWidgetPrefs", Context.MODE_PRIVATE)
            val safeAction = if (action == "current") "current" else "home"
            prefs.edit().putString("tap_action", safeAction).apply()

            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, AyahWidgetProvider::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
            if (appWidgetIds.isNotEmpty()) {
                for (appWidgetId in appWidgetIds) {
                    AyahWidgetProvider.updateAppWidget(context, appWidgetManager, appWidgetId)
                }
            }

            promise.resolve("Tap action set: $safeAction")
        } catch (e: Exception) {
            Log.e(TAG, "setTapAction failed", e)
            promise.reject("WIDGET_TAP_ACTION_ERROR", e.message ?: "Unknown error")
        }
    }

    @ReactMethod
    fun setUpdateInterval(hours: Int, promise: Promise) {
        try {
            val safeHours = if (hours < 1) 1 else hours
            val context = reactApplicationContext
            val prefs = context.getSharedPreferences("AyahWidgetPrefs", Context.MODE_PRIVATE)
            prefs.edit().putInt("updateIntervalHours", safeHours).apply()
            Log.d(TAG, "setUpdateInterval called: $safeHours h")
            promise.resolve("Interval saved: $safeHours")
        } catch (e: Exception) {
            Log.e(TAG, "setUpdateInterval failed", e)
            promise.reject("WIDGET_INTERVAL_ERROR", e.message ?: "Unknown error")
        }
    }

    @ReactMethod
    fun refreshWidget(promise: Promise) {
        try {
            val context = reactApplicationContext
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, AyahWidgetProvider::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)

            if (appWidgetIds.isNotEmpty()) {
                for (appWidgetId in appWidgetIds) {
                    AyahWidgetProvider.updateAppWidget(context, appWidgetManager, appWidgetId)
                }

                val intent = Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE).apply {
                    component = componentName
                    putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds)
                }
                context.sendBroadcast(intent)
                Log.d(TAG, "refreshWidget broadcast sent for ${appWidgetIds.size} widgets")
                promise.resolve("Widget refresh triggered")
            } else {
                Log.d(TAG, "refreshWidget called with no active widgets")
                promise.resolve("No active widgets to refresh")
            }
        } catch (e: Exception) {
            Log.e(TAG, "refreshWidget failed", e)
            promise.reject("WIDGET_REFRESH_ERROR", e.message ?: "Unknown error")
        }
    }

    @ReactMethod
    fun updateWidgetStyle(
        backgroundColor: String,
        arabicColor: String,
        translationColor: String,
        metaColor: String,
        arabicSize: Double,
        translationSize: Double,
        metaSize: Double,
        promise: Promise
    ) {
        try {
            val context = reactApplicationContext
            val prefs = context.getSharedPreferences("AyahWidgetPrefs", Context.MODE_PRIVATE)

            val bg = parseColorOrDefault(backgroundColor, Color.parseColor("#FFF7E0"))
            val arabic = parseColorOrDefault(arabicColor, Color.parseColor("#3D2B00"))
            val translation = parseColorOrDefault(translationColor, Color.parseColor("#5F4A1B"))
            val meta = parseColorOrDefault(metaColor, Color.parseColor("#8B6B12"))

            val arabicSp = clampSize(arabicSize, 18f)
            val translationSp = clampSize(translationSize, 12f)
            val metaSp = clampSize(metaSize, 11f)

            prefs.edit().run {
                putInt("style_bg_color", bg)
                putInt("style_arabic_color", arabic)
                putInt("style_translation_color", translation)
                putInt("style_meta_color", meta)
                putFloat("style_arabic_size", arabicSp)
                putFloat("style_translation_size", translationSp)
                putFloat("style_meta_size", metaSp)
                commit()
            }

            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, AyahWidgetProvider::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
            if (appWidgetIds.isNotEmpty()) {
                for (appWidgetId in appWidgetIds) {
                    AyahWidgetProvider.updateAppWidget(context, appWidgetManager, appWidgetId)
                }
            }

            Log.d(TAG, "updateWidgetStyle applied for ${appWidgetIds.size} widgets")
            promise.resolve("Widget style updated")
        } catch (e: Exception) {
            Log.e(TAG, "updateWidgetStyle failed", e)
            promise.reject("WIDGET_STYLE_ERROR", e.message ?: "Unknown error")
        }
    }
}
