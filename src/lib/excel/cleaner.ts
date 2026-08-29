import type { ParsedSheet } from "./types";
import type {
  CellValue,
  CleanedWorksheet,
  CleaningOptions,
  WorksheetData,
} from "./cleaner-types";
import { createEmptyCleaningStats } from "./cleaner-types";

function cloneWorksheet(sheet: ParsedSheet): WorksheetData {
  return {
    headers: [...sheet.headers],
    rows: sheet.rows.map((row) => [...row]),
  };
}

function isCellEmpty(value: CellValue): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "number") {
    return false;
  }

  return value.trim().length === 0;
}

function normalizeForComparison(value: CellValue): string {
  if (typeof value === "number") {
    return String(value);
  }

  return value.trim();
}

function rowKey(row: CellValue[]): string {
  return row.map((cell) => normalizeForComparison(cell)).join("\u0001");
}

/**
 * Conservative numeric conversion: only plain numeric strings without leading zeros.
 * Examples: "100" -> 100, "250.50" -> 250.50, "00123" -> stays "00123"
 */
function tryConvertToNumber(value: CellValue): { value: CellValue; converted: boolean } {
  if (typeof value === "number") {
    return { value, converted: false };
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { value, converted: false };
  }

  // Reject leading-zero identifiers like "00123", "007"
  if (/^0\d+/.test(trimmed)) {
    return { value, converted: false };
  }

  // Integer or decimal, optional negative sign
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return { value, converted: false };
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed)) {
    return { value, converted: false };
  }

  return { value: parsed, converted: true };
}

export function trimTextValues(data: WorksheetData): {
  data: WorksheetData;
  cellsTrimmed: number;
} {
  let cellsTrimmed = 0;

  const rows = data.rows.map((row) =>
    row.map((cell) => {
      if (typeof cell !== "string") {
        return cell;
      }

      const trimmed = cell.trim();

      if (trimmed !== cell) {
        cellsTrimmed += 1;
      }

      return trimmed;
    }),
  );

  return {
    data: { headers: [...data.headers], rows },
    cellsTrimmed,
  };
}

export function convertSafeNumericValues(data: WorksheetData): {
  data: WorksheetData;
  numericValuesConverted: number;
} {
  let numericValuesConverted = 0;

  const rows = data.rows.map((row) =>
    row.map((cell) => {
      const result = tryConvertToNumber(cell);

      if (result.converted) {
        numericValuesConverted += 1;
      }

      return result.value;
    }),
  );

  return {
    data: { headers: [...data.headers], rows },
    numericValuesConverted,
  };
}

export function removeBlankRows(data: WorksheetData): {
  data: WorksheetData;
  blankRowsRemoved: number;
} {
  const originalCount = data.rows.length;
  const rows = data.rows.filter((row) => !row.every((cell) => isCellEmpty(cell)));
  const blankRowsRemoved = originalCount - rows.length;

  return {
    data: { headers: [...data.headers], rows },
    blankRowsRemoved,
  };
}

export function removeDuplicateRows(data: WorksheetData): {
  data: WorksheetData;
  duplicateRowsRemoved: number;
} {
  const seen = new Set<string>();
  const uniqueRows: CellValue[][] = [];
  let duplicateRowsRemoved = 0;

  for (const row of data.rows) {
    const key = rowKey(row);

    if (seen.has(key)) {
      duplicateRowsRemoved += 1;
      continue;
    }

    seen.add(key);
    uniqueRows.push([...row]);
  }

  return {
    data: { headers: [...data.headers], rows: uniqueRows },
    duplicateRowsRemoved,
  };
}

export function removeBlankColumns(data: WorksheetData): {
  data: WorksheetData;
  blankColumnsRemoved: number;
} {
  const columnCount = data.headers.length;

  if (columnCount === 0) {
    return { data: { headers: [], rows: [] }, blankColumnsRemoved: 0 };
  }

  const blankIndexes = new Set<number>();

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    const allDataCellsEmpty = data.rows.every((row) =>
      isCellEmpty(row[columnIndex] ?? ""),
    );

    if (allDataCellsEmpty) {
      blankIndexes.add(columnIndex);
    }
  }

  if (blankIndexes.size === 0) {
    return {
      data: { headers: [...data.headers], rows: data.rows.map((row) => [...row]) },
      blankColumnsRemoved: 0,
    };
  }

  const keepIndexes = Array.from({ length: columnCount }, (_, index) => index).filter(
    (index) => !blankIndexes.has(index),
  );

  const headers = keepIndexes.map((index) => data.headers[index] ?? "");
  const rows = data.rows.map((row) => keepIndexes.map((index) => row[index] ?? ""));

  return {
    data: { headers, rows },
    blankColumnsRemoved: blankIndexes.size,
  };
}

export function cleanWorksheet(
  sheet: ParsedSheet,
  options: CleaningOptions,
): CleanedWorksheet {
  const originalRows = sheet.rowCount;
  const originalColumns = sheet.columnCount;
  const stats = createEmptyCleaningStats(originalRows, originalColumns);

  let data = cloneWorksheet(sheet);

  if (options.trimSpaces) {
    const result = trimTextValues(data);
    data = result.data;
    stats.cellsTrimmed = result.cellsTrimmed;
  }

  if (options.convertNumericText) {
    const result = convertSafeNumericValues(data);
    data = result.data;
    stats.numericValuesConverted = result.numericValuesConverted;
  }

  if (options.removeBlankRows) {
    const result = removeBlankRows(data);
    data = result.data;
    stats.blankRowsRemoved = result.blankRowsRemoved;
  }

  if (options.removeDuplicateRows) {
    const result = removeDuplicateRows(data);
    data = result.data;
    stats.duplicateRowsRemoved = result.duplicateRowsRemoved;
  }

  if (options.removeBlankColumns) {
    const result = removeBlankColumns(data);
    data = result.data;
    stats.blankColumnsRemoved = result.blankColumnsRemoved;
  }

  stats.finalRows = data.rows.length;
  stats.finalColumns = data.headers.length;

  return {
    headers: data.headers,
    rows: data.rows,
    rowCount: data.rows.length,
    columnCount: data.headers.length,
    stats,
    appliedOptions: { ...options },
  };
}

export function formatStatNumber(value: number): string {
  return value.toLocaleString("en-US");
}
