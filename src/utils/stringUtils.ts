/* ─────────────────────────────────────────────
 * String Utilities
 * ───────────────────────────────────────────── */

/**
 * Trims leading/trailing whitespace and collapses
 * multiple internal spaces into one.
 */
export function cleanCityName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}
