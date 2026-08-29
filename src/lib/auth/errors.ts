const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "Email rate limit exceeded":
    "Too many attempts. Please wait a moment and try again.",
};

export function getAuthErrorMessage(error: { message?: string } | null): string {
  if (!error?.message) {
    return "Something went wrong. Please try again.";
  }

  return AUTH_ERROR_MESSAGES[error.message] ?? "Something went wrong. Please try again.";
}
