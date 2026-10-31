import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{const url=(process.env.NEXT_PUBLIC_SITE_URL||"https://karanrana.co.in").replace(/\/$/,"");return {rules:{userAgent:"*",allow:"/"},sitemap:`${url}/sitemap.xml`};}
