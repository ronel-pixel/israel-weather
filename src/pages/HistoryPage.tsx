/* ─────────────────────────────────────────────
 * HistoryPage
 * Displays a table of all previous weather
 * lookups persisted in localStorage. Each row
 * shows the exact timestamp, locality name,
 * and country. The user can clear the entire
 * history with a single action.
 * ───────────────────────────────────────────── */

import { useState, useCallback } from "react";
import { Trash2, Clock, Search } from "lucide-react";

import type { HistoryEntry } from "../models/history.model";
import {
  getHistory,
  clearHistory as clearStorageHistory,
} from "../services/storageService";
import { formatTimestamp } from "../utils/dateFormatter";

/* ───────── Component ───────── */
export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory);

  const handleClear = useCallback(() => {
    clearStorageHistory();
    setHistory([]);
  }, []);

  return (
    <div className="page animate-fade-in">
      {/* Page title */}
      <header className="page-header">
        <h1 className="page-header__title">
          Search <span className="text-gradient">History</span>
        </h1>
        <p className="page-header__subtitle">
          All your past weather searches in one place
        </p>
      </header>

      {history.length === 0 ? (
        /* ── Empty state ── */
        <div className="card card--empty">
          <div className="empty-state">
            <div className="empty-state__icon">
              <Search size={28} />
            </div>
            <p className="empty-state__text">No searches yet.</p>
            <p className="empty-state__text" style={{ opacity: 0.7 }}>
              Search for a city to see your history here.
            </p>
          </div>
        </div>
      ) : (
        /* ── Table ── */
        <div className="history-table-wrapper">
          {/* Clear button */}
          <div className="history-actions">
            <button onClick={handleClear} className="btn btn--danger">
              <Trash2 size={16} />
              Clear History
            </button>
          </div>

          <div className="card">
            <table className="history-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <span className="history-table__th-time">
                      <Clock size={14} />
                      Time
                    </span>
                  </th>
                  <th>Locality</th>
                  <th>Country</th>
                </tr>
              </thead>

              <tbody>
                {[...history].reverse().map((entry, idx) => (
                  <tr key={`${entry.timestamp}-${idx}`}>
                    <td className="history-table__index">{idx + 1}</td>
                    <td className="history-table__time">
                      {formatTimestamp(entry.timestamp)}
                    </td>
                    <td className="history-table__city">{entry.cityName}</td>
                    <td className="history-table__country">{entry.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <p className="history-summary">
            {history.length} {history.length === 1 ? "search" : "searches"}{" "}
            total
          </p>
        </div>
      )}
    </div>
  );
}
