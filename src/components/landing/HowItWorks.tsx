import type { ReactNode } from "react";

const STEPS = [
  {
    number: "01",
    title: "Upload",
    description: "Upload your Excel or CSV file.",
  },
  {
    number: "02",
    title: "Process",
    description: "Choose the operation you need.",
  },
  {
    number: "03",
    title: "Download",
    description: "Get your cleaned or processed spreadsheet.",
  },
] as const;

function StepIcon({ step }: { step: string }) {
  const icons: Record<string, ReactNode> = {
    "01": (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      </svg>
    ),
    "02": (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "03": (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  };

  return icons[step] ?? null;
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            Three steps. No spreadsheet gymnastics.
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="relative rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                <StepIcon step={step.number} />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                {step.number}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[var(--color-text)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
