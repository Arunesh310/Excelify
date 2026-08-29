"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { MatchResults } from "@/components/match/MatchResults";
import { FileUploader } from "@/components/FileUploader";
import { SheetSelector } from "@/components/WorkbookPreview";
import {
  detectDuplicateLookupEntries,
  matchAndBringData,
} from "@/lib/excel/matcher";
import {
  MatchWorkbookError,
  type DuplicateMatchBehavior,
} from "@/lib/excel/matcher-types";
import { parseWorkbookFile } from "@/lib/excel/parser";
import {
  PARSE_ERROR_MESSAGES,
  ParseWorkbookError,
  type ParsedSheet,
  type WorkbookMetadata,
} from "@/lib/excel/types";

function FileInfoCard({
  label,
  description,
  fileName,
  sheet,
}: {
  label: string;
  description: string;
  fileName: string;
  sheet: ParsedSheet | null;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900 break-all">{fileName}</p>
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

export function MatchBringDataApp() {
  const [baseMetadata, setBaseMetadata] = useState<WorkbookMetadata | null>(null);
  const [lookupMetadata, setLookupMetadata] = useState<WorkbookMetadata | null>(null);
  const [baseSheetName, setBaseSheetName] = useState("");
  const [lookupSheetName, setLookupSheetName] = useState("");
  const [baseKeyColumn, setBaseKeyColumn] = useState("");
  const [lookupKeyColumn, setLookupKeyColumn] = useState("");
  const [columnsToBring, setColumnsToBring] = useState<string[]>([]);
  const [duplicateBehavior, setDuplicateBehavior] = useState<DuplicateMatchBehavior>("first");
  const [matchResult, setMatchResult] = useState<ReturnType<typeof matchAndBringData> | null>(
    null,
  );
  const [loadingBase, setLoadingBase] = useState(false);
  const [loadingLookup, setLoadingLookup] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const baseSheet = useMemo(() => {
    if (!baseMetadata) return null;
    return (
      baseMetadata.sheets.find((sheet) => sheet.name === baseSheetName) ??
      baseMetadata.sheets[0] ??
      null
    );
  }, [baseMetadata, baseSheetName]);

  const lookupSheet = useMemo(() => {
    if (!lookupMetadata) return null;
    return (
      lookupMetadata.sheets.find((sheet) => sheet.name === lookupSheetName) ??
      lookupMetadata.sheets[0] ??
      null
    );
  }, [lookupMetadata, lookupSheetName]);

  const lookupKeyIndex = useMemo(() => {
    if (!lookupSheet || !lookupKeyColumn) return -1;
    return lookupSheet.headers.findIndex((header) => header === lookupKeyColumn);
  }, [lookupKeyColumn, lookupSheet]);

  const bringableColumns = useMemo(() => {
    if (!lookupSheet) return [];
    return lookupSheet.headers.filter((header) => header !== lookupKeyColumn);
  }, [lookupKeyColumn, lookupSheet]);

  const duplicateLookupEntries = useMemo(() => {
    if (!lookupSheet || lookupKeyIndex === -1) return [];
    return detectDuplicateLookupEntries(lookupSheet.rows, lookupKeyIndex);
  }, [lookupKeyIndex, lookupSheet]);

  useEffect(() => {
    setColumnsToBring((current) => current.filter((column) => bringableColumns.includes(column)));
  }, [bringableColumns]);

  const canMatch = Boolean(
    baseSheet &&
      lookupSheet &&
      baseKeyColumn &&
      lookupKeyColumn &&
      columnsToBring.length > 0 &&
      !loadingBase &&
      !loadingLookup &&
      !isMatching,
  );

  const handleBaseFile = useCallback(async (file: File) => {
    setLoadingBase(true);
    setErrorMessage(null);
    setMatchResult(null);
    setBaseMetadata(null);
    setBaseSheetName("");
    setBaseKeyColumn("");

    try {
      const parsed = await parseWorkbookFile(file);
      setBaseMetadata(parsed);
      setBaseSheetName(parsed.sheets[0]?.name ?? "");
    } catch (error) {
      setErrorMessage(
        error instanceof ParseWorkbookError
          ? error.message
          : PARSE_ERROR_MESSAGES.corrupted_file,
      );
    } finally {
      setLoadingBase(false);
    }
  }, []);

  const handleLookupFile = useCallback(async (file: File) => {
    setLoadingLookup(true);
    setErrorMessage(null);
    setMatchResult(null);
    setLookupMetadata(null);
    setLookupSheetName("");
    setLookupKeyColumn("");
    setColumnsToBring([]);

    try {
      const parsed = await parseWorkbookFile(file);
      setLookupMetadata(parsed);
      setLookupSheetName(parsed.sheets[0]?.name ?? "");
    } catch (error) {
      setErrorMessage(
        error instanceof ParseWorkbookError
          ? error.message
          : PARSE_ERROR_MESSAGES.corrupted_file,
      );
    } finally {
      setLoadingLookup(false);
    }
  }, []);

  const toggleColumnToBring = useCallback((column: string) => {
    setColumnsToBring((current) =>
      current.includes(column)
        ? current.filter((item) => item !== column)
        : [...current, column],
    );
    setMatchResult(null);
  }, []);

  const selectAllColumns = useCallback(() => {
    setColumnsToBring([...bringableColumns]);
    setMatchResult(null);
  }, [bringableColumns]);

  const clearAllColumns = useCallback(() => {
    setColumnsToBring([]);
    setMatchResult(null);
  }, []);

  const handleMatch = useCallback(async () => {
    if (!baseSheet || !lookupSheet || !baseKeyColumn || !lookupKeyColumn) {
      setErrorMessage("Select matching columns in both files before continuing.");
      return;
    }

    if (columnsToBring.length === 0) {
      setErrorMessage("Select at least one column to bring from the Lookup File.");
      return;
    }

    setIsMatching(true);
    setErrorMessage(null);
    setMatchResult(null);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 0);
    });

    try {
      const result = matchAndBringData({
        baseHeaders: baseSheet.headers,
        baseRows: baseSheet.rows,
        lookupHeaders: lookupSheet.headers,
        lookupRows: lookupSheet.rows,
        baseKeyColumn,
        lookupKeyColumn,
        columnsToBring,
        duplicateBehavior,
      });
      setMatchResult(result);
    } catch (error) {
      setErrorMessage(
        error instanceof MatchWorkbookError
          ? error.message
          : "Something went wrong while matching your spreadsheets. Please try again.",
      );
    } finally {
      setIsMatching(false);
    }
  }, [
    baseKeyColumn,
    baseSheet,
    columnsToBring,
    duplicateBehavior,
    lookupKeyColumn,
    lookupSheet,
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Development build only — Match &amp; Bring Data is not available in production yet.
      </p>

      <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your files are processed locally in your browser.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Base File
          </h2>
          <FileUploader onFileSelected={handleBaseFile} disabled={loadingBase || isMatching} />
          {loadingBase && <p className="text-sm text-slate-600">Reading Base File...</p>}
          {baseMetadata && baseSheet && (
            <>
              <FileInfoCard
                label="Base File"
                description="The spreadsheet you want to add information to."
                fileName={baseMetadata.fileName}
                sheet={baseSheet}
              />
              <SheetSelector
                sheets={baseMetadata.sheets}
                selectedSheetName={baseSheet.name}
                onSelect={setBaseSheetName}
              />
            </>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Lookup File
          </h2>
          <FileUploader onFileSelected={handleLookupFile} disabled={loadingLookup || isMatching} />
          {loadingLookup && <p className="text-sm text-slate-600">Reading Lookup File...</p>}
          {lookupMetadata && lookupSheet && (
            <>
              <FileInfoCard
                label="Lookup File"
                description="The spreadsheet containing the information you want to bring in."
                fileName={lookupMetadata.fileName}
                sheet={lookupSheet}
              />
              <SheetSelector
                sheets={lookupMetadata.sheets}
                selectedSheetName={lookupSheet.name}
                onSelect={setLookupSheetName}
              />
            </>
          )}
        </section>
      </div>

      {baseSheet && lookupSheet && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Match records using</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ColumnSelector
              label="Base File"
              headers={baseSheet.headers}
              value={baseKeyColumn}
              onChange={(value) => {
                setBaseKeyColumn(value);
                setMatchResult(null);
              }}
              disabled={isMatching}
            />
            <ColumnSelector
              label="Lookup File"
              headers={lookupSheet.headers}
              value={lookupKeyColumn}
              onChange={(value) => {
                setLookupKeyColumn(value);
                setColumnsToBring([]);
                setMatchResult(null);
              }}
              disabled={isMatching}
            />
          </div>
        </section>
      )}

      {baseSheet && lookupSheet && lookupKeyColumn && bringableColumns.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Bring these columns from Lookup File
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={selectAllColumns}
                disabled={isMatching}
              >
                Select All
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={clearAllColumns}
                disabled={isMatching}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {bringableColumns.map((column) => (
              <label
                key={column}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  checked={columnsToBring.includes(column)}
                  disabled={isMatching}
                  onChange={() => toggleColumnToBring(column)}
                />
                <span>{column}</span>
              </label>
            ))}
          </div>
        </section>
      )}

      {duplicateLookupEntries.length > 0 && (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-semibold text-amber-950">Duplicate matches found</h2>
          <p className="mt-2 text-sm text-amber-900">
            Some identifiers appear more than once in the Lookup File. Choose which row to use when
            bringing data.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-amber-950">
            {duplicateLookupEntries.slice(0, 10).map((entry) => (
              <li key={entry.displayKey}>
                <span className="font-semibold">{entry.displayKey}</span> appears{" "}
                {entry.count.toLocaleString()} times in the Lookup File.
              </li>
            ))}
            {duplicateLookupEntries.length > 10 && (
              <li>And {duplicateLookupEntries.length - 10} more duplicate identifiers.</li>
            )}
          </ul>

          <fieldset className="mt-4 space-y-2">
            <legend className="text-sm font-medium text-amber-950">Duplicate behavior</legend>
            <label className="flex items-center gap-2 text-sm text-amber-950">
              <input
                type="radio"
                name="duplicate-behavior"
                value="first"
                checked={duplicateBehavior === "first"}
                onChange={() => setDuplicateBehavior("first")}
                disabled={isMatching}
              />
              Use first match (recommended)
            </label>
            <label className="flex items-center gap-2 text-sm text-amber-950">
              <input
                type="radio"
                name="duplicate-behavior"
                value="last"
                checked={duplicateBehavior === "last"}
                onChange={() => setDuplicateBehavior("last")}
                disabled={isMatching}
              />
              Use last match
            </label>
          </fieldset>
        </section>
      )}

      {baseSheet && lookupSheet && (
        <div>
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!canMatch}
            onClick={handleMatch}
          >
            {isMatching ? "Matching..." : "Match & Bring Data"}
          </button>
        </div>
      )}

      {isMatching && (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          Matching spreadsheets...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {matchResult && !isMatching && <MatchResults result={matchResult} />}
    </div>
  );
}
