/* ─────────────────────────────────────────────
 * Header (Navbar)
 * Sticky glassmorphism navigation bar containing
 * the brand logo, navigation links (Home, History,
 * About), and a dark-mode toggle button.
 * ───────────────────────────────────────────── */

import { NavLink } from "react-router-dom";
import { Sun, Moon, CloudSun } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";

/** Route definitions rendered as nav links */
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Brand */}
        <NavLink to="/" className="navbar__brand">
          <div className="navbar__brand-icon">
            <CloudSun size={20} />
          </div>
          <span className="navbar__brand-text">
              <span className="navbar__brand-accent">Weather Forecaster</span>
          </span>
        </NavLink>

        {/* Navigation + dark toggle */}
        <div className="navbar__actions">
          <nav>
            <ul className="navbar__list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `navbar__link${isActive ? " navbar__link--active" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={toggle}
            className="navbar__toggle"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
