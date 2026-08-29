export interface AppNavItem {
  href: string;
  label: string;
  description?: string;
  comingSoon?: boolean;
}

export const DASHBOARD_NAV: AppNavItem = {
  href: "/app",
  label: "Dashboard",
};

export const TOOL_NAV_ITEMS: AppNavItem[] = [
  {
    href: "/app/preview",
    label: "Upload & Preview",
    description: "View workbook data",
  },
  {
    href: "/app/clean",
    label: "Clean Data",
    description: "Clean messy spreadsheets",
  },
  {
    href: "/app/compare",
    label: "Compare Files",
    description: "Find matched and missing records",
  },
  {
    href: "/app/match",
    label: "Match Columns",
    description: "Map column names between files",
    comingSoon: true,
  },
  {
    href: "/app/ageing",
    label: "Ageing",
    description: "Calculate ageing from dates",
    comingSoon: true,
  },
];

export const HISTORY_NAV: AppNavItem = {
  href: "/app/history",
  label: "History",
  description: "View past work",
};

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/app") {
    return pathname === "/app";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
