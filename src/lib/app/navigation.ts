export interface AppNavItem {
  href: string;
  label: string;
  description?: string;
}

export const HOME_NAV: AppNavItem = {
  href: "/app",
  label: "Home",
};

export const SIDEBAR_TOOL_ITEMS: AppNavItem[] = [
  {
    href: "/app/clean",
    label: "Clean Data",
    description: "Remove duplicates and blank rows",
  },
  {
    href: "/app/compare",
    label: "Compare Files",
    description: "Find matched and missing records",
  },
  {
    href: "/app/match",
    label: "Match & Bring",
    description: "Bring lookup columns into your base file",
  },
  {
    href: "/app/ageing",
    label: "Ageing",
    description: "Calculate days from a date column",
  },
];

export const ALL_TOOLS_NAV: AppNavItem = {
  href: "/app/tools",
  label: "All Tools",
  description: "Browse every Excelify tool",
};

/** @deprecated Use HOME_NAV */
export const DASHBOARD_NAV = HOME_NAV;

/** @deprecated Use SIDEBAR_TOOL_ITEMS */
export const TOOL_NAV_ITEMS = SIDEBAR_TOOL_ITEMS;

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/app") {
    return pathname === "/app";
  }

  if (href === "/app/tools") {
    return pathname === "/app/tools";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
