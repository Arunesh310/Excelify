export type CellValue = string | number;

export interface WorksheetData {
  headers: string[];
  rows: CellValue[][];
}

export interface CleaningOptions {
  removeBlankRows: boolean;
  trimSpaces: boolean;
  removeDuplicateRows: boolean;
  removeBlankColumns: boolean;
  convertNumericText: boolean;
}

export const DEFAULT_CLEANING_OPTIONS: CleaningOptions = {
  removeBlankRows: false,
  trimSpaces: false,
  removeDuplicateRows: false,
  removeBlankColumns: false,
  convertNumericText: false,
};

export const STANDARD_CLEANING_OPTIONS: CleaningOptions = {
  removeBlankRows: true,
  trimSpaces: true,
  removeDuplicateRows: true,
  removeBlankColumns: false,
  convertNumericText: false,
};

export interface CleaningStats {
  originalRows: number;
  finalRows: number;
  originalColumns: number;
  finalColumns: number;
  blankRowsRemoved: number;
  duplicateRowsRemoved: number;
  blankColumnsRemoved: number;
  cellsTrimmed: number;
  numericValuesConverted: number;
}

export interface CleanedWorksheet extends WorksheetData {
  rowCount: number;
  columnCount: number;
  stats: CleaningStats;
  appliedOptions: CleaningOptions;
}

export function createEmptyCleaningStats(
  originalRows: number,
  originalColumns: number,
): CleaningStats {
  return {
    originalRows,
    finalRows: originalRows,
    originalColumns,
    finalColumns: originalColumns,
    blankRowsRemoved: 0,
    duplicateRowsRemoved: 0,
    blankColumnsRemoved: 0,
    cellsTrimmed: 0,
    numericValuesConverted: 0,
  };
}
