package com.qurandaily.ayah

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.util.TypedValue
import android.util.Log
import android.widget.RemoteViews

class AyahWidgetProvider : AppWidgetProvider() {

    companion object {
        private const val TAG = "AyahWidgetProvider"

        private fun nonBlank(value: String?, fallback: String): String {
            return if (value.isNullOrBlank()) fallback else value
        }

        private fun safeColor(value: Int, fallback: Int): Int {
            // Guard against transparent/invalid legacy values that can render widget as "empty".
            return if (value == 0) fallback else value
        }

        private fun safeTextSize(value: Float, fallback: Float): Float {
            return if (value.isNaN() || value < 8f || value > 40f) fallback else value
        }

        fun updateAppWidget(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val views = RemoteViews(context.packageName, R.layout.ayah_widget)

            val prefs: SharedPreferences = context.getSharedPreferences(
                "AyahWidgetPrefs",
                Context.MODE_PRIVATE
            )

            val arabic = nonBlank(
                prefs.getString("arabic", null),
                "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            )
            val translation = nonBlank(
                prefs.getString("translation", null),
                "In the name of Allah, the Most Gracious, the Most Merciful"
            )
            val surah = nonBlank(prefs.getString("surah", null), "Al-Fatiha")
            val ayahNum = nonBlank(prefs.getString("ayahNumber", null), "1")
            val surahNumber = nonBlank(prefs.getString("surahNumber", null), "1")
            val tapAction = nonBlank(prefs.getString("tap_action", null), "home")

            val arabicColor = safeColor(
                prefs.getInt("style_arabic_color", 0xFF3D2B00.toInt()),
                0xFF3D2B00.toInt()
            )
            val translationColor = safeColor(
                prefs.getInt("style_translation_color", 0xFF5F4A1B.toInt()),
                0xFF5F4A1B.toInt()
            )
            val metaColor = safeColor(
                prefs.getInt("style_meta_color", 0xFF8B6B12.toInt()),
                0xFF8B6B12.toInt()
            )

            val arabicSizeSp = safeTextSize(prefs.getFloat("style_arabic_size", 16f), 16f)
            val translationSizeSp = safeTextSize(prefs.getFloat("style_translation_size", 11f), 11f)
            val metaSizeSp = safeTextSize(prefs.getFloat("style_meta_size", 11f), 11f)

            Log.d(TAG, "render widgetId=$appWidgetId surah=$surah ayah=$ayahNum arabicLen=${arabic.length} translationLen=${translation.length}")

            views.setTextViewText(R.id.widget_arabic, arabic)
            views.setTextViewText(R.id.widget_translation, translation)
            views.setTextViewText(R.id.widget_surah, "$surah : $ayahNum")

            views.setTextColor(R.id.widget_arabic, arabicColor)
            views.setTextColor(R.id.widget_translation, translationColor)
            views.setTextColor(R.id.widget_surah, metaColor)

            views.setTextViewTextSize(R.id.widget_arabic, TypedValue.COMPLEX_UNIT_SP, arabicSizeSp)
            views.setTextViewTextSize(R.id.widget_translation, TypedValue.COMPLEX_UNIT_SP, translationSizeSp)
            views.setTextViewTextSize(R.id.widget_surah, TypedValue.COMPLEX_UNIT_SP, metaSizeSp)

            val intent = if (tapAction == "current") {
                Intent(Intent.ACTION_VIEW).apply {
                    data = Uri.parse("qurandailyayah://ayah?surah=$surahNumber&ayah=$ayahNum")
                    setPackage(context.packageName)
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                }
            } else {
                context.packageManager.getLaunchIntentForPackage(context.packageName)
            }
            if (intent != null) {
                val pendingIntent = PendingIntent.getActivity(
                    context,
                    0,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                )
                views.setOnClickPendingIntent(R.id.widget_container, pendingIntent)
            } else {
                Log.w(TAG, "Launch intent not found for package ${context.packageName}")
            }

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        Log.d(TAG, "onUpdate called for ${appWidgetIds.size} widgets")
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        Log.d(TAG, "onEnabled called")
        val appWidgetManager = AppWidgetManager.getInstance(context)
        val componentName = ComponentName(context, AyahWidgetProvider::class.java)
        val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }
}
