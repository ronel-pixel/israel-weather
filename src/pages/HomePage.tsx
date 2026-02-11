/* ─────────────────────────────────────────────
 * HomePage
 * Main landing page of the application. Contains
 * the searchable city dropdown (fetched from the
 * Israeli Government API) and the weather display
 * card (fetched from WeatherAPI.com).
 * ───────────────────────────────────────────── */

import { useState, useEffect, useRef } from "react";
import {
  Wind,
  MapPin,
  Search,
  Loader2,
} from "lucide-react";

import type { City } from "../models/city.model";
import type { Weather } from "../models/weather.model";
import { fetchCities } from "../services/cityService";
import { fetchWeather } from "../services/weatherService";
import { saveHistoryEntry } from "../services/storageService";

/* ───────── Component ───────── */
export default function HomePage() {
  const [cities, setCities] = useState<City[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [citiesError, setCitiesError] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  /* ── Load cities on mount ── */
  useEffect(() => {
    const controller = new AbortController();

    fetchCities(controller.signal)
      .then(setCities)
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setCitiesError(err.message || "Failed to load cities");
        }
      })
      .finally(() => setCitiesLoading(false));

    return () => controller.abort();
  }, []);

  /* ── Fetch weather automatically when a city is selected ── */
  useEffect(() => {
    if (!selectedCity) {
      setWeather(null);
      return;
    }

    const controller = new AbortController();
    setWeatherLoading(true);
    setWeatherError("");

    fetchWeather(selectedCity, controller.signal)
      .then((data) => {
        setWeather(data);
        /* Persist each successful lookup to localStorage history */
        saveHistoryEntry({
          timestamp: new Date().toISOString(),
          cityName: data.locationName,
          country: data.country,
        });
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setWeatherError(err.message || "Failed to load weather data");
          setWeather(null);
        }
      })
      .finally(() => setWeatherLoading(false));

    return () => controller.abort();
  }, [selectedCity]);

  /* ───────── Render ───────── */
  return (
    <div className="page animate-fade-in">
      {/* Page heading */}
      <header className="page-header">
        <h1 className="page-header__title">
          Weather <span className="text-gradient">Forecaster</span>
        </h1>
        <p className="page-header__subtitle">
          Select a locality to view real-time weather conditions
        </p>
      </header>

      {/* City selector — wrapped in a <form> for semantic correctness */}
      <form
        className="city-search-container"
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="City search"
      >
        {citiesLoading ? (
          <div className="loading">
            <Loader2 size={20} className="loading__spinner" />
            <span className="loading__text">Loading cities...</span>
          </div>
        ) : citiesError ? (
          <ErrorBox message={citiesError} />
        ) : (
          <CitySearch cities={cities} onSelect={setSelectedCity} />
        )}
      </form>

      {/* Weather loading indicator */}
      {weatherLoading && (
        <div className="loading">
          <Loader2 size={20} className="loading__spinner" />
          <span className="loading__text">Fetching weather data...</span>
        </div>
      )}

      {/* Weather error */}
      {weatherError && <ErrorBox message={weatherError} />}

      {/* Weather result card */}
      {weather && !weatherLoading && (
        <div className="weather-card animate-scale-in">
          <div className="card">
            {/* Gradient header — city, country, icon, temperature, condition */}
            <div className="weather-header">
              <div className="weather-header__top">
                <div>
                  <div className="weather-header__location">
                    <MapPin size={16} />
                    <h2 className="weather-header__name">
                      {weather.locationName}
                    </h2>
                  </div>
                  <p className="weather-header__country">{weather.country}</p>
                </div>
                <img
                  src={weather.conditionIcon}
                  alt={weather.conditionText}
                  className="weather-header__icon animate-fade-in-up"
                />
              </div>

              <div className="weather-header__temp-block">
                <span className="weather-header__temp">
                  {weather.tempC}&deg;
                </span>
                <span className="weather-header__temp-unit">C</span>
              </div>
              <p className="weather-header__condition">
                {weather.conditionText}
              </p>
            </div>

            {/* Detail cell — Wind Speed */}
            <div className="weather-details">
              <div className="weather-detail">
                <Wind size={20} className="weather-detail__icon" />
                <span className="weather-detail__value">
                  {weather.windKph} kph
                </span>
                <span className="weather-detail__label">Wind</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state — shown when no city is selected */}
      {!selectedCity && !weatherLoading && !weatherError && (
        <div className="empty-state">
          <div className="empty-state__icon">
            <MapPin size={28} />
          </div>
          <p className="empty-state__text">
            Select a locality above to get started
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   Sub-components
   ═══════════════════════════════════ */

/**
 * Searchable city dropdown with keyboard navigation.
 * Displays Hebrew city names (city_name_he) sourced from the
 * Government API but uses the English name (city_name_en)
 * as the internal value sent to the weather API.
 */
function CitySearch({
  cities,
  onSelect,
}: {
  cities: City[];
  onSelect: (cityNameEn: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /*
   * Filter cities by matching the query against both the Hebrew
   * and English names so users can search in either language.
   * Limit to 100 results for performance.
   */
  const lowerQuery = query.toLowerCase();
  const filtered = cities
    .filter(
      (c) =>
        c.nameHe.includes(query) ||
        c.nameEn.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 100);

  /* Close dropdown on click outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Reset highlight index when query changes */
  useEffect(() => {
    setHighlightIndex(-1);
  }, [query]);

  /* Scroll the highlighted item into the visible portion of the dropdown */
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as
        | HTMLElement
        | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  /** Commit a selection — show Hebrew name in input, pass English to parent */
  function selectCity(city: City) {
    setQuery(city.nameHe);
    setIsOpen(false);
    onSelect(city.nameEn);
  }

  /** Handle keyboard navigation within the dropdown */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          selectCity(filtered[highlightIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  }

  return (
    <div className="city-search" ref={wrapperRef}>
      <div className="city-search__input-wrapper">
        <Search size={20} className="city-search__icon" />
        <input
          type="text"
          className="city-search__input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            if (!e.target.value) onSelect("");
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search locality..."
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
        {query && (
          <button
            type="button"
            className="city-search__clear"
            onClick={() => {
              setQuery("");
              onSelect("");
            }}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {/* Dropdown — shows Hebrew name (city_name_he) for each option */}
      {isOpen && filtered.length > 0 && (
        <ul className="city-search__dropdown" ref={listRef} role="listbox">
          {filtered.map((c, i) => (
            <li
              key={c.nameEn}
              className={`city-search__option${
                i === highlightIndex ? " city-search__option--highlighted" : ""
              }`}
              role="option"
              aria-selected={i === highlightIndex}
              onMouseDown={() => selectCity(c)}
              onMouseEnter={() => setHighlightIndex(i)}
            >
              {c.nameHe}
            </li>
          ))}
        </ul>
      )}

      {isOpen && query && filtered.length === 0 && (
        <div className="city-search__dropdown city-search__empty">
          No cities found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

/** Reusable error message box */
function ErrorBox({ message }: { message: string }) {
  return (
    <div className="error-box">
      <strong>Error:&nbsp;</strong>
      {message}
    </div>
  );
}
