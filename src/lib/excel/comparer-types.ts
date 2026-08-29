export interface CompareTable {
  headers: string[];
  rows: string[][];
  totalRows: number;
}

export interface CompareStats {
  matchedCount: number;
  onlyInFileACount: number;
  onlyInFileBCount: number;
  duplicateIdentifiersFileA: number;
  duplicateIdentifiersFileB: number;
  blankIdentifiersFileA: number;
  blankIdentifiersFileB: number;
}

export interface CompareResult {
  stats: CompareStats;
  matched: CompareTable;
  onlyInFileA: CompareTable;
  onlyInFileB: CompareTable;
  duplicatesFileA: CompareTable;
  duplicatesFileB: CompareTable;
}

export interface CompareInput {
  fileAHeaders: string[];
  fileARows: string[][];
  fileBHeaders: string[];
  fileBRows: string[][];
  columnA: string;
  columnB: string;
}

export class CompareWorkbookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CompareWorkbookError";
  }
}

export const COMPARE_ERROR_MESSAGES = {
  missingColumn:
    "The selected comparison column could not be found. Please choose a valid column.",
  emptySheet: "The selected sheet does not contain any rows to compare.",
  noColumnSelected: "Please select a comparison column for both files.",
} as const;

export type CompareResultTab =
  | "matched"
  | "onlyInFileA"
  | "onlyInFileB"
  | "duplicatesFileA"
  | "duplicatesFileB";

export const COMPARE_EXPORT_FILENAMES: Record<CompareResultTab, string> = {
  matched: "Excelify_Matched.xlsx",
  onlyInFileA: "Excelify_OnlyInFileA.xlsx",
  onlyInFileB: "Excelify_OnlyInFileB.xlsx",
  duplicatesFileA: "Excelify_DuplicatesFileA.xlsx",
  duplicatesFileB: "Excelify_DuplicatesFileB.xlsx",
};
