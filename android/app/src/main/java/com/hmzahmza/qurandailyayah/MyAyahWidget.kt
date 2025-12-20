package com.hmzahmza.qurandailyayah

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews

class MyAyahWidget : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onEnabled(context: Context) {
        // Called when the first widget is created
        super.onEnabled(context)
    }

    override fun onDisabled(context: Context) {
        // Called when the last widget is removed
        super.onDisabled(context)
    }

    companion object {
        internal fun updateAppWidget(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val views = RemoteViews(context.packageName, R.layout.widget_layout)
            val sharedPref = context.getSharedPreferences(
                "AyahPreferences",
                Context.MODE_PRIVATE
            )

            // Get saved ayah data
            val arabic = sharedPref.getString("ayah_arabic", "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا") ?: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا"
            val translation = sharedPref.getString("ayah_translation", "Allah does not burden a soul beyond what it can bear.") ?: "Allah does not burden a soul beyond what it can bear."
            val surah = sharedPref.getString("ayah_surah", "Al-Baqarah") ?: "Al-Baqarah"
            val ayahNumber = sharedPref.getString("ayah_number", "286") ?: "286"

            // Update widget views
            views.setTextViewText(R.id.ayah_arabic, arabic)
            views.setTextViewText(R.id.ayah_translation, translation)
            views.setTextViewText(R.id.ayah_surah, surah)
            views.setTextViewText(R.id.ayah_number, ayahNumber)

            // Update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
