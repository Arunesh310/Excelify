const ALLOWED_REDIRECT_PREFIXES = ["/app"];

export function getSafeRedirectPath(path: string | null | undefined): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/app";
  }

  const isAllowed = ALLOWED_REDIRECT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );

  return isAllowed ? path : "/app";
}
