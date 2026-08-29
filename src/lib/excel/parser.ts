import * as XLSX from "xlsx";

import {
  PARSE_ERROR_MESSAGES,
  ParseWorkbookError,
  type ParsedSheet,
  type SupportedFileType,
  type WorkbookMetadata,
} from "./types";

const SUPPORTED_EXTENSIONS = new Set(["xlsx", "xls", "csv"]);
const PREVIEW_ROW_LIMIT = 100;

function getFileExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

function normalizeCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value).trim();
}

function detectHeaders(firstRow: string[], secondRow: string[]): string[] {
  const firstRowHasValues = firstRow.some((cell) => cell.length > 0);
  const secondRowHasValues = secondRow.some((cell) => cell.length > 0);

  if (!firstRowHasValues) {
    return firstRow.map((_, index) => `Column ${index + 1}`);
  }

  if (!secondRowHasValues) {
    return firstRow.map((cell, index) => cell || `Column ${index + 1}`);
  }

  return firstRow.map((cell, index) => cell || `Column ${index + 1}`);
}

function sheetToMatrix(worksheet: XLSX.WorkSheet): string[][] {
  const matrix = XLSX.utils.sheet_to_json<(string | number | boolean | Date | null)[]>(
    worksheet,
    {
      header: 1,
      raw: false,
      defval: "",
      blankrows: false,
    },
  );

  return matrix.map((row) => row.map((cell) => normalizeCellValue(cell)));
}

function parseSheet(worksheet: XLSX.WorkSheet, sheetName: string): ParsedSheet | null {
  const matrix = sheetToMatrix(worksheet);

  if (matrix.length === 0) {
    return null;
  }

  const firstRow = matrix[0] ?? [];
  const secondRow = matrix[1] ?? [];
  const headers = detectHeaders(firstRow, secondRow);
  const dataRows = matrix.slice(1);
  const columnCount = Math.max(headers.length, ...matrix.map((row) => row.length), 0);

  const normalizedRows = dataRows.map((row) => {
    const nextRow = [...row];
    while (nextRow.length < columnCount) {
      nextRow.push("");
    }
    return nextRow.slice(0, columnCount);
  });

  if (normalizedRows.length === 0 && headers.every((header) => header.startsWith("Column "))) {
    return null;
  }

  return {
    name: sheetName,
    headers: headers.slice(0, columnCount),
    rows: normalizedRows,
    rowCount: normalizedRows.length,
    columnCount,
  };
}

function parseCsvWorkbook(
  arrayBuffer: ArrayBuffer,
  fileName: string,
  fileSize: number,
): WorkbookMetadata {
  let workbook: XLSX.WorkBook;

  try {
    workbook = XLSX.read(arrayBuffer, { type: "array" });
  } catch {
    throw new ParseWorkbookError("corrupted_file", PARSE_ERROR_MESSAGES.corrupted_file);
  }

  const sheetName = workbook.SheetNames[0] ?? fileName.replace(/\.[^.]+$/, "");
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new ParseWorkbookError("no_usable_data", PARSE_ERROR_MESSAGES.no_usable_data);
  }

  const parsedSheet = parseSheet(worksheet, sheetName);

  if (!parsedSheet) {
    throw new ParseWorkbookError("no_usable_data", PARSE_ERROR_MESSAGES.no_usable_data);
  }

  return {
    fileName,
    fileSize,
    fileType: "csv",
    sheetCount: 1,
    sheets: [parsedSheet],
  };
}

function parseExcelWorkbook(
  arrayBuffer: ArrayBuffer,
  fileName: string,
  fileSize: number,
  fileType: SupportedFileType,
): WorkbookMetadata {
  let workbook: XLSX.WorkBook;

  try {
    workbook = XLSX.read(arrayBuffer, { type: "array" });
  } catch {
    throw new ParseWorkbookError("corrupted_file", PARSE_ERROR_MESSAGES.corrupted_file);
  }

  if (!workbook.SheetNames.length) {
    throw new ParseWorkbookError("no_sheets", PARSE_ERROR_MESSAGES.no_sheets);
  }

  const sheets = workbook.SheetNames.map((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      return null;
    }
    return parseSheet(worksheet, sheetName);
  }).filter((sheet): sheet is ParsedSheet => sheet !== null);

  if (!sheets.length) {
    throw new ParseWorkbookError("no_usable_data", PARSE_ERROR_MESSAGES.no_usable_data);
  }

  return {
    fileName,
    fileSize,
    fileType,
    sheetCount: workbook.SheetNames.length,
    sheets,
  };
}

export async function parseWorkbookFile(file: File): Promise<WorkbookMetadata> {
  if (file.size === 0) {
    throw new ParseWorkbookError("empty_file", PARSE_ERROR_MESSAGES.empty_file);
  }

  const extension = getFileExtension(file.name);

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    throw new ParseWorkbookError(
      "unsupported_type",
      PARSE_ERROR_MESSAGES.unsupported_type,
    );
  }

  const fileType = extension as SupportedFileType;
  const arrayBuffer = await file.arrayBuffer();

  if (arrayBuffer.byteLength === 0) {
    throw new ParseWorkbookError("empty_file", PARSE_ERROR_MESSAGES.empty_file);
  }

  if (fileType === "csv") {
    return parseCsvWorkbook(arrayBuffer, file.name, file.size);
  }

  return parseExcelWorkbook(arrayBuffer, file.name, file.size, fileType);
}

export function getPreviewRows(
  sheet: { rows: string[][] },
  limit = PREVIEW_ROW_LIMIT,
): string[][] {
  return sheet.rows.slice(0, limit);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export { PREVIEW_ROW_LIMIT };
