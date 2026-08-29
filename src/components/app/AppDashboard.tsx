import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  status: "available" | "coming-soon";
  href?: string;
}

function ToolCard({ title, description, status, href }: ToolCardProps) {
  const isAvailable = status === "available";

  const badge =
    status === "available"
      ? { text: "Available", className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" }
      : { text: "Coming Soon", className: "bg-slate-100 text-slate-600" };

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
        >
          {badge.text}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>

      {isAvailable && href ? (
        <Link
          href={href}
          className="mt-6 inline-flex w-fit items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Open Tool
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-6 inline-flex w-fit cursor-not-allowed items-center justify-center rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
        >
          Coming Soon
        </button>
      )}
    </article>
  );
}

export function AppDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Primary action
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Upload &amp; Preview</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Upload an Excel or CSV file and preview sheets, rows, and columns in your browser.
            </p>
          </div>
          <Link
            href="/app/preview"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Upload &amp; Preview
          </Link>
        </div>
      </section>

      <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your files are processed locally in your browser.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <ToolCard
          title="Clean Data"
          description="Remove duplicates, blank rows and unwanted spaces from your spreadsheet."
          status="available"
          href="/app/clean"
        />
        <ToolCard
          title="Compare Files"
          description="Compare two spreadsheets and quickly find matched and missing records."
          status="available"
          href="/app/compare"
        />
        <ToolCard
          title="Match Columns"
          description="Map differently named columns between spreadsheets."
          status="coming-soon"
        />
        <ToolCard
          title="Ageing"
          description="Calculate ageing automatically from a date column."
          status="coming-soon"
        />
      </div>
    </div>
  );
}
