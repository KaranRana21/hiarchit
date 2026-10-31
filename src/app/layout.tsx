import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Karan Rana — Creative Developer", template: "%s | Karan Rana" },
  description: "Karan Rana builds expressive digital experiences, frontend systems, WordPress solutions and reliable web infrastructure. Explore work and get in touch.",
  openGraph: { title: "Karan Rana — Creative Developer", description: "Original design, deliberate motion, production engineering.", type: "website" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f4f0" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
