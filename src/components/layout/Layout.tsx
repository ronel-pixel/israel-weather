/* ─────────────────────────────────────────────
 * Layout
 * Top-level shell that assembles the page
 * structure: Header, routed <main> content area,
 * and Footer. Also renders a decorative
 * background gradient layer.
 * ───────────────────────────────────────────── */

import Header from "./Header";
import Footer from "./Footer";
import AppRouter from "../routing/AppRouter";

export default function Layout() {
  return (
    <div className="app">
      <div className="app__gradient" />
      <Header />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
