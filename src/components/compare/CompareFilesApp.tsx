"use client";

import { useCallback, useMemo, useState } from "react";

import { ToolNextSteps } from "@/components/app/ToolNextSteps";
import { CompareResults } from "@/components/compare/CompareResults";
import { FileUploader } from "@/components/FileUploader";
import { SheetSelector } from "@/components/WorkbookPreview";
import { trackToolEvent } from "@/lib/app/analytics";
import {
  loadCompareColumnNames,
  loadPreferredColumn,
  saveCompareColumnNames,
} from "@/lib/app/preferences";
import { loadCompareSampleA, loadCompareSampleB } from "@/lib/app/samples";
import { compareWorksheets } from "@/lib/excel/comparer";
import { CompareWorkbookError } from "@/lib/excel/comparer-types";
import { parseWorkbookFile } from "@/lib/excel/parser";
import {
  PARSE_ERROR_MESSAGES,
  ParseWorkbookError,
  type ParsedSheet,
  type WorkbookMetadata,
} from "@/lib/excel/types";

function FileInfoCard({
  label,
  fileName,
  sheet,
}: {
  label: string;
  fileName: string;
  sheet: ParsedSheet | null;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900 break-all">{fileName}</p>
      {sheet && (
        <p className="mt-2 text-xs text-slate-500">
          {sheet.rowCount.toLocaleString()} rows · {sheet.columnCount.toLocaleString()} columns
        </p>
      )}
    </div>
  );
}

