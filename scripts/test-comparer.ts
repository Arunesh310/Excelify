import { compareWorksheets } from "../src/lib/excel/comparer";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const fileA = {
  headers: ["ID", "Name", "Location"],
  rows: [
    ["1001", "Rahul", "Delhi"],
    ["1002", "Amit", "Mumbai"],
    ["1003", "Neha", "Pune"],
    ["1004", "Ravi", "Bengaluru"],
    ["1004", "Ravi Duplicate", "Bengaluru"],
    ["00123", "Leading Zero", "Delhi"],
  ],
};

const fileB = {
  headers: ["Employee Code", "Name", "Department"],
  rows: [
    ["1002", "Amit", "Finance"],
    ["1003", "Neha", "HR"],
    ["1005", "Priya", "Operations"],
    ["1005", "Priya Duplicate", "Operations"],
    ["123", "Wrong Leading Zero", "IT"],
  ],
};

function runTests(): void {
  const result = compareWorksheets({
    fileAHeaders: fileA.headers,
    fileARows: fileA.rows,
    fileBHeaders: fileB.headers,
    fileBRows: fileB.rows,
    columnA: "ID",
    columnB: "Employee Code",
  });

  assert(result.stats.matchedCount === 2, "Expected 2 matched identifiers");
  assert(result.stats.onlyInFileACount === 3, "Expected 3 only in File A identifiers");
  assert(result.stats.onlyInFileBCount === 2, "Expected 2 only in File B identifiers");
  assert(result.stats.duplicateIdentifiersFileA === 1, "Expected 1 duplicate ID in File A");
  assert(result.stats.duplicateIdentifiersFileB === 1, "Expected 1 duplicate ID in File B");

  const matchedIds = new Set(
    result.matched.rows.map((row) => row[0]).filter(Boolean),
  );
  assert(matchedIds.has("1002") && matchedIds.has("1003"), "Matched rows should include 1002 and 1003");

  const onlyAIds = new Set(result.onlyInFileA.rows.map((row) => row[0]));
  assert(onlyAIds.has("1001") && onlyAIds.has("1004") && onlyAIds.has("00123"), "Only A IDs incorrect");

  const onlyBIds = new Set(result.onlyInFileB.rows.map((row) => row[0]));
  assert(onlyBIds.has("1005") && onlyBIds.has("123"), "Only B IDs incorrect");

  assert(!onlyAIds.has("123"), "00123 must not match 123");
  assert(result.duplicatesFileA.totalRows === 2, "Duplicate File A should include 2 rows for 1004");
  assert(result.duplicatesFileB.totalRows === 2, "Duplicate File B should include 2 rows for 1005");

  const whitespaceResult = compareWorksheets({
    fileAHeaders: ["ID"],
    fileARows: [[" 1001 "]],
    fileBHeaders: ["ID"],
    fileBRows: [["1001"]],
    columnA: "ID",
    columnB: "ID",
  });
  assert(whitespaceResult.stats.matchedCount === 1, "Whitespace trim should match identifiers");

  const blankResult = compareWorksheets({
    fileAHeaders: ["ID"],
    fileARows: [["1001"], [""], ["   "]],
    fileBHeaders: ["ID"],
    fileBRows: [["1001"], [""]],
    columnA: "ID",
    columnB: "ID",
  });
  assert(blankResult.stats.blankIdentifiersFileA === 2, "Blank identifiers File A");
  assert(blankResult.stats.blankIdentifiersFileB === 1, "Blank identifiers File B");
  assert(blankResult.stats.matchedCount === 1, "Blank identifiers must not match");

  console.log("All comparer tests passed.");
}

runTests();
