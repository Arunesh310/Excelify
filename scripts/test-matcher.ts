import assert from "node:assert/strict";

import { matchAndBringData } from "../src/lib/excel/matcher";
import { NOT_FOUND_VALUE } from "../src/lib/excel/matcher-types";

function runMainScenario() {
  const baseHeaders = ["Employee ID", "Name", "City"];
  const baseRows = [
    ["1001", "Rahul", "Delhi"],
    ["1002", "Amit", "Mumbai"],
    ["1003", "Neha", "Pune"],
    ["1004", "Ravi", "Bengaluru"],
    ["00123", "Zero Test", "Delhi"],
  ];

  const lookupHeaders = ["Employee Code", "Department", "Manager"];
  const lookupRows = [
    ["1001", "Finance", "John"],
    ["1002", "HR", "Sarah"],
    ["1003", "Operations", "David"],
    ["1005", "Sales", "Michael"],
    ["123", "IT", "Alex"],
  ];

  const result = matchAndBringData({
    baseHeaders,
    baseRows,
    lookupHeaders,
    lookupRows,
    baseKeyColumn: "Employee ID",
    lookupKeyColumn: "Employee Code",
    columnsToBring: ["Department", "Manager"],
    duplicateBehavior: "first",
  });

  assert.equal(result.stats.baseRecords, 5);
  assert.equal(result.stats.matched, 3);
  assert.equal(result.stats.notFound, 2);
  assert.equal(result.result.rows[0]?.[3], "Finance");
  assert.equal(result.result.rows[0]?.[4], "John");
  assert.equal(result.result.rows[3]?.[3], NOT_FOUND_VALUE);
  assert.equal(result.result.rows[4]?.[3], NOT_FOUND_VALUE);
  assert.equal(result.result.rows[4]?.[0], "00123");

  console.log("Main scenario passed");
}

function runDuplicateScenario() {
  const baseHeaders = ["Employee ID", "Name"];
  const baseRows = [["1001", "Rahul"], ["1002", "Amit"]];

  const lookupHeaders = ["Employee Code", "Department"];
  const lookupRows = [
    ["1001", "Finance"],
    ["1001", "HR"],
    ["1002", "Operations"],
  ];

  const first = matchAndBringData({
    baseHeaders,
    baseRows,
    lookupHeaders,
    lookupRows,
    baseKeyColumn: "Employee ID",
    lookupKeyColumn: "Employee Code",
    columnsToBring: ["Department"],
    duplicateBehavior: "first",
  });

  const last = matchAndBringData({
    baseHeaders,
    baseRows,
    lookupHeaders,
    lookupRows,
    baseKeyColumn: "Employee ID",
    lookupKeyColumn: "Employee Code",
    columnsToBring: ["Department"],
    duplicateBehavior: "last",
  });

  assert.equal(first.stats.duplicateLookupIds, 1);
  assert.equal(first.result.rows[0]?.[2], "Finance");
  assert.equal(last.result.rows[0]?.[2], "HR");

  console.log("Duplicate scenario passed");
}

function runCaseInsensitiveScenario() {
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

  assert.equal(result.stats.matched, 1);
  assert.equal(result.result.rows[0]?.[1], "Matched");

  console.log("Case-insensitive scenario passed");
}

function runColumnCollisionScenario() {
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

  assert.equal(result.result.headers[2], "Department (Lookup)");
  assert.equal(result.result.rows[0]?.[1], "Sales");
  assert.equal(result.result.rows[0]?.[2], "Finance");

  console.log("Column collision scenario passed");
}

runMainScenario();
runDuplicateScenario();
runCaseInsensitiveScenario();
runColumnCollisionScenario();

console.log("All matcher tests passed.");
