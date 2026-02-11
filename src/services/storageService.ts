/* ─────────────────────────────────────────────
 * Storage Service
 * Manages search-history persistence via localStorage.
 * ───────────────────────────────────────────── */

import type { HistoryEntry } from "../models/history.model";
import { HISTORY_STORAGE_KEY } from "../config/appConfig";

/** Retrieves the full search history array (newest last). */
export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

/** Appends a single entry to the persisted history. */
export function saveHistoryEntry(entry: HistoryEntry): void {
  const history = getHistory();
  history.push(entry);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

/** Removes all search history from storage. */
export function clearHistory(): void {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}
