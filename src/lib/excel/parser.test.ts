import { describe, expect, it } from "vitest";

import { MAX_ROWS_PER_SHEET } from "./limits";
import { parseCsvText } from "./parser";
import { ParseWorkbookError } from "./types";

describe("parseCsvText row limits", () => {
  it("rejects sheets above MAX_ROWS_PER_SHEET", () => {
    const rows = Array.from({ length: MAX_ROWS_PER_SHEET + 1 }, (_, index) => `${index + 1},value`);
    const csv = `ID,Value\n${rows.join("\n")}`;

    expect(() => parseCsvText(csv, "large.csv")).toThrow(ParseWorkbookError);

    try {
      parseCsvText(csv, "large.csv");
    } catch (error) {
      expect(error).toBeInstanceOf(ParseWorkbookError);
      if (error instanceof ParseWorkbookError) {
        expect(error.code).toBe("row_limit_exceeded");
      }
    }
  });
});
