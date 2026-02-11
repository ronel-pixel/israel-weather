/* ─────────────────────────────────────────────
 * Application Entry Point
 * Mounts the React root into the DOM and wraps
 * the App component in StrictMode for development
 * warnings and best-practice enforcement.
 * ───────────────────────────────────────────── */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
