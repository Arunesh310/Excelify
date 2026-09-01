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

function looksNumeric(value: string): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.replace(/,/g, "").trim();
  return normalized.length > 0 && !Number.isNaN(Number(normalized));
}

function scoreHeaderCandidate(row: string[]): number {
  const cells = row.filter((cell) => cell.length > 0);

  if (cells.length === 0) {
    return 0;
  }

  const textCells = cells.filter((cell) => !looksNumeric(cell)).length;
  const numericCells = cells.length - textCells;

  if (textCells === 0) {
    return 0;
  }

  return textCells * 3 - numericCells * 2 + cells.length * 0.1;
}

function findHeaderRowIndex(matrix: string[][], maxScan = 10): number {
  const limit = Math.min(maxScan, matrix.length);
  let bestIndex = 0;
  let bestScore = -1;

  for (let rowIndex = 0; rowIndex < limit; rowIndex += 1) {
    const score = scoreHeaderCandidate(matrix[rowIndex] ?? []);

    if (score > bestScore) {
      bestScore = score;
      bestIndex = rowIndex;
    }
  }

  return bestIndex;
}

function getWorksheetDimensions(worksheet: XLSX.WorkSheet): { rowCount: number; columnCount: number } {
  const ref = worksheet["!ref"];

  if (!ref) {
    return { rowCount: 0, columnCount: 0 };
  }

  const range = XLSX.utils.decode_range(ref);

  return {
    rowCount: range.e.r - range.s.r + 1,
    columnCount: range.e.c - range.s.c + 1,
  };
}

function readWorksheetMatrix(worksheet: XLSX.WorkSheet): string[][] {
  const { rowCount, columnCount } = getWorksheetDimensions(worksheet);

  if (rowCount === 0 || columnCount === 0) {
    return [];
  }

  const matrix: string[][] = [];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const row: string[] = [];

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });
      const cell = worksheet[cellAddress];
      const value = cell?.w ?? cell?.v ?? "";
      row.push(normalizeCellValue(value));
    }

    matrix.push(row);
  }

  return matrix;
}

function resolveHeaderName(
  matrix: string[][],
  columnIndex: number,
  headerRowIndex: number,
  scanLimit: number,
): string {
  const direct = matrix[headerRowIndex]?.[columnIndex] ?? "";

  if (direct.length > 0) {
    return direct;
  }

  for (let rowIndex = 0; rowIndex < scanLimit; rowIndex += 1) {
    if (rowIndex === headerRowIndex) {
      continue;
    }

    const candidate = matrix[rowIndex]?.[columnIndex] ?? "";

    if (candidate.length > 0 && !looksNumeric(candidate)) {
      return candidate;
    }
  }

  return `Column ${columnIndex + 1}`;
}

function buildHeaders(matrix: string[][], headerRowIndex: number): string[] {
  const columnCount = matrix[headerRowIndex]?.length ?? 0;
  const scanLimit = Math.min(10, matrix.length);
  const headers = Array.from({ length: columnCount }, (_, columnIndex) =>
    resolveHeaderName(matrix, columnIndex, headerRowIndex, scanLimit),
  );

  return makeUniqueHeaders(headers);
}

function makeUniqueHeaders(headers: string[]): string[] {
  const seen = new Map<string, number>();

  return headers.map((header) => {
    const count = seen.get(header) ?? 0;
    seen.set(header, count + 1);

    if (count === 0) {
      return header;
    }

    return `${header} (${count + 1})`;
  });
}

function sheetToMatrix(worksheet: XLSX.WorkSheet): string[][] {
  return readWorksheetMatrix(worksheet);
}

function parseSheet(worksheet: XLSX.WorkSheet, sheetName: string): ParsedSheet | null {
  const matrix = sheetToMatrix(worksheet);

  if (matrix.length === 0) {
    return null;
  }

  const headerRowIndex = findHeaderRowIndex(matrix);
  const headers = buildHeaders(matrix, headerRowIndex);
  const dataRows = matrix.slice(headerRowIndex + 1);
  const columnCount = headers.length;

  const normalizedRows = dataRows
    .map((row) => {
      const nextRow = [...row];
      while (nextRow.length < columnCount) {
        nextRow.push("");
      }
      return nextRow.slice(0, columnCount);
    })
    .filter((row) => row.some((cell) => cell.length > 0));

  if (normalizedRows.length === 0 && headers.every((header) => header.startsWith("Column "))) {
    return null;
  }

  return {
    name: sheetName,
    headers,
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

export function parseCsvText(csv: string, fileName: string): WorkbookMetadata {
  const bytes = new TextEncoder().encode(csv);

  if (bytes.byteLength === 0) {
    throw new ParseWorkbookError("empty_file", PARSE_ERROR_MESSAGES.empty_file);
  }

  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return parseCsvWorkbook(buffer, fileName, bytes.byteLength);
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
