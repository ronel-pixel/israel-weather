/* ─────────────────────────────────────────────
 * AppRouter
 * Defines all client-side routes for the
 * application: Home (/), History (/history),
 * and About (/about).
 * ───────────────────────────────────────────── */

import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import HistoryPage from "../../pages/HistoryPage";
import AboutPage from "../../pages/AboutPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
