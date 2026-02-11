/* ─────────────────────────────────────────────
 * useDarkMode Hook
 * Manages the light/dark colour-scheme toggle.
 * Reads the user's stored preference from
 * localStorage (or falls back to the OS
 * preference) and syncs the .dark / .light
 * class on the <html> element.
 * ───────────────────────────────────────────── */

import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
