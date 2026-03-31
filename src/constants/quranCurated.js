/**
 * Quran utility functions using quran-json package
 * Provides offline access to complete Quran data
 */

// Import the complete Quran data from quran-json
const quranData = require('quran-json/dist/quran.json');
const quranEn = require('quran-json/dist/quran_en.json');

/**
 * Get a specific ayah by surah and ayah number
 * @param {number} surahNumber - Surah number (1-114)
 * @param {number} ayahNumber - Ayah number within the surah
 * @returns {Object|null} Ayah object with arabic, translation, and metadata
 */
export const getAyah = (surahNumber, ayahNumber) => {
    try {
        const surah = quranData[surahNumber - 1];
        const surahEn = quranEn[surahNumber - 1];
        if (!surah || !surahEn) return null;

        const ayah = surah.verses.find(v => v.id === ayahNumber);
        const ayahEn = surahEn.verses.find(v => v.id === ayahNumber);
        if (!ayah || !ayahEn) return null;

        return {
            id: `${surahNumber}:${ayahNumber}`,
            surahNumber,
            surahName: surah.transliteration,
            surahNameArabic: surah.name,
            ayahNumber,
            arabic: ayah.text,
            translation: ayahEn.translation || ayahEn.text,
            totalVerses: surah.total_verses,
        };
    } catch (error) {
        console.error('Error getting ayah:', error);
        return null;
    }
};

/**
 * Get daily ayah based on day of year
 * Cycles through a curated list of 50 meaningful ayat
 * @returns {Object} Daily ayah object
 */
export const getDailyAyah = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const dayOfYear = Math.floor(diff / 86400000);

    // Curated list of 50 meaningful ayat [surah, ayah]
    const curatedAyat = [
        [2, 286],   // Al-Baqarah - Allah does not burden a soul
        [94, 5],    // Ash-Sharh - With hardship comes ease
        [94, 6],    // Ash-Sharh - Indeed with hardship comes ease
        [3, 159],   // Al-Imran - Mercy from Allah
        [13, 28],   // Ar-Ra'd - Hearts find rest in remembrance
        [2, 153],   // Al-Baqarah - Seek help through patience
        [29, 69],   // Al-Ankabut - Allah is with those who do good
        [3, 173],   // Al-Imran - Sufficient for us is Allah
        [65, 3],    // At-Talaq - Allah will provide a way out
        [2, 216],   // Al-Baqarah - You may dislike something good
        [39, 53],   // Az-Zumar - Do not despair of Allah's mercy
        [3, 160],   // Al-Imran - If Allah helps you
        [8, 46],    // Al-Anfal - Be patient and steadfast
        [16, 97],   // An-Nahl - Good life for believers
        [25, 70],   // Al-Furqan - Allah will change evil deeds
        [2, 152],   // Al-Baqarah - Remember Me, I will remember you
        [33, 41],   // Al-Ahzab - Remember Allah abundantly
        [50, 16],   // Qaf - We are closer than jugular vein
        [2, 186],   // Al-Baqarah - I am near, I respond
        [7, 56],    // Al-A'raf - Mercy of Allah is near
        [3, 139],   // Al-Imran - Do not lose hope
        [12, 87],   // Yusuf - Never despair of Allah's mercy
        [4, 110],   // An-Nisa - Seek forgiveness from Allah
        [11, 90],   // Hud - Seek forgiveness and turn to Him
        [24, 22],   // An-Nur - Let them pardon and overlook
        [42, 40],   // Ash-Shura - Reward for pardoning
        [3, 134],   // Al-Imran - Those who restrain anger
        [41, 34],   // Fussilat - Repel evil with good
        [16, 90],   // An-Nahl - Justice, good conduct, generosity
        [49, 13],   // Al-Hujurat - Most honored is most righteous
        [17, 23],   // Al-Isra - Be kind to parents
        [31, 14],   // Luqman - Be grateful to parents
        [4, 36],    // An-Nisa - Be good to neighbors
        [107, 1],   // Al-Ma'un - Those who deny the Day of Judgment
        [2, 177],   // Al-Baqarah - True righteousness
        [23, 1],    // Al-Mu'minun - Successful are the believers
        [25, 63],   // Al-Furqan - Servants of the Most Merciful
        [51, 56],   // Adh-Dhariyat - Created to worship
        [67, 2],    // Al-Mulk - Created death and life to test
        [18, 46],   // Al-Kahf - Wealth and children are adornment
        [64, 15],   // At-Taghabun - Wealth and children are trial
        [3, 191],   // Al-Imran - Those who remember Allah
        [13, 11],   // Ar-Ra'd - Allah does not change condition
        [8, 29],    // Al-Anfal - If you fear Allah, He will grant criterion
        [2, 155],   // Al-Baqarah - We will test you with fear and hunger
        [3, 200],   // Al-Imran - Be patient and steadfast
        [103, 1],   // Al-Asr - By time, mankind is in loss
        [103, 2],   // Al-Asr - Except those who believe
        [103, 3],   // Al-Asr - And do righteous deeds
        [112, 1],   // Al-Ikhlas - Say He is Allah, the One
    ];

    const index = dayOfYear % curatedAyat.length;
    const [surahNum, ayahNum] = curatedAyat[index];

    return getAyah(surahNum, ayahNum);
};

