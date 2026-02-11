/* ─────────────────────────────────────────────
 * Date Formatting Utilities
 * ───────────────────────────────────────────── */

/**
 * Formats an ISO-8601 timestamp to "DD/MM/YYYY HH:MM".
 */
export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
