export const NOT_FOUND_VALUE = "Not Found";

export type DuplicateMatchBehavior = "first" | "last";

export interface MatchTable {
  headers: string[];
  rows: string[][];
  totalRows: number;
}

export interface DuplicateLookupEntry {
  displayKey: string;
  count: number;
}

export interface MatchStats {
  baseRecords: number;
  matched: number;
  notFound: number;
  duplicateLookupIds: number;
}

export interface MatchInput {
  baseHeaders: string[];
  baseRows: string[][];
  lookupHeaders: string[];
  lookupRows: string[][];
  baseKeyColumn: string;
  lookupKeyColumn: string;
  columnsToBring: string[];
  duplicateBehavior: DuplicateMatchBehavior;
}

export interface MatchResult {
  stats: MatchStats;
  result: MatchTable;
  notFoundRows: MatchTable;
  duplicateLookupEntries: DuplicateLookupEntry[];
  duplicateBehavior: DuplicateMatchBehavior;
}

export const MATCH_ERROR_MESSAGES = {
  missingColumn: "One or more selected columns could not be found. Please choose valid columns.",
  emptySheet: "The selected sheet has no data to match.",
  noColumnsToBring: "Select at least one column to bring from the Lookup File.",
  noMatchColumns: "Select matching columns in both files before continuing.",
} as const;

export class MatchWorkbookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MatchWorkbookError";
  }
}

export const MATCH_EXPORT_FILENAMES = {
  matched: "Excelify_Matched_Data.xlsx",
  notFound: "Excelify_Not_Found.xlsx",
} as const;
