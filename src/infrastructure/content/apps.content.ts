import type { AppProduct, Screenshot } from "@/domain/entities/app-product";

import { APP_SCREENSHOTS } from "./generated/app-media.generated";

/** Joins the generated media manifest to human-written alt text. */
const screenshotsFor = (slug: string, appName: string): readonly Screenshot[] =>
  (APP_SCREENSHOTS[slug] ?? []).map((shot) => ({
    src: shot.src,
    width: shot.width,
    height: shot.height,
    alt: `${appName} — Google Play screenshot ${shot.index}`,
  }));

export const APPS: readonly AppProduct[] = [
  {
    id: "binge",
    slug: "binge",
    name: "Binge",
    tagline: "Bangladesh's flagship OTT streaming platform",
    description:
      "Binge streams movies, originals, web series, drama and live TV to millions of viewers. I rebuilt its native Android and Android TV experience in Jetpack Compose, then extracted a lightweight playback SDK so the same video experience could ship inside My Robi and My Airtel.",
    origin: "professional",
    organisation: "Red.Digital Ltd. (Robi Axiata)",
    packageName: "buzz.binge.mobile",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=buzz.binge.mobile",
    iconSrc: "/apps/binge/binge-icon.webp",
    screenshots: screenshotsFor("binge", "Binge"),
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "XML Views",
      "Media Player",
      "MVVM",
      "Coroutines & Flow",
      "SDK Development",
    ],
    contributions: [
      "Led the full UI/UX revamp of the native Android app and the Android TV app.",
      "Built and shipped the embeddable Binge playback SDK used by My Robi and My Airtel.",
      "Recognised with two company awards for the revamp delivery and ongoing support.",
    ],
    metrics: { installs: "5M+" },
    accentRgb: "233 61 61",
  },
  {
    id: "bdtickets",
    slug: "bdtickets",
    name: "BDTICKETS",
    tagline: "Nationwide bus, launch and event ticketing",
    description:
      "BDTICKETS is Robi's ticketing platform for bus, launch and event bookings across Bangladesh. I rebuilt the app's UI in Flutter on a BLoC + Clean Architecture foundation — cleanly separated presentation, domain and data layers — to make the booking flow faster and far easier to extend.",
    origin: "professional",
    organisation: "Red.Digital Ltd. (Robi Axiata)",
    packageName: "com.bluetech.bdtickets.launcher",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.bluetech.bdtickets.launcher",
    iconSrc: "/apps/bdtickets/bdtickets-icon.webp",
    screenshots: screenshotsFor("bdtickets", "BDTICKETS"),
    stack: [
      "Flutter",
      "Dart",
      "BLoC",
      "Clean Architecture",
      "REST APIs",
      "Dependency Injection",
    ],
    contributions: [
      "Re-architected the app across presentation, domain and data layers.",
      "Replaced ad-hoc state handling with predictable BLoC-driven flows.",
      "Delivered a consistent design language across the entire booking journey.",
    ],
    metrics: { installs: "500K+" },
    accentRgb: "24 143 227",
  },
  {
    id: "smart-ummah",
    slug: "smart-ummah",
    name: "Smart Ummah",
    tagline: "AI-assisted Islamic companion, built on Compose Multiplatform",
    description:
      "My own product: an Islamic utility app with AI voice-powered search, precise prayer-time calculation, an interactive Qibla compass, a digital Tasbeeh counter and full access to the Quran, Duas and Asmaul Husna — all from a single Compose Multiplatform codebase.",
    origin: "personal",
    organisation: "Jaxen Labs — independent",
    packageName: "com.jaxenlabs.smartummah",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.jaxenlabs.smartummah",
    iconSrc: "/apps/smart-ummah/smart-ummah-icon.webp",
    screenshots: screenshotsFor("smart-ummah", "Smart Ummah"),
    stack: [
      "Compose Multiplatform",
      "Kotlin",
      "AI Voice Search",
      "Koin",
      "Coroutines & Flow",
      "Room",
      "Go (API)",
    ],
    contributions: [
      "Designed, built, published and maintain the entire product solo.",
      "Implemented astronomical prayer-time and Qibla calculations with device sensors.",
      "Shipped a Go + PostgreSQL backend to serve prayer and content data.",
    ],
    metrics: { rating: 4.7 },
    accentRgb: "37 160 118",
  },
  {
    id: "baby-shop",
    slug: "baby-shop",
    name: "Baby Shop",
    tagline: "Production kids-fashion commerce, end to end",
    description:
      "A production-ready e-commerce app for a kids' fashion retailer — catalogue, cart, checkout, orders and account management — built with Flutter and GetX on a Supabase backend, then released to Google Play.",
    origin: "personal",
    organisation: "Freelance — Baby Shop Ltd.",
    packageName: "com.babyshopltd.app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.babyshopltd.app",
    iconSrc: "/apps/baby-shop/baby-shop-icon.webp",
    screenshots: screenshotsFor("baby-shop", "Baby Shop"),
    stack: ["Flutter", "Dart", "GetX", "Supabase", "PostgreSQL", "REST APIs"],
    contributions: [
      "Built the complete storefront, cart and checkout experience.",
      "Modelled and deployed the Supabase schema, auth and storage.",
      "Handled the full Play Store release and post-launch iterations.",
    ],
    metrics: { installs: "1K+" },
    accentRgb: "226 108 153",
  },
  {
    id: "akash",
    slug: "akash",
    name: "Akash SFA App",
    tagline: "Field sales-force automation for Akash DTH",
    description:
      "Akash DTH's sales-force automation app, used by field agents for onboarding, order capture and territory reporting. I developed new features and UI for the native Java app and hardened it through edge-case testing and usability audits.",
    origin: "professional",
    organisation: "BizMotion Limited",
    packageName: "com.bizmotion.akash.v3",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.bizmotion.akash.v3",
    iconSrc: "/apps/akash/akash-icon.webp",
    screenshots: screenshotsFor("akash", "Akash SFA App"),
    stack: [
      "Java",
      "Native Android",
      "Material Design",
      "REST APIs",
      "SQLite",
      "Google Maps",
    ],
    contributions: [
      "Delivered new features and UI across the field-agent workflow.",
      "Collaborated with cross-functional teams on edge-case and usability testing.",
      "Improved runtime performance on low-end field devices.",
    ],
    metrics: {},
    accentRgb: "232 132 44",
  },
] as const;
