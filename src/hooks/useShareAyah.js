/**
 * useShareAyah - Reusable hook to share an ayah as text
 * Uses React Native's built-in Share API (no extra packages needed)
 */
import { Share } from "react-native";

export const useShareAyah = () => {
    const shareAyah = async (ayah) => {
        if (!ayah) return;

        const surahName = ayah.surahName || ayah.surah || "";
        const ayahNum = ayah.ayahNumber || ayah.numberInSurah || "";
        const surahNum = ayah.surahNumber || "";
        const arabic = ayah.arabic || ayah.text || "";
        const translation = ayah.translation || "";

        const message = `${arabic}\n\n"${translation}"\n\n— ${surahName} ${surahNum}:${ayahNum}\n\nQuran Daily Ayah`;

        try {
            await Share.share({ message });
        } catch (error) {
            console.warn("Share failed:", error?.message);
        }
    };

    return { shareAyah };
};
