import type { ParsedSheet } from "@/lib/excel/types";

import type { AgeingResult } from "@/lib/excel/ageing-types";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDateCell(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const parsed = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const dmy = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmy) {
    const parsed = new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const serial = Number(trimmed);
    if (serial > 20000 && serial < 80000) {
      const excelEpoch = new Date(Date.UTC(1899, 11, 30));
      const parsed = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
  }

  const fallback = new Date(trimmed);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

export function calculateAgeing(
  sheet: ParsedSheet,
  dateColumn: string,
  asOfDate: Date = new Date(),
): AgeingResult {
  const dateIndex = sheet.headers.findIndex((header) => header === dateColumn);

  if (dateIndex === -1) {
    throw new Error("The selected date column was not found.");
  }

  const asOf = startOfDay(asOfDate);
  const headers = [...sheet.headers, "Ageing (Days)"];
  const rows: Array<Array<string | number>> = [];
  let datedRows = 0;
  let invalidDates = 0;

  for (const row of sheet.rows) {
    const raw = row[dateIndex] ?? "";
    const parsed = parseDateCell(raw);
    const nextRow: Array<string | number> = [...row];

    if (!parsed) {
      nextRow.push("");
      if (raw.trim()) {
        invalidDates += 1;
      }
    } else {
      const days = Math.floor((asOf.getTime() - startOfDay(parsed).getTime()) / 86_400_000);
      nextRow.push(days);
      datedRows += 1;
    }

    rows.push(nextRow);
  }

  return {
    headers,
    rows,
    stats: {
      originalRows: sheet.rows.length,
      datedRows,
      invalidDates,
    },
  };
}
