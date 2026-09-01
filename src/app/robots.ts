import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/app/account", "/auth/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
