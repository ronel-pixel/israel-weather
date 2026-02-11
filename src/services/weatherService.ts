/* ─────────────────────────────────────────────
 * Weather Service
 * Fetches current weather data from WeatherAPI.com
 * and maps the raw JSON response to the internal
 * Weather model consumed by UI components.
 * ───────────────────────────────────────────── */

import type { WeatherApiResponse, Weather } from "../models/weather.model";
import { getWeatherUrl } from "../config/appConfig";

/**
 * Maps the raw WeatherAPI JSON response to our internal Weather model.
 * Prefixes the icon URL with "https:" because the API returns
 * protocol-relative URLs (e.g. "//cdn.weatherapi.com/...").
 */
function mapWeather(data: WeatherApiResponse): Weather {
  return {
    locationName: data.location.name,
    country: data.location.country,
    tempC: data.current.temp_c,
    conditionText: data.current.condition.text,
    conditionIcon: `https:${data.current.condition.icon}`,
    windKph: data.current.wind_kph,
  };
}

/**
 * Fetches the current weather for a given city name.
 * Accepts an optional AbortSignal for request cancellation.
 */
export async function fetchWeather(
  city: string,
  signal?: AbortSignal
): Promise<Weather> {
  const res = await fetch(getWeatherUrl(city), { signal });
  if (!res.ok) throw new Error(`Weather API responded with ${res.status}`);

  const data: WeatherApiResponse = await res.json();
  return mapWeather(data);
}
