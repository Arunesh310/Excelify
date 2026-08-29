import { MATCH_BRING_DATA_ENABLED } from "./feature-flags";

export interface AppNavItem {
  href: string;
  label: string;
  description?: string;
  comingSoon?: boolean;
  devOnly?: boolean;
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
    label: "Match & Bring Data",
    description: "Bring lookup columns into your base file",
    comingSoon: !MATCH_BRING_DATA_ENABLED,
    devOnly: MATCH_BRING_DATA_ENABLED,
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
