"use client";

import {
  MATCH_EXPORT_FILENAMES,
  NOT_FOUND_VALUE,
  type MatchResult,
} from "@/lib/excel/matcher-types";
import { formatMatchStat } from "@/lib/excel/matcher";
import { exportWorksheetToXlsx } from "@/lib/excel/export";
import { PREVIEW_ROW_LIMIT } from "@/lib/excel/parser";

interface MatchResultsProps {
  result: MatchResult;
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function MatchResults({ result }: MatchResultsProps) {
  const previewRows = result.result.rows.slice(0, PREVIEW_ROW_LIMIT);

  const handleDownloadMatched = () => {
    exportWorksheetToXlsx(
      { headers: result.result.headers, rows: result.result.rows },
      MATCH_EXPORT_FILENAMES.matched,
      "Matched Data",
    );
  };

  const handleDownloadNotFound = () => {
    exportWorksheetToXlsx(
      { headers: result.notFoundRows.headers, rows: result.notFoundRows.rows },
      MATCH_EXPORT_FILENAMES.notFound,
      "Not Found",
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Match Summary</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem label="Base records" value={formatMatchStat(result.stats.baseRecords)} />
          <SummaryItem label="Matched" value={formatMatchStat(result.stats.matched)} />
          <SummaryItem label="Not found" value={formatMatchStat(result.stats.notFound)} />
          <SummaryItem
            label="Duplicate lookup IDs"
            value={formatMatchStat(result.stats.duplicateLookupIds)}
          />
        </div>

        {result.stats.duplicateLookupIds > 0 && (
          <p className="mt-4 text-sm text-slate-600">
            Duplicate lookup matches were resolved using the{" "}
            <span className="font-semibold text-slate-900">
              {result.duplicateBehavior === "first" ? "first match" : "last match"}
            </span>{" "}
            in the Lookup File.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Result Preview</h2>
            <p className="mt-1 text-sm text-slate-500">
              Matched: {formatMatchStat(result.stats.matched)} · Not Found:{" "}
              {formatMatchStat(result.stats.notFound)}
            </p>
          </div>
          <p className="text-sm text-slate-500">
            {result.result.totalRows > PREVIEW_ROW_LIMIT
              ? `Showing first ${PREVIEW_ROW_LIMIT} rows`
              : `${result.result.totalRows.toLocaleString()} row${result.result.totalRows === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {result.result.headers.map((header, index) => (
                  <th
                    key={`${header}-${index}`}
                    className="whitespace-nowrap px-4 py-3 font-semibold text-slate-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {previewRows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`} className="hover:bg-slate-50">
                  {result.result.headers.map((_, columnIndex) => {
                    const cell = row[columnIndex] ?? "";

                    return (
                      <td
                        key={`cell-${rowIndex}-${columnIndex}`}
                        className={`whitespace-nowrap px-4 py-2 ${
                          cell === NOT_FOUND_VALUE ? "text-amber-700" : "text-slate-700"
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownloadMatched}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Download Excel
          </button>
          <button
            type="button"
            onClick={handleDownloadNotFound}
            disabled={result.notFoundRows.totalRows === 0}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Download Not Found
          </button>
        </div>
      </section>
    </div>
  );
}
