export type ToolCategoryId = "upload-view" | "data-cleaning" | "compare-match";

export interface ToolCategory {
  id: ToolCategoryId;
  label: string;
}

export interface AppTool {
  id: string;
  title: string;
  description: string;
  href: string;
  categoryId: ToolCategoryId;
  keywords: string[];
  popular?: boolean;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: "upload-view", label: "Upload & View" },
  { id: "data-cleaning", label: "Data Cleaning" },
  { id: "compare-match", label: "Compare & Match" },
];

export const APP_TOOLS: AppTool[] = [
  {
    id: "preview",
    title: "Upload & Preview",
    description: "Upload an Excel or CSV file and preview sheets, rows, and columns.",
    href: "/app/preview",
    categoryId: "upload-view",
    keywords: ["upload", "preview", "excel", "csv", "sheet", "view", "open"],
  },
  {
    id: "clean",
    title: "Clean Data",
    description: "Remove duplicates, blank rows and common spreadsheet data issues.",
    href: "/app/clean",
    categoryId: "data-cleaning",
    keywords: ["clean", "duplicate", "duplicates", "blank", "trim", "spaces", "tidy"],
    popular: true,
  },
  {
    id: "compare",
    title: "Compare Files",
    description: "Compare two spreadsheets and identify matching or different records.",
    href: "/app/compare",
    categoryId: "compare-match",
    keywords: ["compare", "diff", "difference", "match", "missing", "records"],
    popular: true,
  },
  {
    id: "match",
    title: "Match & Bring Data",
    description: "Match two spreadsheets and bring selected columns into your base file.",
    href: "/app/match",
    categoryId: "compare-match",
    keywords: ["match", "bring", "xlookup", "vlookup", "lookup", "join", "merge", "index"],
    popular: true,
  },
  {
    id: "ageing",
    title: "Ageing",
    description: "Calculate ageing in days from a date column.",
    href: "/app/ageing",
    categoryId: "data-cleaning",
    keywords: ["ageing", "aging", "date", "invoice", "overdue", "days", "outstanding"],
  },
];

export const POPULAR_TOOLS = APP_TOOLS.filter((tool) => tool.popular);

export function getToolByHref(href: string): AppTool | undefined {
  return APP_TOOLS.find((tool) => tool.href === href);
}

export function getToolsByCategory(categoryId: ToolCategoryId): AppTool[] {
  return APP_TOOLS.filter((tool) => tool.categoryId === categoryId);
}

export function searchTools(query: string): AppTool[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  return APP_TOOLS.filter((tool) => {
    if (tool.title.toLowerCase().includes(normalized)) {
      return true;
    }

    if (tool.description.toLowerCase().includes(normalized)) {
      return true;
    }

    return tool.keywords.some(
      (keyword) => keyword.includes(normalized) || normalized.includes(keyword),
    );
  });
}
