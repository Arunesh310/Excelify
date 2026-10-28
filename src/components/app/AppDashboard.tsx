import Link from "next/link";

import { ToolCardLink } from "@/components/app/ToolCardLink";
import { ToolSearch } from "@/components/app/ToolSearch";
import { POPULAR_TOOLS } from "@/lib/app/tools";

export function AppDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)] md:text-3xl">
          What do you want to reconcile today?
        </h1>
        <p className="max-w-2xl text-sm text-[var(--color-text-muted)] md:text-base">
          Clean exports, compare two files, or match lookup columns — all in your browser.
        </p>
      </section>

      <ToolSearch />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Popular Tools</h2>
          <Link
            href="/app/tools"
            className="cursor-pointer text-sm font-medium text-[var(--color-primary)] transition duration-[var(--transition-fast)] hover:text-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
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

      <p className="rounded-xl border border-[var(--color-primary-muted)] bg-[var(--color-primary-light)] px-4 py-3 text-sm text-[var(--color-primary-hover)]">
        Your files are processed locally in your browser.
      </p>
    </div>
  );
}
