import {
  MATCH_ERROR_MESSAGES,
  MatchWorkbookError,
  NOT_FOUND_VALUE,
  type DuplicateLookupEntry,
  type DuplicateMatchBehavior,
  type MatchInput,
  type MatchResult,
  type MatchStats,
  type MatchTable,
} from "./matcher-types";

function normalizeMatchKey(value: string | undefined): string {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim().toLowerCase();
}

function isBlankMatchKey(normalized: string): boolean {
  return normalized.length === 0;
}

function getColumnIndex(headers: string[], columnName: string): number {
  return headers.findIndex((header) => header === columnName);
}

function buildLookupIndex(
  rows: string[][],
  keyColumnIndex: number,
): Map<string, number[]> {
  const map = new Map<string, number[]>();

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const rawValue = rows[rowIndex]?.[keyColumnIndex] ?? "";
    const normalized = normalizeMatchKey(rawValue);

    if (isBlankMatchKey(normalized)) {
      continue;
    }

    const existing = map.get(normalized);

    if (existing) {
      existing.push(rowIndex);
      continue;
    }

    map.set(normalized, [rowIndex]);
  }

  return map;
}

export function detectDuplicateLookupEntries(
  lookupRows: string[][],
  lookupKeyColumnIndex: number,
): DuplicateLookupEntry[] {
  const map = buildLookupIndex(lookupRows, lookupKeyColumnIndex);
  const entries: DuplicateLookupEntry[] = [];

  for (const rowIndexes of map.values()) {
    if (rowIndexes.length <= 1) {
      continue;
    }

    const firstRowIndex = rowIndexes[0]!;
    const displayKey = lookupRows[firstRowIndex]?.[lookupKeyColumnIndex] ?? "";

    entries.push({
      displayKey: String(displayKey),
      count: rowIndexes.length,
    });
  }

  return entries.sort((left, right) =>
    left.displayKey.localeCompare(right.displayKey, undefined, { numeric: true }),
  );
}

function resolveBroughtHeader(columnName: string, baseHeaders: string[]): string {
  if (baseHeaders.includes(columnName)) {
    return `${columnName} (Lookup)`;
  }

  return columnName;
}

function pickLookupRowIndex(
  rowIndexes: number[],
  behavior: DuplicateMatchBehavior,
): number {
  return behavior === "first" ? rowIndexes[0]! : rowIndexes[rowIndexes.length - 1]!;
}

function countDuplicateLookupIds(map: Map<string, number[]>): number {
  let count = 0;

  for (const rowIndexes of map.values()) {
    if (rowIndexes.length > 1) {
      count += 1;
    }
  }

  return count;
}

export function matchAndBringData(input: MatchInput): MatchResult {
  const baseKeyIndex = getColumnIndex(input.baseHeaders, input.baseKeyColumn);
  const lookupKeyIndex = getColumnIndex(input.lookupHeaders, input.lookupKeyColumn);

  if (baseKeyIndex === -1 || lookupKeyIndex === -1) {
    throw new MatchWorkbookError(MATCH_ERROR_MESSAGES.missingColumn);
  }

  if (input.baseRows.length === 0) {
    throw new MatchWorkbookError(MATCH_ERROR_MESSAGES.emptySheet);
  }

  if (input.columnsToBring.length === 0) {
    throw new MatchWorkbookError(MATCH_ERROR_MESSAGES.noColumnsToBring);
  }

  const broughtColumnIndexes = input.columnsToBring.map((column) => {
    const index = getColumnIndex(input.lookupHeaders, column);

    if (index === -1) {
      throw new MatchWorkbookError(MATCH_ERROR_MESSAGES.missingColumn);
    }

    return index;
  });

  const lookupMap = buildLookupIndex(input.lookupRows, lookupKeyIndex);
  const duplicateLookupEntries = detectDuplicateLookupEntries(
    input.lookupRows,
    lookupKeyIndex,
  );

  const broughtHeaders = input.columnsToBring.map((column) =>
    resolveBroughtHeader(column, input.baseHeaders),
  );

  const resultHeaders = [...input.baseHeaders, ...broughtHeaders];
  const resultRows: string[][] = [];
  const notFoundRows: string[][] = [];

  let matched = 0;
  let notFound = 0;

  for (const baseRow of input.baseRows) {
    const outputRow = [...baseRow];
    const normalizedKey = normalizeMatchKey(baseRow[baseKeyIndex]);
    const lookupRowIndexes = lookupMap.get(normalizedKey);

    if (isBlankMatchKey(normalizedKey) || !lookupRowIndexes) {
      for (let index = 0; index < input.columnsToBring.length; index += 1) {
        outputRow.push(NOT_FOUND_VALUE);
      }

      notFound += 1;
      notFoundRows.push([...baseRow]);
      resultRows.push(outputRow);
      continue;
    }

    const lookupRowIndex = pickLookupRowIndex(lookupRowIndexes, input.duplicateBehavior);
    const lookupRow = input.lookupRows[lookupRowIndex] ?? [];

    for (const columnIndex of broughtColumnIndexes) {
      outputRow.push(lookupRow[columnIndex] ?? "");
    }

    matched += 1;
    resultRows.push(outputRow);
  }

  const stats: MatchStats = {
    baseRecords: input.baseRows.length,
    matched,
    notFound,
    duplicateLookupIds: countDuplicateLookupIds(lookupMap),
  };

  const result: MatchTable = {
    headers: resultHeaders,
    rows: resultRows,
    totalRows: resultRows.length,
  };

  return {
    stats,
    result,
    notFoundRows: {
      headers: [...input.baseHeaders],
      rows: notFoundRows,
      totalRows: notFoundRows.length,
    },
    duplicateLookupEntries,
    duplicateBehavior: input.duplicateBehavior,
  };
}

export function formatMatchStat(value: number): string {
  return value.toLocaleString("en-US");
}
