"use client";

import { useCallback, useRef, useState } from "react";

import { assertFileSizeWithinLimit, MAX_FILE_SIZE_LABEL } from "@/lib/excel/limits";
import { ParseWorkbookError } from "@/lib/excel/types";

const ACCEPTED_EXTENSIONS = [".xlsx", ".xls", ".csv"];

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileSelected, disabled = false }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || disabled) {
        return;
      }

      setSizeError(null);

      try {
        assertFileSizeWithinLimit(file.size, "upload");
      } catch (error) {
        if (error instanceof ParseWorkbookError) {
          setSizeError(error.message);
          return;
        }
        throw error;
      }

      onFileSelected(file);
    },
    [disabled, onFileSelected],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div
      className={`rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
        isDragging
          ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!disabled) {
          setIsDragging(true);
        }
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="hidden"
        disabled={disabled}
        onChange={handleInputChange}
      />

      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-hover)]">
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="text-lg font-medium text-[var(--color-text)]">
        Drop your Excel or CSV file here
      </p>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">or click to browse from your computer</p>

      <button
        type="button"
        className="mt-6 cursor-pointer rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition duration-[var(--transition-fast)] hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          inputRef.current?.click();
        }}
      >
        Browse Files
      </button>

      <p className="mt-5 text-xs uppercase tracking-wide text-[var(--color-text-subtle)]">
        Supported formats: .xlsx .xls .csv · Max size {MAX_FILE_SIZE_LABEL}
      </p>

      {sizeError && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {sizeError}
        </p>
      )}
    </div>
  );
}
