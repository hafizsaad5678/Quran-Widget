package com.hmzahmza.qurandailyayah

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import java.util.concurrent.TimeUnit

class AyahWidgetModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AyahWidgetModule"
    }

    init {
        // Schedule periodic ayah updates every 5 hours
        schedulePeriodicUpdates()
    }

    private fun schedulePeriodicUpdates() {
        val workRequest = PeriodicWorkRequestBuilder<AyahUpdateWorker>(
            5, TimeUnit.HOURS
        ).build()

        WorkManager.getInstance(reactApplicationContext)
            .enqueue(workRequest)
    }

    @ReactMethod
    fun saveAyah(
        arabic: String,
        translation: String,
        surah: String,
        ayahNumber: String,
        promise: Promise
    ) {
        try {
            val context = reactApplicationContext
            val sharedPref = context.getSharedPreferences(
                "AyahPreferences",
                Context.MODE_PRIVATE
            )

            // Save to SharedPreferences
            with(sharedPref.edit()) {
                putString("ayah_arabic", arabic)
                putString("ayah_translation", translation)
                putString("ayah_surah", surah)
                putString("ayah_number", ayahNumber)
                apply()
            }

            // Update widget
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, MyAyahWidget::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)

            for (appWidgetId in appWidgetIds) {
                MyAyahWidget.updateAppWidget(context, appWidgetManager, appWidgetId)
            }

            promise.resolve("Ayah saved and widget updated")
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    @ReactMethod
    fun setUpdateInterval(hours: Int, promise: Promise) {
        try {
            val context = reactApplicationContext
            val sharedPref = context.getSharedPreferences(
                "AyahPreferences",
                Context.MODE_PRIVATE
            )

            // Save interval
            with(sharedPref.edit()) {
                putInt("update_interval_hours", hours)
                apply()
            }

            // Reschedule periodic updates
            val workRequest = PeriodicWorkRequestBuilder<AyahUpdateWorker>(
                hours.toLong(), TimeUnit.HOURS
            ).build()

            WorkManager.getInstance(context)
                .enqueue(workRequest)

            promise.resolve("Update interval set to $hours hours")
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}
