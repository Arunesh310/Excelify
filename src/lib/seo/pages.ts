import { SITE_URL } from "@/lib/seo/config";

export interface SeoBreadcrumb {
  label: string;
  href?: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  description: string;
}

export interface SeoPageDefinition {
  path: string;
  title: string;
  description: string;
  h1: string;
  appHref: string;
  ctaLabel: string;
  breadcrumbs: SeoBreadcrumb[];
  relatedLinks: RelatedLink[];
  sitemapPriority: number;
  sitemapChangeFrequency: "weekly" | "monthly";
}

export interface SeoContentSection {
  heading: string;
  paragraphs: string[];
}

export interface SeoToolPageDefinition extends SeoPageDefinition {
  intro: string;
  sections: SeoContentSection[];
}

export interface SeoSolutionPageDefinition extends SeoPageDefinition {
  intro: string;
  sections: SeoContentSection[];
}

export const TOOLS_HUB: SeoPageDefinition = {
  path: "/tools",
  title: "Free Online Excel & Spreadsheet Tools",
  description:
    "Browse free Excel and CSV tools from Excelify. Clean spreadsheet data, compare two files, and match columns between workbooks — all in your browser.",
  h1: "Free Online Excel & Spreadsheet Tools",
  appHref: "/app",
  ctaLabel: "Open Excelify Workspace",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Tools" }],
  relatedLinks: [],
  sitemapPriority: 0.9,
  sitemapChangeFrequency: "weekly",
};

export const SOLUTIONS_HUB: SeoPageDefinition = {
  path: "/solutions",
  title: "Excel & CSV Spreadsheet Solutions",
  description:
    "Practical guides for common spreadsheet tasks — compare two Excel files, match data between files, and remove duplicate rows online with Excelify.",
  h1: "Spreadsheet Solutions",
  appHref: "/app",
  ctaLabel: "Try Excelify Free",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }],
  relatedLinks: [],
  sitemapPriority: 0.85,
  sitemapChangeFrequency: "weekly",
};

export const SEO_TOOL_PAGES: SeoToolPageDefinition[] = [
  {
    path: "/tools/excel-cleaner",
    title: "Excel Cleaner — Remove Duplicates & Clean Data Online",
    description:
      "Clean Excel and CSV files online. Remove duplicate rows, blank rows, extra spaces, and other common spreadsheet issues — free and processed in your browser.",
    h1: "Excel Cleaner — Clean Spreadsheet Data Online",
    appHref: "/app/clean",
    ctaLabel: "Open Clean Data Tool",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Tools", href: "/tools" },
      { label: "Excel Cleaner" },
    ],
    relatedLinks: [
      {
        href: "/tools/excel-compare",
        label: "Compare Excel Files",
        description: "Find matching and missing records between two spreadsheets.",
      },
      {
        href: "/tools/excel-match",
        label: "Match & Bring Data",
        description: "Bring columns from one Excel file into another.",
      },
      {
        href: "/solutions/remove-duplicates-excel",
        label: "Remove Duplicates from Excel",
        description: "Step-by-step guide for cleaning duplicate rows.",
      },
    ],
    intro:
      "Messy spreadsheets slow down reporting, reconciliation, and imports. Excelify's Clean Data tool helps you fix common Excel and CSV issues in minutes — without formulas or macros.",
    sections: [
      {
        heading: "What you can clean",
        paragraphs: [
          "Remove duplicate rows, delete blank rows and empty columns, trim extra spaces, and convert text numbers into real numeric values.",
          "Upload an Excel or CSV file, choose the cleaning options you need, preview the result, and download a cleaned workbook.",
        ],
      },
      {
        heading: "Private browser-based processing",
        paragraphs: [
          "Your file stays on your device. Excelify processes spreadsheets locally in your browser, so you can clean sensitive business data without uploading it to a server.",
        ],
      },
    ],
    sitemapPriority: 0.8,
    sitemapChangeFrequency: "weekly",
  },
  {
    path: "/tools/excel-compare",
    title: "Compare Excel Files Online — Find Differences Between Spreadsheets",
    description:
      "Compare two Excel or CSV files online. Find matching records, missing rows, and differences between spreadsheets — free and browser-based.",
    h1: "Compare Excel Files Online",
    appHref: "/app/compare",
    ctaLabel: "Open Compare Files Tool",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Tools", href: "/tools" },
      { label: "Compare Excel Files" },
    ],
    relatedLinks: [
      {
        href: "/tools/excel-match",
        label: "Match & Bring Data",
        description: "Bring selected columns from a lookup file into your base file.",
      },
      {
        href: "/tools/excel-cleaner",
        label: "Excel Cleaner",
        description: "Remove duplicates and clean spreadsheet data before comparing.",
      },
      {
        href: "/solutions/compare-two-excel-files",
        label: "Compare Two Excel Files",
        description: "Guide to comparing spreadsheets and finding differences.",
      },
    ],
    intro:
      "Need to compare two Excel files and see what matches, what is missing, and what differs? Excelify's Compare Files tool makes side-by-side spreadsheet comparison straightforward.",
    sections: [
      {
        heading: "How comparison works",
        paragraphs: [
          "Upload File A and File B, choose the identifier column in each file, and run the comparison.",
          "Excelify shows matched records, rows only in File A, rows only in File B, and helpful summary counts so you can spot gaps quickly.",
        ],
      },
      {
        heading: "When to use it",
        paragraphs: [
          "Compare vendor lists, customer records, inventory exports, or any two datasets that share a common ID or reference column.",
          "Export the results to Excel when you need to share findings with your team.",
        ],
      },
    ],
    sitemapPriority: 0.8,
    sitemapChangeFrequency: "weekly",
  },
  {
    path: "/tools/excel-match",
    title: "Match Excel Files — XLOOKUP Between Two Spreadsheets Online",
    description:
      "Match two Excel files and bring selected columns from one into another. A simple browser-based way to match data between spreadsheets without complex XLOOKUP formulas.",
    h1: "Match & Bring Data Between Excel Files",
    appHref: "/app/match",
    ctaLabel: "Open Match & Bring Data Tool",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Tools", href: "/tools" },
      { label: "Match & Bring Data" },
    ],
    relatedLinks: [
      {
        href: "/tools/excel-compare",
        label: "Compare Excel Files",
        description: "Find matching and missing records between two files.",
      },
      {
        href: "/tools/excel-cleaner",
        label: "Excel Cleaner",
        description: "Clean lookup keys and base data before matching.",
      },
      {
        href: "/solutions/xlookup-between-two-files",
        label: "XLOOKUP Between Two Files",
        description: "Guide to bringing data from one Excel file to another.",
      },
    ],
    intro:
      "If you need to bring columns from one Excel file into another — similar to XLOOKUP or VLOOKUP — Excelify's Match & Bring Data tool lets you do it visually, without writing formulas.",
    sections: [
      {
        heading: "Match and bring columns",
        paragraphs: [
          "Upload a base file and a lookup file, map the matching columns, and choose which lookup columns to bring into your result.",
          "Excelify handles matched rows, not-found rows, and duplicate lookup keys so you can review the output before exporting.",
        ],
      },
      {
        heading: "A practical alternative to XLOOKUP",
        paragraphs: [
          "When formulas are hard to maintain or your team needs a repeatable workflow, Match & Bring Data gives you a clear step-by-step process that works with Excel and CSV files.",
        ],
      },
    ],
    sitemapPriority: 0.8,
    sitemapChangeFrequency: "weekly",
  },
];

