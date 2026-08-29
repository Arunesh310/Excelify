"use client";

import {
  formatFileSize,
  getPreviewRows,
  PREVIEW_ROW_LIMIT,
} from "@/lib/excel/parser";
import type { ParsedSheet, WorkbookMetadata } from "@/lib/excel/types";

interface FileInfoPanelProps {
  metadata: WorkbookMetadata;
  selectedSheet: ParsedSheet;
}

export function FileInfoPanel({ metadata, selectedSheet }: FileInfoPanelProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
      <InfoItem label="File name" value={metadata.fileName} />
      <InfoItem label="File size" value={formatFileSize(metadata.fileSize)} />
      <InfoItem label="File type" value={metadata.fileType.toUpperCase()} />
      <InfoItem label="Number of sheets" value={String(metadata.sheetCount)} />
      <InfoItem label="Number of rows" value={String(selectedSheet.rowCount)} />
      <InfoItem label="Number of columns" value={String(selectedSheet.columnCount)} />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900 break-all">{value}</p>
    </div>
  );
}

interface SheetSelectorProps {
  sheets: ParsedSheet[];
  selectedSheetName: string;
  onSelect: (sheetName: string) => void;
}

export function SheetSelector({
  sheets,
  selectedSheetName,
  onSelect,
}: SheetSelectorProps) {
  if (sheets.length <= 1) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <label className="block text-sm font-medium text-slate-700" htmlFor="sheet-selector">
        Select sheet
      </label>
      <select
        id="sheet-selector"
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 focus:ring-2"
        value={selectedSheetName}
        onChange={(event) => onSelect(event.target.value)}
      >
        {sheets.map((sheet) => (
          <option key={sheet.name} value={sheet.name}>
            {sheet.name}
          </option>
        ))}
      </select>
    </div>
  );
}

interface SheetPreviewTableProps {
  sheet: {
    headers: string[];
    rows: string[][];
  };
  title?: string;
}

export function SheetPreviewTable({ sheet, title = "Preview" }: SheetPreviewTableProps) {
  const previewRows = getPreviewRows(sheet, PREVIEW_ROW_LIMIT);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">Showing first {PREVIEW_ROW_LIMIT} rows</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {sheet.headers.map((header, index) => (
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
                {sheet.headers.map((_, columnIndex) => (
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
    </div>
  );
}
