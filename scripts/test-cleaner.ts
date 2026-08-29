import {
  cleanWorksheet,
  convertSafeNumericValues,
  removeBlankColumns,
  removeBlankRows,
  removeDuplicateRows,
  trimTextValues,
} from "../src/lib/excel/cleaner";
import type { ParsedSheet } from "../src/lib/excel/types";
import {
  DEFAULT_CLEANING_OPTIONS,
  type CleaningOptions,
} from "../src/lib/excel/cleaner-types";

function makeSheet(headers: string[], rows: string[][]): ParsedSheet {
  return {
    name: "Test",
    headers,
    rows,
    rowCount: rows.length,
    columnCount: headers.length,
  };
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function runTests(): void {
  // Test 1: Remove blank rows
  {
    const sheet = makeSheet(
      ["Name", "City"],
      [
        ["Arunesh", "Delhi"],
        ["", ""],
        ["Ravi", "Mumbai"],
      ],
    );
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      removeBlankRows: true,
    });
    assert(result.rowCount === 2, "Test 1 failed: blank row not removed");
    assert(result.stats.blankRowsRemoved === 1, "Test 1 failed: blank row count");
  }

  // Test 2: Trim spaces
  {
    const sheet = makeSheet(["Name"], [[" Arunesh "]]);
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      trimSpaces: true,
    });
    assert(result.rows[0][0] === "Arunesh", "Test 2 failed: trim spaces");
    assert(result.stats.cellsTrimmed === 1, "Test 2 failed: cells trimmed count");
  }

  // Test 2b: Internal spaces preserved
  {
    const trimmed = trimTextValues({
      headers: ["City"],
      rows: [[" New Delhi "]],
    });
    assert(trimmed.data.rows[0][0] === "New Delhi", "Test 2b failed: internal spaces");
  }

  // Test 3: Remove duplicate rows
  {
    const sheet = makeSheet(
      ["ID", "Name"],
      [
        ["1", "Arunesh"],
        ["2", "Ravi"],
        ["1", "Arunesh"],
      ],
    );
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      removeDuplicateRows: true,
    });
    assert(result.rowCount === 2, "Test 3 failed: duplicate row not removed");
    assert(result.stats.duplicateRowsRemoved === 1, "Test 3 failed: duplicate count");
  }

  // Test 4: Remove blank columns
  {
    const sheet = makeSheet(
      ["Name", "Blank", "City"],
      [
        ["Arunesh", "", "Delhi"],
        ["Ravi", "", "Mumbai"],
      ],
    );
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      removeBlankColumns: true,
    });
    assert(result.columnCount === 2, "Test 4 failed: blank column not removed");
    assert(result.headers.join(",") === "Name,City", "Test 4 failed: headers");
    assert(result.stats.blankColumnsRemoved === 1, "Test 4 failed: blank column count");
  }

  // Test 5: Convert numeric text
  {
    const sheet = makeSheet(["Amount"], [["100"], ["250.50"]]);
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      convertNumericText: true,
    });
    assert(result.rows[0][0] === 100, "Test 5 failed: integer conversion");
    assert(result.rows[1][0] === 250.5, "Test 5 failed: decimal conversion");
    assert(result.stats.numericValuesConverted === 2, "Test 5 failed: conversion count");
  }

  // Test 6: Leading zeros preserved
  {
    const converted = convertSafeNumericValues({
      headers: ["ID"],
      rows: [["00123"]],
    });
    assert(converted.data.rows[0][0] === "00123", "Test 6 failed: leading zeros preserved");
    assert(converted.numericValuesConverted === 0, "Test 6 failed: no conversion");
  }

  // Test 7: Original data not mutated
  {
    const sheet = makeSheet(["Name"], [[" Arunesh "]]);
    const originalValue = sheet.rows[0][0];
    cleanWorksheet(sheet, { ...DEFAULT_CLEANING_OPTIONS, trimSpaces: true });
    assert(sheet.rows[0][0] === originalValue, "Test 7 failed: original data mutated");
  }

  // Test 8: Empty file edge case (headers only)
  {
    const sheet = makeSheet(["Name", "City"], []);
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      removeBlankColumns: true,
    });
    assert(result.rowCount === 0, "Test 8 failed: headers-only sheet");
  }

  console.log("All cleaner tests passed.");
}

runTests();
