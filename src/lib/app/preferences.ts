import type { CleaningOptions } from "@/lib/excel/cleaner-types";

const CLEAN_OPTIONS_KEY = "excelify.clean.options";
const COMPARE_COLUMNS_KEY = "excelify.compare.columns";
const MATCH_COLUMNS_KEY = "excelify.match.columns";
const AGEING_COLUMN_KEY = "excelify.ageing.dateColumn";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota or private-mode failures.
  }
}

export function loadCleanOptions(fallback: CleaningOptions): CleaningOptions {
  const stored = readJson<Partial<CleaningOptions>>(CLEAN_OPTIONS_KEY);
  if (!stored) {
    return fallback;
  }

  return {
    removeBlankRows: Boolean(stored.removeBlankRows),
    trimSpaces: Boolean(stored.trimSpaces),
    removeDuplicateRows: Boolean(stored.removeDuplicateRows),
    removeBlankColumns: Boolean(stored.removeBlankColumns),
    convertNumericText: Boolean(stored.convertNumericText),
  };
}

export function saveCleanOptions(options: CleaningOptions): void {
  writeJson(CLEAN_OPTIONS_KEY, options);
}

export function loadPreferredColumn(headers: string[], storedName: string | null): string {
  if (!storedName) {
    return "";
  }

  return headers.includes(storedName) ? storedName : "";
}

export function loadCompareColumnNames(): { columnA: string; columnB: string } | null {
  return readJson<{ columnA: string; columnB: string }>(COMPARE_COLUMNS_KEY);
}

export function saveCompareColumnNames(columnA: string, columnB: string): void {
  writeJson(COMPARE_COLUMNS_KEY, { columnA, columnB });
}

export function loadMatchColumnNames(): {
  baseKeyColumn: string;
  lookupKeyColumn: string;
} | null {
  return readJson<{ baseKeyColumn: string; lookupKeyColumn: string }>(MATCH_COLUMNS_KEY);
}

export function saveMatchColumnNames(baseKeyColumn: string, lookupKeyColumn: string): void {
  writeJson(MATCH_COLUMNS_KEY, { baseKeyColumn, lookupKeyColumn });
}

export function loadAgeingDateColumn(): string | null {
  return readJson<string>(AGEING_COLUMN_KEY);
}

export function saveAgeingDateColumn(column: string): void {
  writeJson(AGEING_COLUMN_KEY, column);
}
