/* ─────────────────────────────────────────────
 * City Models
 * ───────────────────────────────────────────── */

/** Raw record shape returned by the data.gov.il API */
export interface CityApiRecord {
  city_name_he: string;
  city_name_en: string;
}

/** Internal city representation used throughout the app */
export interface City {
  nameHe: string;
  nameEn: string;
}
