import type { MetadataRoute } from "next";

import { SITE } from "@/shared/config/site";

// Emitted as a file at build time so it works under `output: "export"`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
