/**
 * Fix Supabase auth URLs for production OAuth redirects.
 *
 * Usage:
 *   $env:SUPABASE_ACCESS_TOKEN="your_token"
 *   node scripts/fix-production-auth.mjs
 */

const PROJECT_REF = "vintehwihywdjqjtlpxi";
const MANAGEMENT_API = "https://api.supabase.com/v1";

const REDIRECT_URLS = [
  "http://localhost:3000/auth/callback",
  "http://localhost:3001/auth/callback",
  "http://localhost:3002/auth/callback",
  "http://localhost:3003/auth/callback",
  "https://excelify.co.in/auth/callback",
  "https://www.excelify.co.in/auth/callback",
  "http://localhost:3000/auth/update-password",
  "http://localhost:3003/auth/update-password",
  "https://excelify.co.in/auth/update-password",
  "https://www.excelify.co.in/auth/update-password",
];

async function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;

  if (!token) {
    console.error("Missing SUPABASE_ACCESS_TOKEN.");
    process.exit(1);
  }

  const authConfig = await fetch(`${MANAGEMENT_API}/projects/${PROJECT_REF}/config/auth`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

  const existing = authConfig.URI_ALLOW_LIST
    ? authConfig.URI_ALLOW_LIST.split(",").map((url) => url.trim()).filter(Boolean)
    : [];

  const merged = [...new Set([...existing, ...REDIRECT_URLS])];

  const response = await fetch(`${MANAGEMENT_API}/projects/${PROJECT_REF}/config/auth`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      SITE_URL: "https://excelify.co.in",
      URI_ALLOW_LIST: merged.join(","),
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    process.exit(1);
  }

  console.log("Updated Supabase auth config:");
  console.log("  SITE_URL: https://excelify.co.in");
  console.log("  Redirect URLs:", merged.length, "entries");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
