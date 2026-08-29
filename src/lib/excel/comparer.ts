import {
  COMPARE_ERROR_MESSAGES,
  CompareWorkbookError,
  type CompareInput,
  type CompareResult,
  type CompareStats,
  type CompareTable,
} from "./comparer-types";

interface IdentifierIndex {
  normalized: string;
  original: string;
  rowIndexes: number[];
}

function normalizeIdentifier(value: string | undefined): string {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function isBlankIdentifier(value: string): boolean {
  return value.length === 0;
}

function getColumnIndex(headers: string[], columnName: string): number {
  return headers.findIndex((header) => header === columnName);
}

function buildIdentifierMap(
  rows: string[][],
  columnIndex: number,
): {
  map: Map<string, IdentifierIndex>;
  blankRowCount: number;
} {
  const map = new Map<string, IdentifierIndex>();
  let blankRowCount = 0;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const rawValue = rows[rowIndex]?.[columnIndex] ?? "";
    const normalized = normalizeIdentifier(rawValue);

    if (isBlankIdentifier(normalized)) {
      blankRowCount += 1;
      continue;
    }

    const existing = map.get(normalized);

    if (existing) {
      existing.rowIndexes.push(rowIndex);
      continue;
    }

    map.set(normalized, {
      normalized,
      original: rawValue,
      rowIndexes: [rowIndex],
    });
  }

  return { map, blankRowCount };
}

function countDuplicateIdentifiers(map: Map<string, IdentifierIndex>): number {
  let count = 0;

  for (const entry of map.values()) {
    if (entry.rowIndexes.length > 1) {
      count += 1;
    }
  }

  return count;
}

function getMatchedHeader(
  header: string,
  side: "A" | "B",
  headersA: string[],
  headersB: string[],
): string {
  const otherHeaders = side === "A" ? headersB : headersA;

  if (otherHeaders.includes(header)) {
    return `File${side}_${header}`;
  }

  return header;
}

function buildMatchedTable(
  fileAHeaders: string[],
  fileARows: string[][],
  fileBHeaders: string[],
  fileBRows: string[][],
  matchedKeys: string[],
  mapA: Map<string, IdentifierIndex>,
  mapB: Map<string, IdentifierIndex>,
): CompareTable {
  const headers = [
    ...fileAHeaders.map((header) => getMatchedHeader(header, "A", fileAHeaders, fileBHeaders)),
    ...fileBHeaders.map((header) => getMatchedHeader(header, "B", fileAHeaders, fileBHeaders)),
  ];

  const rows: string[][] = [];

  for (const key of matchedKeys) {
    const entryA = mapA.get(key);
    const entryB = mapB.get(key);

    if (!entryA || !entryB) {
      continue;
    }

    for (const rowIndexA of entryA.rowIndexes) {
      for (const rowIndexB of entryB.rowIndexes) {
        const rowA = fileARows[rowIndexA] ?? [];
        const rowB = fileBRows[rowIndexB] ?? [];
        rows.push([...rowA, ...rowB]);
      }
    }
  }

  return { headers, rows, totalRows: rows.length };
}

function buildRowsForKeys(
  headers: string[],
  rows: string[][],
  map: Map<string, IdentifierIndex>,
  keys: string[],
): CompareTable {
  const resultRows: string[][] = [];

  for (const key of keys) {
    const entry = map.get(key);

    if (!entry) {
      continue;
    }

    for (const rowIndex of entry.rowIndexes) {
      resultRows.push([...(rows[rowIndex] ?? [])]);
    }
  }

  return {
    headers: [...headers],
    rows: resultRows,
    totalRows: resultRows.length,
  };
}

function buildDuplicateRows(
  headers: string[],
  rows: string[][],
  map: Map<string, IdentifierIndex>,
): CompareTable {
  const duplicateKeys = [...map.entries()]
    .filter(([, entry]) => entry.rowIndexes.length > 1)
    .map(([key]) => key);

  return buildRowsForKeys(headers, rows, map, duplicateKeys);
}

export function compareWorksheets(input: CompareInput): CompareResult {
  const columnAIndex = getColumnIndex(input.fileAHeaders, input.columnA);
  const columnBIndex = getColumnIndex(input.fileBHeaders, input.columnB);

  if (columnAIndex === -1 || columnBIndex === -1) {
    throw new CompareWorkbookError(COMPARE_ERROR_MESSAGES.missingColumn);
  }

  if (input.fileARows.length === 0 && input.fileBRows.length === 0) {
    throw new CompareWorkbookError(COMPARE_ERROR_MESSAGES.emptySheet);
  }

  const { map: mapA, blankRowCount: blankA } = buildIdentifierMap(
    input.fileARows,
    columnAIndex,
  );
  const { map: mapB, blankRowCount: blankB } = buildIdentifierMap(
    input.fileBRows,
    columnBIndex,
  );

  const keysA = [...mapA.keys()];
  const keysB = new Set(mapB.keys());

  const matchedKeys = keysA.filter((key) => mapB.has(key)).sort();
  const onlyInAKeys = keysA.filter((key) => !mapB.has(key)).sort();
  const onlyInBKeys = [...mapB.keys()].filter((key) => !mapA.has(key)).sort();

  const stats: CompareStats = {
    matchedCount: matchedKeys.length,
    onlyInFileACount: onlyInAKeys.length,
    onlyInFileBCount: onlyInBKeys.length,
    duplicateIdentifiersFileA: countDuplicateIdentifiers(mapA),
    duplicateIdentifiersFileB: countDuplicateIdentifiers(mapB),
    blankIdentifiersFileA: blankA,
    blankIdentifiersFileB: blankB,
  };

  return {
    stats,
    matched: buildMatchedTable(
      input.fileAHeaders,
      input.fileARows,
      input.fileBHeaders,
      input.fileBRows,
      matchedKeys,
      mapA,
      mapB,
    ),
    onlyInFileA: buildRowsForKeys(
      input.fileAHeaders,
      input.fileARows,
      mapA,
      onlyInAKeys,
    ),
    onlyInFileB: buildRowsForKeys(
      input.fileBHeaders,
      input.fileBRows,
      mapB,
      onlyInBKeys,
    ),
    duplicatesFileA: buildDuplicateRows(input.fileAHeaders, input.fileARows, mapA),
    duplicatesFileB: buildDuplicateRows(input.fileBHeaders, input.fileBRows, mapB),
  };
}

export function normalizeIdentifierForCompare(value: string | undefined): string {
  return normalizeIdentifier(value);
}

export function formatCompareStat(value: number): string {
  return value.toLocaleString("en-US");
}