export const SEO_SOLUTION_PAGES: SeoSolutionPageDefinition[] = [
  {
    path: "/solutions/compare-two-excel-files",
    title: "Compare Two Excel Files Online — Find Differences Fast",
    description:
      "Learn how to compare two Excel files online and find differences between spreadsheets. Use Excelify's free compare tool for matched and missing records.",
    h1: "Compare Two Excel Files Online",
    appHref: "/app/compare",
    ctaLabel: "Compare Files Now",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Compare Two Excel Files" },
    ],
    relatedLinks: [
      {
        href: "/tools/excel-match",
        label: "Match & Bring Data",
        description: "Bring columns from one spreadsheet into another after comparing.",
      },
      {
        href: "/tools/excel-cleaner",
        label: "Excel Cleaner",
        description: "Clean data before you compare two Excel files.",
      },
      {
        href: "/tools/excel-compare",
        label: "Compare Excel Files Tool",
        description: "Full overview of Excelify's compare functionality.",
      },
    ],
    intro:
      "Comparing two Excel files is one of the most common spreadsheet tasks — whether you are reconciling lists, checking imports, or verifying updates. Excelify helps you compare excel files online and find differences without manual side-by-side review.",
    sections: [
      {
        heading: "Why teams compare Excel files",
        paragraphs: [
          "Two exports rarely match perfectly. Names change, IDs get reformatted, and rows go missing between systems.",
          "A structured comparison shows which records exist in both files, which appear only in one file, and where your datasets diverge.",
        ],
      },
      {
        heading: "Compare excel files online with Excelify",
        paragraphs: [
          "Upload both spreadsheets, pick the column that identifies each record, and run the comparison in your browser.",
          "You get clear matched and missing counts plus exportable results — useful when you need to share findings with finance, operations, or audit teams.",
        ],
      },
    ],
    sitemapPriority: 0.75,
    sitemapChangeFrequency: "monthly",
  },
  {
    path: "/solutions/xlookup-between-two-files",
    title: "XLOOKUP Between Two Excel Files — Match Data Online",
    description:
      "Match data between two Excel files and bring columns from one spreadsheet into another. Excelify offers a simple online alternative to XLOOKUP between two files.",
    h1: "XLOOKUP Between Two Excel Files",
    appHref: "/app/match",
    ctaLabel: "Match Files Now",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "XLOOKUP Between Two Files" },
    ],
    relatedLinks: [
      {
        href: "/tools/excel-compare",
        label: "Compare Excel Files",
        description: "Check which records exist in both files before matching.",
      },
      {
        href: "/tools/excel-cleaner",
        label: "Excel Cleaner",
        description: "Fix lookup keys and trim spaces before matching data.",
      },
      {
        href: "/tools/excel-match",
        label: "Match & Bring Data Tool",
        description: "Full overview of Excelify's match functionality.",
      },
    ],
    intro:
      "XLOOKUP is powerful, but building and maintaining formulas across large files can be slow and error-prone. When you need to match data between two excel files and bring values from one into another, Excelify offers a guided workflow that works in your browser.",
    sections: [
      {
        heading: "Bring data from one Excel file to another",
        paragraphs: [
          "Start with your base file — the spreadsheet you want to enrich. Then add a lookup file containing the columns you need.",
          "Map the matching columns, choose which lookup fields to bring across, and review matched and not-found rows before exporting.",
        ],
      },
      {
        heading: "When XLOOKUP gets difficult",
        paragraphs: [
          "Different sheet layouts, inconsistent IDs, and duplicate lookup keys make formula-based matching fragile.",
          "Excelify's Match & Bring Data tool focuses on the task itself: match two spreadsheets, bring selected columns, and download the result.",
        ],
      },
    ],
    sitemapPriority: 0.75,
    sitemapChangeFrequency: "monthly",
  },
  {
    path: "/solutions/remove-duplicates-excel",
    title: "Remove Duplicates from Excel — Clean Duplicate Rows Online",
    description:
      "Remove duplicate rows from Excel and CSV files online. Clean excel data quickly with Excelify's free duplicate remover — processed locally in your browser.",
    h1: "Remove Duplicates from Excel",
    appHref: "/app/clean",
    ctaLabel: "Remove Duplicates Now",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Remove Duplicates from Excel" },
    ],
    relatedLinks: [
      {
        href: "/tools/excel-compare",
        label: "Compare Excel Files",
        description: "Compare cleaned data against another export.",
      },
      {
        href: "/tools/excel-match",
        label: "Match & Bring Data",
        description: "Enrich cleaned data from a second spreadsheet.",
      },
      {
        href: "/tools/excel-cleaner",
        label: "Excel Cleaner Tool",
        description: "Full overview of Excelify's cleaning functionality.",
      },
    ],
    intro:
      "Duplicate rows inflate counts, break pivots, and cause reconciliation errors. If you need to remove duplicates from excel or clean excel data before analysis, Excelify's Clean Data tool handles duplicate removal alongside other common fixes.",
    sections: [
      {
        heading: "Remove duplicate rows in Excel files",
        paragraphs: [
          "Upload your spreadsheet, enable duplicate row removal, and preview the cleaned output before downloading.",
          "Excelify also supports removing blank rows, trimming spaces, and other cleanup steps in the same workflow.",
        ],
      },
      {
        heading: "Clean excel data without formulas",
        paragraphs: [
          "You do not need helper columns or manual filtering. Choose the cleaning options you need, process the file locally in your browser, and export a cleaned workbook ready for reporting or import.",
        ],
      },
    ],
    sitemapPriority: 0.75,
    sitemapChangeFrequency: "monthly",
  },
];

