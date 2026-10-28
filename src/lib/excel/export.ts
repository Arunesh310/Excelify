import * as XLSX from "xlsx";

import type { CellValue, WorksheetData } from "./cleaner-types";

const DEFAULT_FILENAME = "Excelify_Cleaned.xlsx";
const UTF8_BOM = "\uFEFF";

function formatCellForExport(value: CellValue): string | number {
  if (typeof value === "number") {
    return value;
  }

  return value;
}

function escapeCsvCell(value: string | number): string {
  const text = String(value);

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export function worksheetToCsv(worksheet: WorksheetData): string {
  const headerLine = worksheet.headers.map(escapeCsvCell).join(",");
  const dataLines = worksheet.rows.map((row) =>
    row.map(formatCellForExport).map(escapeCsvCell).join(","),
  );

  return [headerLine, ...dataLines].join("\r\n");
}

function triggerBrowserDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportWorksheetToXlsx(
  worksheet: WorksheetData,
  fileName: string = DEFAULT_FILENAME,
  sheetName: string = "Cleaned Data",
): void {
  const aoa: (string | number)[][] = [
    worksheet.headers,
    ...worksheet.rows.map((row) => row.map(formatCellForExport)),
  ];

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, fileName);
}

export function exportWorksheetToCsv(
  worksheet: WorksheetData,
  fileName: string,
): void {
  const csvFileName = fileName.toLowerCase().endsWith(".csv")
    ? fileName
    : fileName.replace(/\.xlsx$/i, ".csv");

  const blob = new Blob([UTF8_BOM + worksheetToCsv(worksheet)], {
    type: "text/csv;charset=utf-8",
  });
  triggerBrowserDownload(blob, csvFileName);
}

export function csvFileNameFromXlsx(xlsxFileName: string): string {
  return xlsxFileName.replace(/\.xlsx$/i, ".csv");
}

export { DEFAULT_FILENAME as CLEANED_EXPORT_FILENAME };
