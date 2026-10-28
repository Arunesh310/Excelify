"use client";

import {
  csvFileNameFromXlsx,
  exportWorksheetToCsv,
  exportWorksheetToXlsx,
} from "@/lib/excel/export";
import type { WorksheetData } from "@/lib/excel/cleaner-types";

interface WorksheetExportButtonsProps {
  worksheet: WorksheetData;
  xlsxFileName: string;
  sheetName?: string;
  disabled?: boolean;
  primaryLabel?: string;
  csvLabel?: string;
  onExported?: (format: "xlsx" | "csv") => void;
}

export function WorksheetExportButtons({
  worksheet,
  xlsxFileName,
  sheetName = "Results",
  disabled = false,
  primaryLabel = "Download Excel",
  csvLabel = "Download CSV",
  onExported,
}: WorksheetExportButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          exportWorksheetToXlsx(worksheet, xlsxFileName, sheetName);
          onExported?.("xlsx");
        }}
        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          exportWorksheetToCsv(worksheet, csvFileNameFromXlsx(xlsxFileName));
          onExported?.("csv");
        }}
        className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {csvLabel}
      </button>
    </div>
  );
}
