const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "Incorrect email or password.",
  "Email not confirmed":
    "Please confirm your email address before signing in.",
  "User already registered": "An account with this email already exists.",
  "Password should be at least 6 characters":
    "Password must be at least 8 characters.",
  "Unable to validate email address: invalid format":
    "Please enter a valid email address.",
  "Signup requires a valid password": "Please enter a valid password.",
  "Email rate limit exceeded":
    "Too many attempts. Please wait a moment and try again.",
  "For security purposes, you can only request this once every 60 seconds":
    "Please wait a moment before requesting another reset link.",
};

export function getAuthErrorMessage(error: { message?: string } | null): string {
  if (!error?.message) {
    return "Something went wrong. Please try again.";
  }

  return AUTH_ERROR_MESSAGES[error.message] ?? "Something went wrong. Please try again.";
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongEnoughPassword(password: string): boolean {
  return password.length >= 8;
}
