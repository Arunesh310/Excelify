import * as XLSX from "xlsx";

import type { CellValue, WorksheetData } from "./cleaner-types";

const DEFAULT_FILENAME = "Excelify_Cleaned.xlsx";

function formatCellForExport(value: CellValue): string | number {
  if (typeof value === "number") {
    return value;
  }

  return value;
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

export { DEFAULT_FILENAME as CLEANED_EXPORT_FILENAME };
