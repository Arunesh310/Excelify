"use client";

import { useCallback, useRef, useState } from "react";

const ACCEPTED_EXTENSIONS = [".xlsx", ".xls", ".csv"];

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileSelected, disabled = false }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || disabled) {
        return;
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
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-200 bg-white hover:border-emerald-300"
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

      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
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

      <p className="text-lg font-medium text-slate-900">
        Drop your Excel or CSV file here
      </p>
      <p className="mt-2 text-sm text-slate-500">or click to browse from your computer</p>

      <button
        type="button"
        className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          inputRef.current?.click();
        }}
      >
        Browse Files
      </button>

      <p className="mt-5 text-xs uppercase tracking-wide text-slate-400">
        Supported formats: .xlsx .xls .csv
      </p>
    </div>
  );
}
