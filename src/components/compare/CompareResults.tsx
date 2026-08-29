"use client";

import { useState } from "react";

import {
  COMPARE_EXPORT_FILENAMES,
  type CompareResult,
  type CompareResultTab,
} from "@/lib/excel/comparer-types";
import { formatCompareStat } from "@/lib/excel/comparer";
import { exportWorksheetToXlsx } from "@/lib/excel/export";
import { PREVIEW_ROW_LIMIT } from "@/lib/excel/parser";

interface CompareSummaryProps {
  stats: CompareResult["stats"];
}

export function CompareSummary({ stats }: CompareSummaryProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryItem label="Matched" value={formatCompareStat(stats.matchedCount)} />
      <SummaryItem label="Only in File A" value={formatCompareStat(stats.onlyInFileACount)} />
      <SummaryItem label="Only in File B" value={formatCompareStat(stats.onlyInFileBCount)} />
      <SummaryItem
        label="Duplicate identifiers — File A"
        value={formatCompareStat(stats.duplicateIdentifiersFileA)}
      />
      <SummaryItem
        label="Duplicate identifiers — File B"
        value={formatCompareStat(stats.duplicateIdentifiersFileB)}
      />
      <SummaryItem
        label="Blank identifiers — File A"
        value={formatCompareStat(stats.blankIdentifiersFileA)}
      />
      <SummaryItem
        label="Blank identifiers — File B"
        value={formatCompareStat(stats.blankIdentifiersFileB)}
      />
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

const TABS: { id: CompareResultTab; label: string }[] = [
  { id: "matched", label: "Matched" },
  { id: "onlyInFileA", label: "Only in File A" },
  { id: "onlyInFileB", label: "Only in File B" },
  { id: "duplicatesFileA", label: "Duplicates in File A" },
  { id: "duplicatesFileB", label: "Duplicates in File B" },
];

interface CompareResultsProps {
  result: CompareResult;
}

export function CompareResults({ result }: CompareResultsProps) {
  const [activeTab, setActiveTab] = useState<CompareResultTab>("matched");

  const activeTable = result[activeTab];
  const previewRows = activeTable.rows.slice(0, PREVIEW_ROW_LIMIT);

  const handleDownload = (tab: CompareResultTab) => {
    const table = result[tab];
    exportWorksheetToXlsx(
      { headers: table.headers, rows: table.rows },
      COMPARE_EXPORT_FILENAMES[tab],
      TABS.find((item) => item.id === tab)?.label ?? "Results",
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <CompareSummary stats={result.stats} />

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {TABS.find((tab) => tab.id === activeTab)?.label}
          </h2>
          <p className="text-sm text-slate-500">
            {activeTable.totalRows > PREVIEW_ROW_LIMIT
              ? `Showing first ${PREVIEW_ROW_LIMIT} rows`
              : `${activeTable.totalRows.toLocaleString()} row${activeTable.totalRows === 1 ? "" : "s"}`}
          </p>
        </div>

        {activeTable.totalRows === 0 ? (
          <p className="text-sm text-slate-500">No rows in this result set.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {activeTable.headers.map((header, index) => (
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
                    {activeTable.headers.map((_, columnIndex) => (
                      <td
                        key={`cell-${rowIndex}-${columnIndex}`}
                        className="whitespace-nowrap px-4 py-2 text-slate-700"
                      >
                        {row[columnIndex] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="button"
          onClick={() => handleDownload(activeTab)}
          disabled={activeTable.totalRows === 0}
          className="mt-4 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Download {TABS.find((tab) => tab.id === activeTab)?.label}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {TABS.map((tab) => (
          <button
            key={`download-${tab.id}`}
            type="button"
            onClick={() => handleDownload(tab.id)}
            disabled={result[tab.id].totalRows === 0}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {COMPARE_EXPORT_FILENAMES[tab.id].replace(".xlsx", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
