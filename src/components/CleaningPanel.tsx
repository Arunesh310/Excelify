"use client";

import type { CleaningOptions, CleaningStats } from "@/lib/excel/cleaner-types";
import { formatStatNumber } from "@/lib/excel/cleaner";

interface CleaningOptionsPanelProps {
  options: CleaningOptions;
  onChange: (options: CleaningOptions) => void;
  onClean: () => void;
  disabled: boolean;
  isProcessing: boolean;
  canClean: boolean;
}

const OPTION_ITEMS: {
  key: keyof CleaningOptions;
  label: string;
}[] = [
  { key: "removeBlankRows", label: "Remove blank rows" },
  { key: "trimSpaces", label: "Trim leading/trailing spaces" },
  { key: "removeDuplicateRows", label: "Remove duplicate rows" },
  { key: "removeBlankColumns", label: "Remove blank columns" },
  { key: "convertNumericText", label: "Convert numeric text to numbers" },
];

export function CleaningOptionsPanel({
  options,
  onChange,
  onClean,
  disabled,
  isProcessing,
  canClean,
}: CleaningOptionsPanelProps) {
  const hasSelectedOption = Object.values(options).some(Boolean);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Cleaning Options</h2>
      <p className="mt-1 text-sm text-slate-500">
        Select the operations to apply to the current sheet.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {OPTION_ITEMS.map((item) => (
          <label
            key={item.key}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 px-4 py-3 hover:bg-slate-50"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              checked={options[item.key]}
              disabled={disabled || isProcessing}
              onChange={(event) =>
                onChange({ ...options, [item.key]: event.target.checked })
              }
            />
            <span className="text-sm font-medium text-slate-800">{item.label}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!canClean || !hasSelectedOption || isProcessing}
        onClick={onClean}
      >
        {isProcessing ? "Cleaning..." : "Clean File"}
      </button>
    </div>
  );
}

interface CleaningSummaryProps {
  stats: CleaningStats;
  appliedOptions: CleaningOptions;
}

export function CleaningSummary({ stats, appliedOptions }: CleaningSummaryProps) {
  const metrics: { label: string; value: string; show: boolean }[] = [
    {
      label: "Original Rows",
      value: formatStatNumber(stats.originalRows),
      show: true,
    },
    {
      label: "Rows After Cleaning",
      value: formatStatNumber(stats.finalRows),
      show: true,
    },
    {
      label: "Blank Rows Removed",
      value: formatStatNumber(stats.blankRowsRemoved),
      show: appliedOptions.removeBlankRows,
    },
    {
      label: "Duplicate Rows Removed",
      value: formatStatNumber(stats.duplicateRowsRemoved),
      show: appliedOptions.removeDuplicateRows,
    },
    {
      label: "Blank Columns Removed",
      value: formatStatNumber(stats.blankColumnsRemoved),
      show: appliedOptions.removeBlankColumns,
    },
    {
      label: "Cells Trimmed",
      value: formatStatNumber(stats.cellsTrimmed),
      show: appliedOptions.trimSpaces,
    },
    {
      label: "Numeric Values Converted",
      value: formatStatNumber(stats.numericValuesConverted),
      show: appliedOptions.convertNumericText,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Cleaning Summary</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics
          .filter((metric) => metric.show)
          .map((metric) => (
            <div key={metric.label}>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {metric.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{metric.value}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
