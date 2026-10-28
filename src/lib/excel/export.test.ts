import { describe, expect, it } from "vitest";

import { csvFileNameFromXlsx, worksheetToCsv } from "./export";

describe("worksheetToCsv", () => {
  it("escapes commas and quotes", () => {
    const csv = worksheetToCsv({
      headers: ["Name", "Note"],
      rows: [['Acme, Inc.', 'He said "hello"']],
    });

    expect(csv).toBe('Name,Note\r\n"Acme, Inc.","He said ""hello"""');
  });

  it("exports numeric cells", () => {
    const csv = worksheetToCsv({
      headers: ["Amount"],
      rows: [[100], [250.5]],
    });

    expect(csv).toBe("Amount\r\n100\r\n250.5");
  });
});

describe("csvFileNameFromXlsx", () => {
  it("replaces xlsx extension", () => {
    expect(csvFileNameFromXlsx("Excelify_Matched.xlsx")).toBe("Excelify_Matched.csv");
  });
});
