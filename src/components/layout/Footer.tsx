/* ─────────────────────────────────────────────
 * Footer
 * Simple site footer displaying copyright info
 * and the developer's name. Uses glassmorphism
 * styling consistent with the rest of the app.
 * ───────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          &copy; {new Date().getFullYear()} Enclave Weather &mdash; Developed
          by <span className="footer__highlight">Ronel</span>
        </p>
      </div>
    </footer>
  );
}
