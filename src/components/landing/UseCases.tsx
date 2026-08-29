const USE_CASES = [
  {
    title: "Operations",
    description: "Clean shipment, hub and operational data.",
  },
  {
    title: "Finance",
    description: "Reconcile reports and identify missing records.",
  },
  {
    title: "HR",
    description: "Clean employee lists and compare datasets.",
  },
  {
    title: "Supply Chain",
    description: "Compare manifests, inventories and operational reports.",
  },
  {
    title: "MIS & Analysts",
    description: "Reduce repetitive Excel work.",
  },
  {
    title: "Small Businesses",
    description: "Process everyday spreadsheets faster.",
  },
] as const;

export function UseCases() {
  return (
    <section id="use-cases" className="bg-[var(--color-surface-muted)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            Built for people who live in spreadsheets.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.title}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text)]">{useCase.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{useCase.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
