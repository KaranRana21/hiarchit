import type { MetadataRoute } from "next";
import { notes } from "@/lib/notes";
// Set NEXT_PUBLIC_SITE_URL to public deployment URL to produce absolute, correct sitemap entries.
export default function sitemap(): MetadataRoute.Sitemap {const base=(process.env.NEXT_PUBLIC_SITE_URL||"https://karanrana.co.in").replace(/\/$/,"");return ["", "/work", "/blog", ...notes.map(n=>`/blog/${n.slug}`)].map(path=>({url:base+path,changeFrequency:"monthly",priority:path===""?1:.5}));}
