import Link from "next/link";

import type { AppTool } from "@/lib/app/tools";

function ToolIcon({ toolId }: { toolId: string }) {
  if (toolId === "clean") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.5 4.5 4 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9l-5.5-5.5a1 1 0 0 0-1.4 0Z" />
      </svg>
    );
  }

  if (toolId === "compare") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 4h8M8 20h8M4 8v8M20 8v8M9 9h6v6H9z" />
      </svg>
    );
  }

  if (toolId === "match") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7h8M8 12h5M8 17h8M5 4v16M19 4v16" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

interface ToolCardLinkProps {
  tool: AppTool;
}

export function ToolCardLink({ tool }: ToolCardLinkProps) {
  return (
    <Link
      href={tool.href}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
          <ToolIcon toolId={tool.id} />
        </div>
        <span
          className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-600"
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">{tool.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{tool.description}</p>
    </Link>
  );
}

export { ToolIcon };