function ColumnSelector({
  label,
  headers,
  value,
  onChange,
  disabled,
}: {
  label: string;
  headers: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700" htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select column</option>
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CompareFilesApp() {
  const [metadataA, setMetadataA] = useState<WorkbookMetadata | null>(null);
  const [metadataB, setMetadataB] = useState<WorkbookMetadata | null>(null);
  const [sheetNameA, setSheetNameA] = useState("");
  const [sheetNameB, setSheetNameB] = useState("");
  const [columnA, setColumnA] = useState("");
  const [columnB, setColumnB] = useState("");
  const [compareResult, setCompareResult] = useState<ReturnType<typeof compareWorksheets> | null>(
    null,
  );
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sheetA = useMemo(() => {
    if (!metadataA) return null;
    return (
      metadataA.sheets.find((sheet) => sheet.name === sheetNameA) ?? metadataA.sheets[0] ?? null
    );
  }, [metadataA, sheetNameA]);

  const sheetB = useMemo(() => {
    if (!metadataB) return null;
    return (
      metadataB.sheets.find((sheet) => sheet.name === sheetNameB) ?? metadataB.sheets[0] ?? null
    );
  }, [metadataB, sheetNameB]);

  const canCompare = Boolean(
    sheetA && sheetB && columnA && columnB && !loadingA && !loadingB && !isComparing,
  );

  const handleFileA = useCallback(async (file: File) => {
    setLoadingA(true);
    setErrorMessage(null);
    setCompareResult(null);
    setMetadataA(null);
    setSheetNameA("");
    setColumnA("");

    try {
      const parsed = await parseWorkbookFile(file);
      setMetadataA(parsed);
      setSheetNameA(parsed.sheets[0]?.name ?? "");
      const stored = loadCompareColumnNames();
      const headers = parsed.sheets[0]?.headers ?? [];
      setColumnA(loadPreferredColumn(headers, stored?.columnA ?? null));
    } catch (error) {
      setErrorMessage(
        error instanceof ParseWorkbookError
          ? error.message
          : PARSE_ERROR_MESSAGES.corrupted_file,
      );
    } finally {
      setLoadingA(false);
    }
  }, []);

  const handleFileB = useCallback(async (file: File) => {
    setLoadingB(true);
    setErrorMessage(null);
    setCompareResult(null);
    setMetadataB(null);
    setSheetNameB("");
    setColumnB("");

    try {
      const parsed = await parseWorkbookFile(file);
      setMetadataB(parsed);
      setSheetNameB(parsed.sheets[0]?.name ?? "");
      const stored = loadCompareColumnNames();
      const headers = parsed.sheets[0]?.headers ?? [];
      setColumnB(loadPreferredColumn(headers, stored?.columnB ?? null));
    } catch (error) {
      setErrorMessage(
        error instanceof ParseWorkbookError
          ? error.message
          : PARSE_ERROR_MESSAGES.corrupted_file,
      );
    } finally {
      setLoadingB(false);
    }
  }, []);

  const handleCompare = useCallback(async () => {
    if (!sheetA || !sheetB || !columnA || !columnB) {
      return;
    }

    setIsComparing(true);
    setErrorMessage(null);
    setCompareResult(null);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 0);
    });

    try {
      const result = compareWorksheets({
        fileAHeaders: sheetA.headers,
        fileARows: sheetA.rows,
        fileBHeaders: sheetB.headers,
        fileBRows: sheetB.rows,
        columnA,
        columnB,
      });
      setCompareResult(result);
      saveCompareColumnNames(columnA, columnB);
      trackToolEvent("compare_completed");
    } catch (error) {
      setErrorMessage(
        error instanceof CompareWorkbookError
          ? error.message
          : "Something went wrong while comparing your spreadsheets. Please try again.",
      );
    } finally {
      setIsComparing(false);
    }
  }, [columnA, columnB, sheetA, sheetB]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your files are processed locally in your browser.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">File A</h2>
          <FileUploader onFileSelected={handleFileA} disabled={loadingA || isComparing} />
          <button
            type="button"
            className="self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loadingA || isComparing}
            onClick={() => {
              trackToolEvent("sample_loaded", { tool: "compare" });
              try {
                const parsedA = loadCompareSampleA();
                const parsedB = loadCompareSampleB();
                const stored = loadCompareColumnNames();
                setErrorMessage(null);
                setCompareResult(null);
                setMetadataA(parsedA);
                setSheetNameA(parsedA.sheets[0]?.name ?? "");
                setColumnA(loadPreferredColumn(parsedA.sheets[0]?.headers ?? [], stored?.columnA ?? "ID"));
                setMetadataB(parsedB);
                setSheetNameB(parsedB.sheets[0]?.name ?? "");
                setColumnB(loadPreferredColumn(parsedB.sheets[0]?.headers ?? [], stored?.columnB ?? "ID"));
              } catch {
                setErrorMessage(PARSE_ERROR_MESSAGES.corrupted_file);
              }
            }}
          >
            Try with sample files
          </button>
          {loadingA && (
            <p className="text-sm text-slate-600">Reading File A...</p>
          )}
          {metadataA && sheetA && (
            <>
              <FileInfoCard label="File A" fileName={metadataA.fileName} sheet={sheetA} />
              <SheetSelector
                sheets={metadataA.sheets}
                selectedSheetName={sheetA.name}
                onSelect={setSheetNameA}
              />
            </>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">File B</h2>
          <FileUploader onFileSelected={handleFileB} disabled={loadingB || isComparing} />
          {loadingB && (
            <p className="text-sm text-slate-600">Reading File B...</p>
          )}
          {metadataB && sheetB && (
            <>
              <FileInfoCard label="File B" fileName={metadataB.fileName} sheet={sheetB} />
              <SheetSelector
                sheets={metadataB.sheets}
                selectedSheetName={sheetB.name}
                onSelect={setSheetNameB}
              />
            </>
          )}
        </section>
      </div>

      {sheetA && sheetB && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Compare using</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ColumnSelector
              label="File A column"
              headers={sheetA.headers}
              value={columnA}
              onChange={setColumnA}
              disabled={isComparing}
            />
            <ColumnSelector
              label="File B column"
              headers={sheetB.headers}
              value={columnB}
              onChange={setColumnB}
              disabled={isComparing}
            />
          </div>

          <button
            type="button"
            className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!canCompare}
            onClick={handleCompare}
          >
            {isComparing ? "Comparing..." : "Compare Files"}
          </button>
        </section>
      )}

      {isComparing && (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          Comparing spreadsheets...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {compareResult && !isComparing && (
        <>
          <CompareResults result={compareResult} />
          <ToolNextSteps tool="compare" />
        </>
      )}
    </div>
  );
}
