import Link from "next/link";

import { ToolCardLink } from "@/components/app/ToolCardLink";
import { ToolSearch } from "@/components/app/ToolSearch";
import { POPULAR_TOOLS } from "@/lib/app/tools";

export function AppDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          What do you want to do with your spreadsheet?
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Clean, compare and work with Excel and CSV files without complicated formulas.
        </p>
      </section>

      <ToolSearch />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">Popular Tools</h2>
          <Link
            href="/app/tools"
            className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            View All Tools →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {POPULAR_TOOLS.map((tool) => (
            <ToolCardLink key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your files are processed locally in your browser.
      </p>
    </div>
  );
}
