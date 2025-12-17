import ayatData from '../../assets/ayat/daily_50_ayat.json';

export const getDailyAyah = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % ayatData.length;
    return ayatData[index];
};
