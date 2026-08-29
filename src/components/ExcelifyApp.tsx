"use client";

import { useCallback, useMemo, useState } from "react";

import { FileUploader } from "@/components/FileUploader";
import {
  FileInfoPanel,
  SheetPreviewTable,
  SheetSelector,
} from "@/components/WorkbookPreview";
import { parseWorkbookFile } from "@/lib/excel/parser";
import {
  PARSE_ERROR_MESSAGES,
  ParseWorkbookError,
  type WorkbookMetadata,
} from "@/lib/excel/types";

export function ExcelifyApp() {
  const [metadata, setMetadata] = useState<WorkbookMetadata | null>(null);
  const [selectedSheetName, setSelectedSheetName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <FileUploader onFileSelected={handleFileSelected} disabled={isLoading} />

      <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your file is processed locally in your browser. It is not uploaded to Excelify
        servers.
      </p>

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
          <FileInfoPanel metadata={metadata} selectedSheet={selectedSheet} />
          <SheetSelector
            sheets={metadata.sheets}
            selectedSheetName={selectedSheet.name}
            onSelect={setSelectedSheetName}
          />
          <SheetPreviewTable sheet={selectedSheet} />
        </>
      )}
    </div>
  );
}
