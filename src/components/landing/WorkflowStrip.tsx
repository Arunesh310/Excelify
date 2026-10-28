import Link from "next/link";

const WORKFLOW_STEPS = [
  {
    step: "1",
    title: "Clean Data",
    description: "Remove duplicates, blank rows and extra spaces.",
    href: "/app/clean",
  },
  {
    step: "2",
    title: "Compare Files",
    description: "Find matching and missing records between two files.",
    href: "/app/compare",
  },
  {
    step: "3",
    title: "Match & Bring",
    description: "Bring selected columns from a lookup file into your base file.",
    href: "/app/match",
  },
] as const;

export function WorkflowStrip() {
  return (
    <section id="workflow" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            The reconciliation path most teams repeat
          </h2>
          <p className="mt-3 text-base text-[var(--color-text-muted)]">
            Clean the base export, compare against a reference, then bring missing fields from a
            lookup — all locally in your browser.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {WORKFLOW_STEPS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex h-full cursor-pointer flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition duration-[var(--transition-fast)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  Step {item.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--color-text)]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-[var(--color-text-muted)]">{item.description}</p>
                <span className="mt-4 text-sm font-semibold text-[var(--color-primary)]">
                  Open tool →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
