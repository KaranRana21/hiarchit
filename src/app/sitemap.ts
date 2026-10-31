import type { MetadataRoute } from "next";
// Set NEXT_PUBLIC_SITE_URL to production domain after domain selection.
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) return [];
  return ["", "/work", "/journal"].map(path => ({ url: site.replace(/\/$/, "") + path, lastModified: new Date() }));
}
