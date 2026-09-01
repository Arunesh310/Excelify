import Link from "next/link";

const NEXT_STEPS = {
  clean: [
    {
      href: "/app/compare",
      label: "Compare this with another file",
    },
    {
      href: "/app/match",
      label: "Match columns from a lookup file",
    },
  ],
  compare: [
    {
      href: "/app/match",
      label: "Bring missing data with Match",
    },
    {
      href: "/app/clean",
      label: "Clean a spreadsheet first",
    },
  ],
  match: [
    {
      href: "/app/compare",
      label: "Compare two files",
    },
    {
      href: "/app/clean",
      label: "Clean Data",
    },
  ],
  ageing: [
    {
      href: "/app/clean",
      label: "Clean Data",
    },
    {
      href: "/app/compare",
      label: "Compare Files",
    },
  ],
} as const;

interface ToolNextStepsProps {
  tool: keyof typeof NEXT_STEPS;
}

export function ToolNextSteps({ tool }: ToolNextStepsProps) {
  const links = NEXT_STEPS[tool];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">What next?</h2>
      <p className="mt-1 text-sm text-slate-500">Continue with another Excelify tool.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </section>
  );
}
