import type { Experience } from "@/domain/entities/experience";

export const EXPERIENCES: readonly Experience[] = [
  {
    id: "red-digital",
    company: "Red.Digital Ltd.",
    companyNote: "A Robi Axiata company",
    companyUrl: "https://www.robi.com.bd/",
    role: "Software Engineer (Android)",
    location: "Dhaka, Bangladesh",
    period: { start: "2023-04", end: null, display: "Apr 2023 — Present" },
    summary:
      "Own Android delivery across Robi's consumer product portfolio — from the Binge streaming platform to enterprise field-force tooling — with a focus on modernising legacy codebases into modular, testable architectures.",
    achievements: [
      "Rebuilt the Binge native Android and Android TV experience in Jetpack Compose and XML, coordinating across teams through testing and a successful production release.",
      "Modernised the Robi-SFA field-force app in Kotlin and Jetpack Compose, applying Clean Architecture to deliver a modular, decoupled and testable enterprise codebase with location-aware workflows.",
      "Revamped BDTICKETS in Flutter using BLoC and Clean Architecture — split across presentation, domain and data layers — for a more scalable and consistent ticketing experience.",
      "Built a lightweight Binge SDK embedded in My Robi and My Airtel, streamlining video playback for millions of telecom subscribers.",
      "Maintain and extend major native Kotlin apps across the Binge ecosystem, shipping features, resolving critical defects and tuning runtime performance.",
    ],
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Clean Architecture",
      "Coroutines & Flow",
      "Hilt",
      "Flutter",
      "BLoC",
      "Media Player",
      "SDK Development",
    ],
    products: [
      {
        name: "Binge",
        url: "https://play.google.com/store/apps/details?id=buzz.binge.mobile",
      },
      {
        name: "BDTICKETS",
        url: "https://play.google.com/store/apps/details?id=com.bluetech.bdtickets.launcher",
      },
      {
        name: "Robi-SFA",
        url: "https://play.google.com/store/apps/details?id=com.reddotdigitalit.sfa",
      },
      { name: "My Robi" },
      { name: "My Airtel" },
    ],
  },
  {
    id: "bizmotion",
    company: "BizMotion Limited",
    role: "Junior Software Engineer (Android)",
    location: "Dhaka, Bangladesh",
    period: { start: "2022-01", end: "2023-03", display: "2022 — 2023" },
    summary:
      "Delivered features for enterprise Java Android applications serving FMCG, pharmaceutical and DTH field operations.",
    achievements: [
      "Developed new features and UI for the Akash DTH native Java Android app, working with cross-functional teams to harden it through edge-case testing and usability audits.",
      "Implemented requested features, fixed defects and improved performance across large-scale Java Android applications in the FMCG and pharma domains.",
    ],
    stack: [
      "Java",
      "Native Android",
      "MVVM",
      "REST APIs",
      "Material Design",
      "SQLite",
    ],
    products: [
      {
        name: "Akash SFA App",
        url: "https://play.google.com/store/apps/details?id=com.bizmotion.akash.v3",
      },
    ],
  },
] as const;
