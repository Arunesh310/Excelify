export const OAUTH_REDIRECT_COOKIE = "excelify_oauth_redirect";

export function setOAuthRedirectCookie(path: string): void {
  document.cookie = `${OAUTH_REDIRECT_COOKIE}=${encodeURIComponent(path)}; path=/; max-age=600; SameSite=Lax`;
}
