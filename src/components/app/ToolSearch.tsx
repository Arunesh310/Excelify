"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { searchTools } from "@/lib/app/tools";

export function ToolSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchTools(query), [query]);
  const hasQuery = query.trim().length > 0;

  return (
    <div className="w-full">
      <label htmlFor="tool-search" className="sr-only">
        Search a tool or task
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          />
        </svg>
        <input
          id="tool-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a tool or task..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          autoComplete="off"
        />
      </div>

      {hasQuery && (
        <div
          className="mt-4 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
          role="region"
          aria-live="polite"
          aria-label="Search results"
        >
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-slate-600">No matching tools found.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {results.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.href}
                    className="block rounded-xl px-3 py-3 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <p className="text-sm font-semibold text-slate-900">{tool.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{tool.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
