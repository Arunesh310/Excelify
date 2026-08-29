import Link from "next/link";

interface ComingSoonToolProps {
  toolName: string;
  description: string;
}

export function ComingSoonTool({ toolName, description }: ComingSoonToolProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Coming Soon
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-900">{toolName}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
        <p className="mt-4 text-sm text-slate-500">
          This tool is planned for a future Excelify release.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/app"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Back to Dashboard
        </Link>
        <Link
          href="/app/clean"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Try Clean Data
        </Link>
      </div>
    </div>
  );
}
