export type Project = {
  number: string;
  slug: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  url: string;
  theme: string;
  initials: string;
  details: string[];
};

export const projects: Project[] = [
  {
    number: "01", slug: "kailasam", name: "Kailasam.dev", category: "Creative studio / platform", year: "2026",
    summary: "A studio identity, shaped into an experience.",
    description: "Independent digital studio built around considered design, motion and engineering.",
    url: "https://www.kailasam.dev", theme: "mountain", initials: "K.",
    details: ["Brand-led digital experience", "Next.js-driven frontend", "Animation and interaction system"]
  },
  {
    number: "02", slug: "fpvparts", name: "FPVparts", category: "Commerce / WordPress", year: "2026",
    summary: "A better starting point for India's FPV builders.",
    description: "WooCommerce storefront in development for FPV drone parts, with category-led shopping and streamlined product discovery.",
    url: "https://fpvparts.in", theme: "fpv", initials: "FPV", 
    details: ["WooCommerce architecture", "Product and category systems", "Payment, shipping and catalog workflows"]
  },
  {
    number: "03", slug: "trio-cafe", name: "Trio Café & Bakery", category: "Hospitality / Website", year: "2026",
    summary: "An inviting digital home for a neighborhood favorite.",
    description: "A concept web experience bringing menus, photography and a more expressive hospitality identity together.",
    url: "https://trio-cafe-bakery.vercel.app", theme: "trio", initials: "TRIO", 
    details: ["Responsive editorial art direction", "Hospitality-first navigation", "Motion and content presentation"]
  },
  {
    number: "04", slug: "bound-coffee", name: "Bound Coffee", category: "Hospitality / Experience", year: "2026",
    summary: "Coffee, culture, and a little more character.",
    description: "An expressive café web concept focused on visual rhythm and an immersive digital first impression.",
    url: "https://bound-coffee-beta.vercel.app", theme: "bound", initials: "BOUND", 
    details: ["Creative direction and typography", "Interaction design", "Performance-conscious responsive build"]
  },
  {
    number: "05", slug: "after-six", name: "After Six", category: "Hospitality / Experience", year: "2026",
    summary: "An atmospheric destination, beyond the ordinary.",
    description: "A hospitality website concept using bold composition and motion to create a memorable first impression.",
    url: "https://aftersix-taupe.vercel.app", theme: "after", initials: "A/S", 
    details: ["Brand-forward digital expression", "Animated narrative sections", "Mobile-first refinement"]
  }
];
