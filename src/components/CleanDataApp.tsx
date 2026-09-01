"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ToolNextSteps } from "@/components/app/ToolNextSteps";
import { CleaningOptionsPanel, CleaningSummary } from "@/components/CleaningPanel";
import { FileUploader } from "@/components/FileUploader";
import { SheetPreviewTable, SheetSelector } from "@/components/WorkbookPreview";
import { loadCleanSample } from "@/lib/app/samples";
import { loadCleanOptions, saveCleanOptions } from "@/lib/app/preferences";
import { trackToolEvent } from "@/lib/app/analytics";
import { cleanWorksheet } from "@/lib/excel/cleaner";
import {
  DEFAULT_CLEANING_OPTIONS,
  type CleanedWorksheet,
  type CleaningOptions,
} from "@/lib/excel/cleaner-types";
import { CLEANED_EXPORT_FILENAME, exportWorksheetToXlsx } from "@/lib/excel/export";
import { parseWorkbookFile } from "@/lib/excel/parser";
import {
  PARSE_ERROR_MESSAGES,
  ParseWorkbookError,
  type WorkbookMetadata,
} from "@/lib/excel/types";

function CleanFileInfo({
  fileName,
  rowCount,
  columnCount,
}: {
  fileName: string;
  rowCount: number;
  columnCount: number;
}) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">File name</p>
        <p className="mt-1 text-sm font-semibold text-slate-900 break-all">{fileName}</p>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Rows</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{rowCount.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Columns</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{columnCount.toLocaleString()}</p>
      </div>
    </div>
  );
}

export function CleanDataApp() {
  const [metadata, setMetadata] = useState<WorkbookMetadata | null>(null);
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const [options, setOptions] = useState<CleaningOptions>(DEFAULT_CLEANING_OPTIONS);
  const [cleanedResult, setCleanedResult] = useState<CleanedWorksheet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setOptions(loadCleanOptions(DEFAULT_CLEANING_OPTIONS));
  }, []);

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
    setCleanedResult(null);

    try {
      const parsed = await parseWorkbookFile(file);
      setMetadata(parsed);
      setSelectedSheetName(parsed.sheets[0]?.name ?? "");
    } catch (error) {
      if (error instanceof ParseWorkbookError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(PARSE_ERROR_MESSAGES.corrupted_file);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSheetChange = useCallback((sheetName: string) => {
    setSelectedSheetName(sheetName);
    setCleanedResult(null);
  }, []);

  const handleClean = useCallback(async () => {
    if (!selectedSheet) {
      return;
    }

    setIsProcessing(true);
    setCleanedResult(null);
    setErrorMessage(null);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 0);
    });

    try {
      const result = cleanWorksheet(selectedSheet, options);
      setCleanedResult(result);
      trackToolEvent("clean_completed");
    } catch {
      setErrorMessage("Something went wrong while cleaning your spreadsheet. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [options, selectedSheet]);

  const handleDownload = useCallback(() => {
    if (!cleanedResult) {
      return;
    }

    exportWorksheetToXlsx(
      { headers: cleanedResult.headers, rows: cleanedResult.rows },
      CLEANED_EXPORT_FILENAME,
    );
    trackToolEvent("clean_download");
  }, [cleanedResult]);

  const previewSheet = cleanedResult
    ? {
        headers: cleanedResult.headers,
        rows: cleanedResult.rows.map((row) => row.map(String)),
      }
    : null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Step 1 — Upload
        </h2>
        <FileUploader onFileSelected={handleFileSelected} disabled={isLoading || isProcessing} />
        <button
          type="button"
          className="self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading || isProcessing}
          onClick={() => {
            trackToolEvent("sample_loaded", { tool: "clean" });
            try {
              const parsed = loadCleanSample();
              setErrorMessage(null);
              setCleanedResult(null);
              setMetadata(parsed);
              setSelectedSheetName(parsed.sheets[0]?.name ?? "");
            } catch {
              setErrorMessage(PARSE_ERROR_MESSAGES.corrupted_file);
            }
          }}
        >
          Try with sample file
        </button>
      </section>

      <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your file is processed locally in your browser. It is not uploaded to Excelify servers.
      </p>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Reading and parsing your file...
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          Cleaning your spreadsheet...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {metadata && selectedSheet && !isLoading && (
        <>
          <CleanFileInfo
            fileName={metadata.fileName}
            rowCount={selectedSheet.rowCount}
            columnCount={selectedSheet.columnCount}
          />

          <SheetSelector
            sheets={metadata.sheets}
            selectedSheetName={selectedSheet.name}
            onSelect={handleSheetChange}
          />

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Step 2 — Choose Cleaning Operations
            </h2>
            <CleaningOptionsPanel
              options={options}
              onChange={(nextOptions) => {
                setOptions(nextOptions);
                saveCleanOptions(nextOptions);
                setCleanedResult(null);
              }}
              onClean={handleClean}
              disabled={isLoading}
              isProcessing={isProcessing}
              canClean={Boolean(selectedSheet)}
            />
          </section>
        </>
      )}

      {cleanedResult && !isProcessing && (
        <>
          <CleaningSummary
            stats={cleanedResult.stats}
            appliedOptions={cleanedResult.appliedOptions}
          />

          {previewSheet && (
            <div className="flex flex-col gap-4">
              <SheetPreviewTable sheet={previewSheet} title="Cleaned Preview" />
              <div>
                <button
                  type="button"
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  onClick={handleDownload}
                >
                  Download Cleaned Excel
                </button>
              </div>
            </div>
          )}

          <ToolNextSteps tool="clean" />
        </>
      )}
    </div>
  );
}
