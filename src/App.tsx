/* ─────────────────────────────────────────────
 * App — Root Component
 * Wraps the entire application in BrowserRouter
 * so all child components can use React Router
 * navigation. Renders the shared Layout shell.
 * ───────────────────────────────────────────── */

import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
