/* ─────────────────────────────────────────────
 * Weather Models
 * Defines the raw API response shape from WeatherAPI
 * and the internal Weather object used by UI components.
 * ───────────────────────────────────────────── */

/** Raw response shape returned by WeatherAPI (fields we use) */
export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
  };
}

/** Internal weather object consumed by UI components */
export interface Weather {
  locationName: string;
  country: string;
  tempC: number;
  conditionText: string;
  conditionIcon: string;
  windKph: number;
}
