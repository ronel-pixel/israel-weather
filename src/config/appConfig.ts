/* ─────────────────────────────────────────────
 * Application Configuration
 * All API endpoints, keys, and app-wide constants
 * live here — never hard-code them in components.
 * ───────────────────────────────────────────── */

/** Israeli Government API — city / locality dataset */
export const CITIES_API_URL =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=1500";

/**
 * WeatherAPI key — loaded exclusively from the .env file.
 * If missing, the app will log an error and API calls will fail.
 */
const WEATHER_API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY;

if (!WEATHER_API_KEY)
  console.error("Weather API Key is missing! Please check your .env file.");

/** WeatherAPI base URL */
const WEATHER_API_BASE = "https://api.weatherapi.com/v1";

/** Builds the current-weather endpoint URL for a given city name */
export function getWeatherUrl(city: string): string {
  return `${WEATHER_API_BASE}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&lang=en`;
}

/** localStorage key used for search history */
export const HISTORY_STORAGE_KEY = "weatherHistory";
