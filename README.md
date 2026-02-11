# Israel Weather Tracker by Enclave

A real-time weather application for Israeli localities. Search for any city in Israel and instantly view current weather conditions including temperature, wind speed, humidity, and more.

---

## Description

Israel Weather Tracker fetches the full list of Israeli cities from the **Israeli Government Open Data API** ([data.gov.il](https://data.gov.il)) and displays them in a searchable dropdown. When a city is selected, the app queries **WeatherAPI** ([weatherapi.com](https://www.weatherapi.com)) for live weather data and presents it in a clean, modern card interface. Every lookup is automatically saved to browser storage so you can review your search history at any time.

### Key Features

- **Searchable City Selector** — Dynamically loaded from the Government API; displays Hebrew city names with English names used internally for weather lookups.
- **Live Weather Display** — Shows country, city name, temperature (°C), feels-like, condition text, wind speed (kph), humidity, and a weather icon.
- **Search History** — Persisted in `localStorage`; displays exact timestamp (date + time), locality name, and country in a sortable table.
- **Dark Mode** — System-aware toggle with smooth transitions.
- **Responsive Design** — Fully responsive glassmorphism UI that works across all screen sizes.

---

## Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| Framework    | React 19                       |
| Language     | TypeScript 5.9 (strict mode)   |
| Build Tool   | Vite 7                         |
| Styling      | Vanilla CSS (Custom Properties) |
| Icons        | Lucide React                   |
| Routing      | React Router v7                |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** (or your preferred package manager)
- A free API key from [WeatherAPI](https://www.weatherapi.com/signup.aspx)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd weather-forecaster

# 2. Install dependencies
npm install

# 3. Configure environment variables
#    Copy the example file and add your WeatherAPI key:
cp .env.example .env
```

Open the newly created `.env` file and replace the placeholder with your actual key:

```
VITE_WEATHER_API_KEY=your_weatherapi_key_here
```

### Running the App

```bash
# Start the development server (opens in browser automatically)
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Project Architecture

The codebase follows a **Service / Model / Utils** structure for clear separation of concerns:

```
src/
├── components/
│   ├── layout/        # Header, Footer, Layout shell
│   └── routing/       # AppRouter (route definitions)
├── config/            # API endpoints, keys, constants
├── hooks/             # Custom React hooks (useDarkMode)
├── models/            # TypeScript interfaces (City, Weather, HistoryEntry)
├── pages/             # Route-level page components
├── services/          # API communication & localStorage logic
└── utils/             # Pure helper functions (date formatting, string cleaning)
```

**Data flow:** Page component → Service → External API → Model mapping → UI rendering.

---

## Developer

**Ronel** — Founder of **Enclave**

---

## License

This project is provided for educational and demonstration purposes.