export const TOOL_HUB_CARDS = [
  {
    href: "/tools/excel-cleaner",
    appHref: "/app/clean",
    title: "Clean Data",
    description: "Remove duplicates, blank rows and common spreadsheet data issues.",
  },
  {
    href: "/tools/excel-compare",
    appHref: "/app/compare",
    title: "Compare Files",
    description: "Compare two spreadsheets and identify matching or different records.",
  },
  {
    href: "/tools/excel-match",
    appHref: "/app/match",
    title: "Match & Bring Data",
    description: "Match two spreadsheets and bring selected columns into your base file.",
  },
] as const;

export const SOLUTION_HUB_CARDS = [
  {
    href: "/solutions/compare-two-excel-files",
    title: "Compare Two Excel Files",
    description: "Find differences between two spreadsheets online.",
  },
  {
    href: "/solutions/xlookup-between-two-files",
    title: "XLOOKUP Between Two Files",
    description: "Match data and bring columns from one file into another.",
  },
  {
    href: "/solutions/remove-duplicates-excel",
    title: "Remove Duplicates from Excel",
    description: "Remove duplicate rows and clean spreadsheet data.",
  },
] as const;

export function getPublicSitemapEntries(): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> {
  const lastModified = new Date("2026-08-29");
  const homepage = {
    url: SITE_URL,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const hubs = [TOOLS_HUB, SOLUTIONS_HUB].map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.sitemapChangeFrequency,
    priority: page.sitemapPriority,
  }));

  const tools = SEO_TOOL_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.sitemapChangeFrequency,
    priority: page.sitemapPriority,
  }));

  const solutions = SEO_SOLUTION_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.sitemapChangeFrequency,
    priority: page.sitemapPriority,
  }));

  return [homepage, ...hubs, ...tools, ...solutions];
}

export function getSeoToolPageBySlug(slug: string): SeoToolPageDefinition | undefined {
  return SEO_TOOL_PAGES.find((page) => page.path === `/tools/${slug}`);
}

export function getSeoSolutionPageBySlug(slug: string): SeoSolutionPageDefinition | undefined {
  return SEO_SOLUTION_PAGES.find((page) => page.path === `/solutions/${slug}`);
}
