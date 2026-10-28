import { describe, expect, it } from "vitest";

import { matchAndBringData } from "./matcher";
import { NOT_FOUND_VALUE } from "./matcher-types";

describe("matchAndBringData", () => {
  it("matches main scenario", () => {
    const result = matchAndBringData({
      baseHeaders: ["Employee ID", "Name", "City"],
      baseRows: [
        ["1001", "Rahul", "Delhi"],
        ["1002", "Amit", "Mumbai"],
        ["1003", "Neha", "Pune"],
        ["1004", "Ravi", "Bengaluru"],
        ["00123", "Zero Test", "Delhi"],
      ],
      lookupHeaders: ["Employee Code", "Department", "Manager"],
      lookupRows: [
        ["1001", "Finance", "John"],
        ["1002", "HR", "Sarah"],
        ["1003", "Operations", "David"],
        ["1005", "Sales", "Michael"],
        ["123", "IT", "Alex"],
      ],
      baseKeyColumn: "Employee ID",
      lookupKeyColumn: "Employee Code",
      columnsToBring: ["Department", "Manager"],
      duplicateBehavior: "first",
    });

    expect(result.stats.baseRecords).toBe(5);
    expect(result.stats.matched).toBe(3);
    expect(result.stats.notFound).toBe(2);
    expect(result.result.rows[0]?.[3]).toBe("Finance");
    expect(result.result.rows[3]?.[3]).toBe(NOT_FOUND_VALUE);
    expect(result.result.rows[4]?.[0]).toBe("00123");
  });

  it("resolves duplicate lookup rows with first vs last", () => {
    const input = {
      baseHeaders: ["Employee ID", "Name"],
      baseRows: [
        ["1001", "Rahul"],
        ["1002", "Amit"],
      ],
      lookupHeaders: ["Employee Code", "Department"],
      lookupRows: [
        ["1001", "Finance"],
        ["1001", "HR"],
        ["1002", "Operations"],
      ],
      baseKeyColumn: "Employee ID",
      lookupKeyColumn: "Employee Code",
      columnsToBring: ["Department"],
    } as const;

    const first = matchAndBringData({ ...input, duplicateBehavior: "first" });
    const last = matchAndBringData({ ...input, duplicateBehavior: "last" });

    expect(first.stats.duplicateLookupIds).toBe(1);
    expect(first.result.rows[0]?.[2]).toBe("Finance");
    expect(last.result.rows[0]?.[2]).toBe("HR");
  });

  it("matches case-insensitively", () => {
    const result = matchAndBringData({
      baseHeaders: ["Code"],
      baseRows: [["abc123"]],
      lookupHeaders: ["Code", "Value"],
      lookupRows: [["ABC123", "Matched"]],
      baseKeyColumn: "Code",
      lookupKeyColumn: "Code",
      columnsToBring: ["Value"],
      duplicateBehavior: "first",
    });

    expect(result.stats.matched).toBe(1);
    expect(result.result.rows[0]?.[1]).toBe("Matched");
  });

  it("suffixes colliding brought column names", () => {
    const result = matchAndBringData({
      baseHeaders: ["ID", "Department"],
      baseRows: [["1", "Sales"]],
      lookupHeaders: ["ID", "Department"],
      lookupRows: [["1", "Finance"]],
      baseKeyColumn: "ID",
      lookupKeyColumn: "ID",
      columnsToBring: ["Department"],
      duplicateBehavior: "first",
    });

    expect(result.result.headers[2]).toBe("Department (Lookup)");
    expect(result.result.rows[0]?.[1]).toBe("Sales");
    expect(result.result.rows[0]?.[2]).toBe("Finance");
  });
});
