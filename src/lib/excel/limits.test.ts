import { describe, expect, it } from "vitest";

import { assertFileSizeWithinLimit, MAX_FILE_BYTES } from "./limits";
import { ParseWorkbookError } from "./types";

describe("assertFileSizeWithinLimit", () => {
  it("allows files at the limit", () => {
    expect(() => assertFileSizeWithinLimit(MAX_FILE_BYTES)).not.toThrow();
  });

  it("rejects files over the limit", () => {
    expect(() => assertFileSizeWithinLimit(MAX_FILE_BYTES + 1)).toThrow(ParseWorkbookError);

    try {
      assertFileSizeWithinLimit(MAX_FILE_BYTES + 1);
    } catch (error) {
      expect(error).toBeInstanceOf(ParseWorkbookError);
      if (error instanceof ParseWorkbookError) {
        expect(error.code).toBe("file_too_large");
      }
    }
  });
});
