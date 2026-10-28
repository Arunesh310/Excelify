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
        className="cursor-pointer rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition duration-[var(--transition-fast)] hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
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
        className="cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-muted)] transition duration-[var(--transition-fast)] hover:bg-[var(--color-surface-muted)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {csvLabel}
      </button>
    </div>
  );
}
