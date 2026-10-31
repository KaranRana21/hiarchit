import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Karan Rana — Creative Developer & Engineer", template: "%s — Karan Rana" },
  description: "Creative developer and engineer building distinctive websites, resilient systems and digital experiences. Independent studio: Kailasam.dev.",
  openGraph: { title: "Karan Rana — Creative Developer & Engineer", description: "Art meets engineering. Work made to feel different and perform better.", type: "website" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#161717" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
