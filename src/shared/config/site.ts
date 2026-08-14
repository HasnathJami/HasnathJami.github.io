/** Deployment-wide constants. Override the URL via `NEXT_PUBLIC_SITE_URL`. */

export const SITE = {
  name: "Hasnath Jami Chowdhury",
  title: "Hasnath Jami Chowdhury — Android & Cross-Platform Engineer",
  description:
    "Software engineer in Dhaka building Android and cross-platform apps with Kotlin, Jetpack Compose and Flutter. Shipping products used by millions at Robi Axiata.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hasnathjami.github.io",
  locale: "en_US",
  keywords: [
    "Android Developer",
    "Kotlin",
    "Jetpack Compose",
    "Flutter",
    "Compose Multiplatform",
    "Mobile Engineer",
    "Dhaka",
    "Bangladesh",
    "Hasnath Jami Chowdhury",
  ],
} as const;

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "work", label: "Work", href: "#work" },
  { id: "apps", label: "Apps", href: "#apps" },
  { id: "open-source", label: "Open Source", href: "#open-source" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;
