export type SupportedFileType = "xlsx" | "xls" | "csv";

export interface ParsedSheet {
  name: string;
  headers: string[];
  rows: string[][];
  rowCount: number;
  columnCount: number;
}

export interface WorkbookMetadata {
  fileName: string;
  fileSize: number;
  fileType: SupportedFileType;
  sheetCount: number;
  sheets: ParsedSheet[];
}

export type ParseErrorCode =
  | "unsupported_type"
  | "empty_file"
  | "corrupted_file"
  | "no_sheets"
  | "no_usable_data"
  | "file_too_large"
  | "row_limit_exceeded";

export class ParseWorkbookError extends Error {
  readonly code: ParseErrorCode;

  constructor(code: ParseErrorCode, message: string) {
    super(message);
    this.name = "ParseWorkbookError";
    this.code = code;
  }
}

export const PARSE_ERROR_MESSAGES: Record<ParseErrorCode, string> = {
  unsupported_type:
    "This file type is not supported. Please upload a .xlsx, .xls, or .csv file.",
  empty_file: "This file appears to be empty. Please choose a file with data.",
  corrupted_file:
    "We couldn't read this file. Please check that it is a valid Excel or CSV file.",
  no_sheets: "This workbook does not contain any sheets.",
  no_usable_data: "The selected sheet does not contain any usable data.",
  file_too_large:
    "This file is too large to process in your browser. Try a smaller export or remove unused columns.",
  row_limit_exceeded:
    "This sheet has too many rows to process safely in your browser. Split the file or filter rows first.",
};