/**
 * Get all ayat from a specific surah
 * @param {number} surahNumber - Surah number (1-114)
 * @returns {Array} Array of ayah objects
 */
export const getSurah = (surahNumber) => {
    try {
        const surah = quranData[surahNumber - 1];
        if (!surah) return [];

        return surah.verses.map(verse => ({
            id: `${surahNumber}:${verse.id}`,
            surahNumber,
            surahName: surah.transliteration,
            surahNameArabic: surah.name,
            ayahNumber: verse.id,
            arabic: verse.text,
            translation: verse.translation,
        }));
    } catch (error) {
        console.error('Error getting surah:', error);
        return [];
    }
};

/**
 * Get all curated ayat (50 meaningful verses)
 * @returns {Array} Array of ayah objects
 */
export const getCuratedAyat = () => {
    const curatedList = [
        [2, 286], [94, 5], [94, 6], [3, 159], [13, 28],
        [2, 153], [29, 69], [3, 173], [65, 3], [2, 216],
        [39, 53], [3, 160], [8, 46], [16, 97], [25, 70],
        [2, 152], [33, 41], [50, 16], [2, 186], [7, 56],
        [3, 139], [12, 87], [4, 110], [11, 90], [24, 22],
        [42, 40], [3, 134], [41, 34], [16, 90], [49, 13],
        [17, 23], [31, 14], [4, 36], [107, 1], [2, 177],
        [23, 1], [25, 63], [51, 56], [67, 2], [18, 46],
        [64, 15], [3, 191], [13, 11], [8, 29], [2, 155],
        [3, 200], [103, 1], [103, 2], [103, 3], [112, 1],
    ];

    return curatedList
        .map(([surah, ayah], index) => {
            const ayahData = getAyah(surah, ayah);
            return ayahData ? { ...ayahData, listId: index + 1 } : null;
        })
        .filter(Boolean);
};

/**
 * Get list of all surahs with metadata
 * @returns {Array} Array of surah objects
 */
export const getAllSurahs = () => {
    return quranData.map((surah, index) => ({
        number: index + 1,
        name: surah.transliteration,
        nameArabic: surah.name,
        totalVerses: surah.total_verses,
        revelationType: surah.type,
    }));
};

/**
 * Search ayat by text (Arabic or translation)
 * @param {string} query - Search query
 * @param {number} limit - Maximum results to return
 * @returns {Array} Array of matching ayah objects
 */
export const searchAyat = (query, limit = 20) => {
    const results = [];
    const searchTerm = query.toLowerCase();

    for (let i = 0; i < quranData.length && results.length < limit; i++) {
        const surah = quranData[i];
        for (const verse of surah.verses) {
            if (results.length >= limit) break;

            const matchesArabic = verse.text.includes(query);
            const matchesTranslation = verse.translation.toLowerCase().includes(searchTerm);

            if (matchesArabic || matchesTranslation) {
                results.push({
                    id: `${i + 1}:${verse.id}`,
                    surahNumber: i + 1,
                    surahName: surah.transliteration,
                    ayahNumber: verse.id,
                    arabic: verse.text,
                    translation: verse.translation,
                });
            }
        }
    }

    return results;
};
