import { ParseWorkbookError } from "./types";

/** Free-tier limits (Phase A1). Raise only after Web Worker ships (Phase B4). */
export const MAX_FILE_BYTES = 15 * 1024 * 1024;
export const MAX_ROWS_PER_SHEET = 50_000;

export function formatLimitBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
}

export const MAX_FILE_SIZE_LABEL = formatLimitBytes(MAX_FILE_BYTES);

export function assertFileSizeWithinLimit(
  byteLength: number,
  context: "upload" | "buffer" = "upload",
): void {
  if (byteLength <= MAX_FILE_BYTES) {
    return;
  }

  const detail =
    context === "upload"
      ? `This file is ${formatLimitBytes(byteLength)}. Excelify supports files up to ${MAX_FILE_SIZE_LABEL} in your browser. Try splitting the sheet or removing unused columns.`
      : `The file exceeds the ${MAX_FILE_SIZE_LABEL} limit after reading.`;

  throw new ParseWorkbookError("file_too_large", detail);
}

export function assertRowCountWithinLimit(rowCount: number, sheetName: string): void {
  if (rowCount <= MAX_ROWS_PER_SHEET) {
    return;
  }

  throw new ParseWorkbookError(
    "row_limit_exceeded",
    `Sheet "${sheetName}" has ${rowCount.toLocaleString()} data rows. The limit is ${MAX_ROWS_PER_SHEET.toLocaleString()} rows per sheet. Split the file or filter rows before uploading.`,
  );
}
