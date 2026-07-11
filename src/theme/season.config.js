// ============================================================
// SEASON CONFIG — VTI Clothing Shop
// ============================================================

export const SEASON_STORAGE_KEY = "vti-shop-season";
export const DEFAULT_SEASON = "auto"; // auto-detect by month

export const SEASON_OPTIONS = [
  {
    value: "auto",
    labelKey: "season.auto",
    emoji: "🗓️",
    label: "Tự động",
  },
  {
    value: "spring",
    labelKey: "season.spring",
    emoji: "🌸",
    label: "Xuân",
    months: [3, 4, 5], // March – May
    primaryColor: "#C2586B",
  },
  {
    value: "summer",
    labelKey: "season.summer",
    emoji: "☀️",
    label: "Hạ",
    months: [6, 7, 8], // June – August
    primaryColor: "#0098A6",
  },
  {
    value: "autumn",
    labelKey: "season.autumn",
    emoji: "🍂",
    label: "Thu",
    months: [9, 10, 11], // September – November
    primaryColor: "#BC5E2A",
  },
  {
    value: "winter",
    labelKey: "season.winter",
    emoji: "❄️",
    label: "Đông",
    months: [12, 1, 2], // December – February
    primaryColor: "#1B509A",
  },
];

/**
 * Detect the current season from the calendar month.
 * @returns {"spring"|"summer"|"autumn"|"winter"}
 */
export const detectSeasonByMonth = () => {
  const month = new Date().getMonth() + 1; // 1–12
  const season = SEASON_OPTIONS.find((opt) => opt.months && opt.months.includes(month));
  return season?.value ?? "spring";
};

/**
 * Validate and normalize a stored season value.
 * Falls back to DEFAULT_SEASON if unknown.
 */
export const normalizeSeason = (season) => {
  const valid = SEASON_OPTIONS.some(({ value }) => value === season);
  return valid ? season : DEFAULT_SEASON;
};

/**
 * Resolve the effective season (i.e. expand "auto" → actual season name).
 */
export const resolveSeason = (season) => {
  const normalized = normalizeSeason(season);
  return normalized === "auto" ? detectSeasonByMonth() : normalized;
};
