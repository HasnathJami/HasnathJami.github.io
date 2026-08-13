import type { MetadataRoute } from "next";

import { SITE } from "@/shared/config/site";

// Emitted as a file at build time so it works under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
