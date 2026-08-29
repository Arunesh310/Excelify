"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What is Excelify?",
    answer:
      "Excelify is a productivity toolkit designed to simplify repetitive Excel and CSV tasks.",
  },
  {
    question: "Does Excelify upload my files?",
    answer:
      "For the current browser-based tools, files are processed locally in your browser.",
  },
  {
    question: "Do I need Excel formulas?",
    answer:
      "No. Excelify aims to turn common spreadsheet operations into simple workflows.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Excelify supports common Excel formats such as XLSX/XLS and CSV for supported tools.",
  },
  {
    question: "Is Excelify free?",
    answer: "The current beta is free.",
  },
  {
    question: "Can I use Excelify on large spreadsheets?",
    answer:
      "Performance depends on your browser and computer. Very large files may take longer to process.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--color-surface-muted)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-primary)]"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <span className="ml-4 shrink-0 text-[var(--color-text-subtle)]" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div className="border-t border-[var(--color-border)] px-5 py-4">
                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
