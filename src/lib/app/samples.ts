import { parseCsvText } from "@/lib/excel/parser";
import type { WorkbookMetadata } from "@/lib/excel/types";

export const CLEAN_SAMPLE_CSV = `Customer ID,Name,City
C001,  Rahul  ,Delhi
C001,Rahul,Delhi
C002,Priya,Mumbai

C003,  Amit  ,Pune
C002,Priya,Mumbai
`;

export const COMPARE_SAMPLE_A_CSV = `ID,Name
A1,North Hub
A2,South Hub
A3,East Hub
`;

export const COMPARE_SAMPLE_B_CSV = `ID,Name
A1,North Hub
A2,South Hub
A4,West Hub
`;

export const MATCH_BASE_CSV = `Order ID,Quantity
O100,12
O101,4
O102,9
`;

export const MATCH_LOOKUP_CSV = `Order ID,Status,City
O100,Shipped,Delhi
O101,Pending,Mumbai
O200,Cancelled,Pune
`;

export const AGEING_SAMPLE_CSV = `Invoice ID,Invoice Date,Amount
INV-01,2026-08-01,12000
INV-02,2026-07-15,8400
INV-03,2026-05-20,21000
`;

export function loadCleanSample(): WorkbookMetadata {
  return parseCsvText(CLEAN_SAMPLE_CSV, "excelify-sample-clean.csv");
}

export function loadCompareSampleA(): WorkbookMetadata {
  return parseCsvText(COMPARE_SAMPLE_A_CSV, "excelify-sample-compare-a.csv");
}

export function loadCompareSampleB(): WorkbookMetadata {
  return parseCsvText(COMPARE_SAMPLE_B_CSV, "excelify-sample-compare-b.csv");
}

export function loadMatchBaseSample(): WorkbookMetadata {
  return parseCsvText(MATCH_BASE_CSV, "excelify-sample-match-base.csv");
}

export function loadMatchLookupSample(): WorkbookMetadata {
  return parseCsvText(MATCH_LOOKUP_CSV, "excelify-sample-match-lookup.csv");
}

export function loadAgeingSample(): WorkbookMetadata {
  return parseCsvText(AGEING_SAMPLE_CSV, "excelify-sample-ageing.csv");
}
