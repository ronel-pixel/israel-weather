/* ─────────────────────────────────────────────
 * Search History Models
 * ───────────────────────────────────────────── */

/** A single entry persisted in the search history */
export interface HistoryEntry {
  timestamp: string;
  cityName: string;
  country: string;
}
