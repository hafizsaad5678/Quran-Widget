package com.hmzahmza.qurandailyayah

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters

class AyahUpdateWorker(context: Context, params: WorkerParameters) : Worker(context, params) {

    override fun doWork(): Result {
        return try {
            val context = applicationContext
            val sharedPref = context.getSharedPreferences("AyahPreferences", Context.MODE_PRIVATE)
            
            // Get current index and increment it
            val currentIndex = sharedPref.getInt("current_ayah_index", 0)
            val totalAyahs = sharedPref.getInt("total_ayahs", 50)
            val nextIndex = (currentIndex + 1) % totalAyahs
            
            // Save new index
            sharedPref.edit().putInt("current_ayah_index", nextIndex).apply()
            
            // Update widget
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, MyAyahWidget::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)

            for (appWidgetId in appWidgetIds) {
                MyAyahWidget.updateAppWidget(context, appWidgetManager, appWidgetId)
            }

            Result.success()
        } catch (e: Exception) {
            Result.failure()
        }
    }
}
