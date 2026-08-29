/**
 * Ping IndexNow (Bing, Yandex, etc.) to notify search engines of URL updates.
 * Google does not use IndexNow — use Google Search Console for Google indexing.
 */
const SITE_URL = "https://excelify.co.in";
const INDEXNOW_KEY = "excelify-indexnow-2026-08-29";
const KEY_LOCATION = `${SITE_URL}/indexnow-key.txt`;

const URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/app`,
  `${SITE_URL}/app/preview`,
  `${SITE_URL}/app/clean`,
];

async function submitIndexNow() {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: "excelify.co.in",
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: URLS,
    }),
  });

  console.log(`IndexNow status: ${response.status} ${response.statusText}`);
}

submitIndexNow().catch((error) => {
  console.error("IndexNow submission failed:", error);
  process.exit(1);
});
