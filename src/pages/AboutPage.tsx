/* ─────────────────────────────────────────────
 * AboutPage
 * Informational page describing the application,
 * its data sources (Government API & WeatherAPI),
 * the developer (Ronel / Enclave), the tech stack,
 * and a high-level architecture overview.
 * ───────────────────────────────────────────── */

import {
  CloudSun,
  User,
  Code2,
  Database,
  Globe,
  Layers,
} from "lucide-react";

/* ───────── Page ───────── */
export default function AboutPage() {
  return (
    <div className="about-page animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <h1 className="page-header__title">
          About <span className="text-gradient">Weather Forecaster</span>
        </h1>
        <p className="page-header__subtitle">
          Everything you need to know about the app, the tech, and the developer
        </p>
      </header>

      {/* Content grid */}
      <div className="about-grid">
        {/* App Description */}
        <div className="card section-card">
          <div className="section-card__header">
            <div className="section-card__icon-wrapper">
              <CloudSun size={20} />
            </div>
            <h2 className="section-card__title">About the App</h2>
          </div>

          <p className="section-card__text">
            Weather Forecaster provides real-time weather data for localities across
            Israel. Select a city from the dropdown to get up-to-date
            information including temperature, weather conditions, and wind
            speed.
          </p>

          <div className="info-block">
            <Database size={20} className="info-block__icon" />
            <div>
              <p className="info-block__title">City Database</p>
              <p className="info-block__text">
                Sourced from the Israeli Government API (data.gov.il),
                containing all cities and localities across Israel.
              </p>
            </div>
          </div>

          <div className="info-block">
            <Globe size={20} className="info-block__icon" />
            <div>
              <p className="info-block__title">Weather Data</p>
              <p className="info-block__text">
                Powered by WeatherAPI &mdash; a global real-time weather data
                service with comprehensive worldwide coverage.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="card section-card">
          <div className="section-card__header">
            <div className="section-card__icon-wrapper">
              <User size={20} />
            </div>
            <h2 className="section-card__title">The Developer</h2>
          </div>

          <div className="developer">
            <div className="developer__avatar">RE</div>
            <h3 className="developer__name">Ronel</h3>
            <p className="developer__role">Full Stack Developer | Student at John Bryce</p>
          </div>

          <div className="tech-stack">
            <div className="tech-stack__header">
              <Code2 size={16} className="tech-stack__header-icon" />
              <h4 className="tech-stack__header-title">Tech Stack</h4>
            </div>
            <div className="tech-stack__badges">
              <span className="tech-badge">React 19</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Vite</span>
              <span className="tech-badge">Vanilla CSS</span>
              <span className="tech-badge">Lucide Icons</span>
            </div>
          </div>
        </div>

        {/* Architecture — full width */}
        <div className="about-grid__full">
          <div className="card section-card">
            <div className="section-card__header">
              <div className="section-card__icon-wrapper">
                <Layers size={20} />
              </div>
              <h2 className="section-card__title">How It Works</h2>
            </div>

            <div className="steps-grid">
              {[
                {
                  step: "1",
                  title: "Select a City",
                  desc: "Choose a locality from the dropdown sourced via the Israeli Government API.",
                },
                {
                  step: "2",
                  title: "Fetch Weather",
                  desc: "The app queries WeatherAPI for current conditions in real-time.",
                },
                {
                  step: "3",
                  title: "View Results",
                  desc: "Weather data is displayed in a clean card with temperature, conditions, and wind.",
                },
              ].map((item) => (
                <div key={item.step} className="step-card">
                  <div className="step-card__number">{item.step}</div>
                  <p className="step-card__title">{item.title}</p>
                  <p className="step-card__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
