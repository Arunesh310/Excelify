import { describe, expect, it } from "vitest";

import {
  cleanWorksheet,
  convertSafeNumericValues,
  trimTextValues,
} from "./cleaner";
import type { ParsedSheet } from "./types";
import { DEFAULT_CLEANING_OPTIONS } from "./cleaner-types";

function makeSheet(headers: string[], rows: string[][]): ParsedSheet {
  return {
    name: "Test",
    headers,
    rows,
    rowCount: rows.length,
    columnCount: headers.length,
  };
}

describe("cleanWorksheet", () => {
  it("removes blank rows", () => {
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
    expect(result.rowCount).toBe(2);
    expect(result.stats.blankRowsRemoved).toBe(1);
  });

  it("trims outer spaces and preserves internal spaces", () => {
    const sheet = makeSheet(["Name"], [[" Arunesh "]]);
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      trimSpaces: true,
    });
    expect(result.rows[0][0]).toBe("Arunesh");
    expect(result.stats.cellsTrimmed).toBe(1);

    const trimmed = trimTextValues({
      headers: ["City"],
      rows: [[" New Delhi "]],
    });
    expect(trimmed.data.rows[0][0]).toBe("New Delhi");
  });

  it("removes duplicate rows", () => {
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
    expect(result.rowCount).toBe(2);
    expect(result.stats.duplicateRowsRemoved).toBe(1);
  });

  it("converts safe numeric text and preserves leading zeros", () => {
    const sheet = makeSheet(["Amount"], [["100"], ["250.50"]]);
    const result = cleanWorksheet(sheet, {
      ...DEFAULT_CLEANING_OPTIONS,
      convertNumericText: true,
    });
    expect(result.rows[0][0]).toBe(100);
    expect(result.rows[1][0]).toBe(250.5);

    const converted = convertSafeNumericValues({
      headers: ["ID"],
      rows: [["00123"]],
    });
    expect(converted.data.rows[0][0]).toBe("00123");
    expect(converted.numericValuesConverted).toBe(0);
  });

  it("does not mutate the source sheet", () => {
    const sheet = makeSheet(["Name"], [[" Arunesh "]]);
    const originalValue = sheet.rows[0][0];
    cleanWorksheet(sheet, { ...DEFAULT_CLEANING_OPTIONS, trimSpaces: true });
    expect(sheet.rows[0][0]).toBe(originalValue);
  });
});
