/**
 * Enable Google OAuth for Excelify via Supabase Management API.
 *
 * Prerequisites:
 * 1. Google Cloud OAuth client (Web application)
 * 2. Authorized redirect URI:
 *    https://vintehwihywdjqjtlpxi.supabase.co/auth/v1/callback
 *
 * Usage:
 *   $env:SUPABASE_ACCESS_TOKEN="your_token"
 *   $env:GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
 *   $env:GOOGLE_CLIENT_SECRET="your-client-secret"
 *   npm run setup:google
 */

const PROJECT_REF = "vintehwihywdjqjtlpxi";
const MANAGEMENT_API = "https://api.supabase.com/v1";

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

async function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!token) {
    console.error("Missing SUPABASE_ACCESS_TOKEN.");
    process.exit(1);
  }

  if (!clientId || !clientSecret) {
    console.error(
      "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET.\n\n" +
        "Create a Google Cloud OAuth client:\n" +
        "  1. https://console.cloud.google.com/apis/credentials\n" +
        "  2. Create OAuth client ID → Web application\n" +
        "  3. Authorized redirect URI:\n" +
        `     https://${PROJECT_REF}.supabase.co/auth/v1/callback\n\n` +
        "Then run:\n" +
        '  $env:GOOGLE_CLIENT_ID="..."; $env:GOOGLE_CLIENT_SECRET="..."; npm run setup:google',
    );
    process.exit(1);
  }

  await managementFetch(`/projects/${PROJECT_REF}/config/auth`, token, {
    method: "PATCH",
    body: JSON.stringify({
      external_google_enabled: true,
      external_google_client_id: clientId,
      external_google_secret: clientSecret,
    }),
  });

  console.log("Google Sign-In enabled for Excelify.");
  console.log(`Callback URL: https://${PROJECT_REF}.supabase.co/auth/v1/callback`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
