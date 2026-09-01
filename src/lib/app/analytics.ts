import { track } from "@vercel/analytics";

export function trackToolEvent(name: string, data?: Record<string, string>): void {
  try {
    track(name, data);
  } catch {
    // Analytics must never block the tool.
  }
}
