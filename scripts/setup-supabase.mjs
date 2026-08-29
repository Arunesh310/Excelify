/**
 * Excelify Supabase setup helper (development only).
 *
 * Usage:
 *   1. Create a personal access token: https://supabase.com/dashboard/account/tokens
 *   2. Run: SUPABASE_ACCESS_TOKEN=your_token npm run setup:supabase
 *
 * This script will:
 *   - Fetch project API keys
 *   - Write NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
 *   - Apply the profiles migration via the Supabase Management API
 *   - Configure auth redirect URLs for local dev and excelify.co.in
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const PROJECT_REF = "vintehwihywdjqjtlpxi";
const SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`;
const MANAGEMENT_API = "https://api.supabase.com/v1";

const LOCAL_REDIRECT_URLS = [
  "http://localhost:3000/auth/callback",
  "http://localhost:3000/auth/update-password",
  "http://localhost:3001/auth/callback",
  "http://localhost:3001/auth/update-password",
  "http://localhost:3002/auth/callback",
  "http://localhost:3002/auth/update-password",
  "http://localhost:3003/auth/callback",
  "http://localhost:3003/auth/update-password",
];

const PRODUCTION_REDIRECT_URLS = [
  "https://excelify.co.in/auth/callback",
  "https://excelify.co.in/auth/update-password",
  "https://www.excelify.co.in/auth/callback",
  "https://www.excelify.co.in/auth/update-password",
];

async function managementFetch(path, token, options = {}) {
  const response = await fetch(`${MANAGEMENT_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase API ${path} failed (${response.status}): ${body}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function updateEnvLocal(anonKey) {
  const envPath = join(process.cwd(), ".env.local");
  let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

  const lines = content
    .split("\n")
    .filter(
      (line) =>
        !line.startsWith("NEXT_PUBLIC_SUPABASE_URL=") &&
        !line.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY="),
    )
    .filter((line, index, array) => !(line === "" && index === array.length - 1));

  lines.push(`NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}`);
  lines.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`);

  writeFileSync(envPath, `${lines.join("\n")}\n`, "utf8");
  console.log("Updated .env.local with Supabase credentials.");
}

async function getAnonKey(token) {
  const keys = await managementFetch(`/projects/${PROJECT_REF}/api-keys`, token);

  const legacyAnon = keys?.find?.(
    (key) => key.name === "anon" || key.type === "legacy" && key.name === "anon",
  );

  if (legacyAnon?.api_key) {
    return legacyAnon.api_key;
  }

  const publishable = keys?.find?.(
    (key) => key.type === "publishable" || key.name === "default",
  );

  if (publishable?.api_key) {
    return publishable.api_key;
  }

  if (Array.isArray(keys)) {
    for (const key of keys) {
      if (typeof key.api_key === "string" && key.api_key.startsWith("eyJ")) {
        return key.api_key;
      }
    }
  }

  throw new Error("Could not find anon/publishable key in project API keys response.");
}

async function runSqlMigration(token) {
  const migrationPath = join(process.cwd(), "supabase", "migrations", "001_profiles.sql");
  const query = readFileSync(migrationPath, "utf8");

  await managementFetch(`/projects/${PROJECT_REF}/database/query`, token, {
    method: "POST",
    body: JSON.stringify({ query }),
  });

  console.log("Applied profiles migration.");
}

async function configureAuth(token) {
  const authConfig = await managementFetch(`/projects/${PROJECT_REF}/config/auth`, token);

  const existingRedirects = authConfig.URI_ALLOW_LIST
    ? authConfig.URI_ALLOW_LIST.split(",").map((url) => url.trim()).filter(Boolean)
    : [];

  const redirectUrls = [
    ...new Set([
      ...existingRedirects,
      ...LOCAL_REDIRECT_URLS,
      ...PRODUCTION_REDIRECT_URLS,
    ]),
  ];

  await managementFetch(`/projects/${PROJECT_REF}/config/auth`, token, {
    method: "PATCH",
    body: JSON.stringify({
      SITE_URL: "http://localhost:3000",
      URI_ALLOW_LIST: redirectUrls.join(","),
    }),
  });

  console.log("Configured auth redirect URLs.");
}

async function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;

  if (!token) {
    console.error(
      "Missing SUPABASE_ACCESS_TOKEN.\n" +
        "Create one at https://supabase.com/dashboard/account/tokens\n" +
        "Then run: $env:SUPABASE_ACCESS_TOKEN=\"your_token\"; npm run setup:supabase",
    );
    process.exit(1);
  }

  console.log(`Setting up Supabase project ${PROJECT_REF}...`);

  const anonKey = await getAnonKey(token);
  updateEnvLocal(anonKey);
  await runSqlMigration(token);
  await configureAuth(token);

  console.log("\nSetup complete.");
  console.log(`  URL:  ${SUPABASE_URL}`);
  console.log("  Next: restart dev server with npm run dev");
  console.log("\nOptional — enable Google OAuth in Supabase:");
  console.log(
    `  https://supabase.com/dashboard/project/${PROJECT_REF}/auth/providers`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
