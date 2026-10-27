/**
 * Hijri (Islamic) date, fully offline.
 * Uses the platform Intl calendar when it supports it, otherwise falls back to
 * the tabular Islamic calendar computed here (may differ by a day from the
 * moon-sighting based calendar, which is normal for any calculated date).
 */
const MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Ula",
  "Jumada al-Akhirah",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qa'dah",
  "Dhu al-Hijjah",
];

// Tabular (civil) Islamic calendar from the Gregorian date.
const toHijriTabular = (date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  const jdn =
    d +
    Math.floor((153 * mm + 2) / 5) +
    365 * yy +
    Math.floor(yy / 4) -
    Math.floor(yy / 100) +
    Math.floor(yy / 400) -
    32045;
  const l = jdn - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 =
    l2 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { day, month, year };
};

const fromIntl = (date) => {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).formatToParts(date);
    const get = (type) => Number(parts.find((p) => p.type === type)?.value);
    const day = get("day");
    const month = get("month");
    const year = get("year");
    // Guard against engines that silently ignore the calendar.
    if (day >= 1 && day <= 30 && month >= 1 && month <= 12 && year > 1300 && year < 1700) {
      return { day, month, year };
    }
  } catch (_error) {
    // fall through to the tabular calendar
  }
  return null;
};

/** { day, month (1-12), year, monthName, text } for the given date. */
export const getHijriDate = (date = new Date()) => {
  const h = fromIntl(date) || toHijriTabular(date);
  const monthName = MONTHS[h.month - 1] || "";
  return { ...h, monthName, text: `${h.day} ${monthName} ${h.year} AH` };
};

export const getGregorianText = (date = new Date()) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
