"use client";

import { useCallback, useMemo, useState } from "react";

import { ToolNextSteps } from "@/components/app/ToolNextSteps";
import { FileUploader } from "@/components/FileUploader";
import { SheetPreviewTable, SheetSelector } from "@/components/WorkbookPreview";
import { trackToolEvent } from "@/lib/app/analytics";
import { loadAgeingDateColumn, loadPreferredColumn, saveAgeingDateColumn } from "@/lib/app/preferences";
import { loadAgeingSample } from "@/lib/app/samples";
import { calculateAgeing } from "@/lib/excel/ageing";
import { AGEING_EXPORT_FILENAME, type AgeingResult } from "@/lib/excel/ageing-types";
import { exportWorksheetToXlsx } from "@/lib/excel/export";
import { parseWorkbookFile } from "@/lib/excel/parser";
import {
  PARSE_ERROR_MESSAGES,
  ParseWorkbookError,
  type WorkbookMetadata,
} from "@/lib/excel/types";

export function AgeingApp() {
  const [metadata, setMetadata] = useState<WorkbookMetadata | null>(null);
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const [dateColumn, setDateColumn] = useState("");
  const [result, setResult] = useState<AgeingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedSheet = useMemo(() => {
    if (!metadata) {
      return null;
    }

    return (
      metadata.sheets.find((sheet) => sheet.name === selectedSheetName) ??
      metadata.sheets[0] ??
      null
    );
  }, [metadata, selectedSheetName]);

  const handleFileSelected = useCallback(async (file: File) => {
    setIsLoading(true);
    setErrorMessage(null);
    setMetadata(null);
    setSelectedSheetName("");
    setDateColumn("");
    setResult(null);

    try {
      const parsed = await parseWorkbookFile(file);
      setMetadata(parsed);
      setSelectedSheetName(parsed.sheets[0]?.name ?? "");
      setDateColumn(
        loadPreferredColumn(parsed.sheets[0]?.headers ?? [], loadAgeingDateColumn()),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof ParseWorkbookError
          ? error.message
          : PARSE_ERROR_MESSAGES.corrupted_file,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCalculate = useCallback(async () => {
    if (!selectedSheet || !dateColumn) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setResult(null);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 0);
    });

    try {
      const ageing = calculateAgeing(selectedSheet, dateColumn);
      setResult(ageing);
      saveAgeingDateColumn(dateColumn);
      trackToolEvent("ageing_completed");
    } catch {
      setErrorMessage("Something went wrong while calculating ageing. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [dateColumn, selectedSheet]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your file is processed locally in your browser.
      </p>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Upload</h2>
        <FileUploader onFileSelected={handleFileSelected} disabled={isLoading || isProcessing} />
        <button
          type="button"
          className="self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading || isProcessing}
            onClick={() => {
              trackToolEvent("sample_loaded", { tool: "ageing" });
              try {
                const parsed = loadAgeingSample();
                setErrorMessage(null);
                setResult(null);
                setMetadata(parsed);
                setSelectedSheetName(parsed.sheets[0]?.name ?? "");
                setDateColumn(
                  loadPreferredColumn(
                    parsed.sheets[0]?.headers ?? [],
                    loadAgeingDateColumn() ?? "Invoice Date",
                  ),
                );
              } catch {
                setErrorMessage(PARSE_ERROR_MESSAGES.corrupted_file);
              }
            }}
        >
          Try with sample file
        </button>
      </section>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Reading and parsing your file...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {metadata && selectedSheet && !isLoading && (
        <>
          <SheetSelector
            sheets={metadata.sheets}
            selectedSheetName={selectedSheet.name}
            onSelect={(name) => {
              setSelectedSheetName(name);
              setResult(null);
            }}
          />

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Date column</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ageing is calculated in days from today.
            </p>
            <select
              className="mt-4 w-full max-w-md rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 focus:ring-2"
              value={dateColumn}
              onChange={(event) => {
                setDateColumn(event.target.value);
                setResult(null);
              }}
              disabled={isProcessing}
            >
              <option value="">Select date column</option>
              {selectedSheet.headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!dateColumn || isProcessing}
              onClick={() => void handleCalculate()}
            >
              {isProcessing ? "Calculating..." : "Calculate Ageing"}
            </button>
          </section>
        </>
      )}

      {result && !isProcessing && (
        <>
          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Rows</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.stats.originalRows.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Dated rows
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.stats.datedRows.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Invalid dates
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.stats.invalidDates.toLocaleString()}
              </p>
            </div>
          </div>

          <SheetPreviewTable
            sheet={{
              headers: result.headers,
              rows: result.rows.map((row) => row.map(String)),
            }}
            title="Ageing Preview"
          />

          <div>
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              onClick={() => {
                exportWorksheetToXlsx(result, AGEING_EXPORT_FILENAME, "Ageing");
                trackToolEvent("ageing_download");
              }}
            >
              Download Excel
            </button>
          </div>

          <ToolNextSteps tool="ageing" />
        </>
      )}
    </div>
  );
}
