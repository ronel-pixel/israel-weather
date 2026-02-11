/* ─────────────────────────────────────────────
 * City Service
 * Fetches and normalises the Israeli locality list
 * from the Government open-data API.
 * ───────────────────────────────────────────── */

import type { CityApiRecord, City } from "../models/city.model";
import { CITIES_API_URL } from "../config/appConfig";
import { cleanCityName } from "../utils/stringUtils";

/** Maps a raw API record to the internal City model */
function mapCity(record: CityApiRecord): City {
  return {
    nameHe: cleanCityName(record.city_name_he),
    nameEn: cleanCityName(record.city_name_en),
  };
}

/**
 * Fetches all Israeli cities, deduplicates by English name,
 * and returns them sorted alphabetically (A-Z).
 */
export async function fetchCities(signal?: AbortSignal): Promise<City[]> {
  const res = await fetch(CITIES_API_URL, { signal });
  if (!res.ok) throw new Error(`Cities API responded with ${res.status}`);

  const json = await res.json();
  const records: CityApiRecord[] = json.result.records;

  // Deduplicate by English name
  const unique = Array.from(
    new Map(records.map((c) => [c.city_name_en, c])).values()
  );

  return unique
    .map(mapCity)
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en"));
}
