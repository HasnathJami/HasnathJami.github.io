import type {
  LanguageProficiency,
  SkillGroup,
  ToolingGroup,
} from "@/domain/entities/skill";

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: "mobile",
    title: "Android",
    summary: "Where I spend most of my engineering time.",
    skills: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "XML Views",
      "Android SDK",
      "Material Design",
      "Media Player",
      "SDK Development",
      "Jetpack Architecture Components",
    ],
  },
  {
    id: "cross-platform",
    title: "Cross-Platform",
    summary: "One codebase, Android and iOS.",
    skills: [
      "Flutter",
      "Dart",
      "Compose Multiplatform",
      "BLoC",
      "GetX",
      "Provider",
      "Riverpod",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    summary: "Structure that survives four years of feature work.",
    skills: [
      "Clean Architecture",
      "MVVM",
      "MVI",
      "SOLID",
      "Modularisation",
      "Dagger 2",
      "Hilt",
      "Koin",
      "Repository Pattern",
    ],
  },
  {
    id: "async-data",
    title: "Async & Data",
    summary: "Reactive pipelines and reliable persistence.",
    skills: [
      "Coroutines",
      "Kotlin Flow",
      "Reactive Programming",
      "Retrofit",
      "Room",
      "DataStore",
      "Paging 3",
      "SQL",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "APIs I build to support my own apps.",
    skills: [
      "Spring Boot",
      "Go (Fiber, Gin, Gorilla)",
      "REST API Design",
      "JPA & Hibernate",
      "Docker",
      "Supabase",
      "Firebase",
    ],
  },
  {
    id: "quality",
    title: "Quality & Delivery",
    summary: "Proving the thing works before users find out.",
    skills: [
      "JUnit",
      "Mockito",
      "Espresso",
      "Turbine",
      "MockWebServer",
      "Git & GitFlow",
      "Crashlytics",
      "Play Console Releases",
    ],
  },
] as const;

export const LANGUAGE_PROFICIENCIES: readonly LanguageProficiency[] = [
  {
    level: "intermediate",
    label: "Intermediate",
    languages: ["Java", "Kotlin", "C++"],
  },
  {
    level: "comfortable",
    label: "Comfortable",
    languages: ["Dart", "Golang", "Python"],
  },
  {
    level: "familiar",
    label: "Familiar",
    languages: ["PHP", "C#", "JavaScript", "PL/SQL"],
  },
] as const;

export const TOOLING_GROUPS: readonly ToolingGroup[] = [
  {
    title: "Databases",
    items: [
      "Room",
      "SQLite",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Firebase",
      "Supabase",
      "Oracle",
      "MS-SQL",
    ],
  },
  {
    title: "Frameworks",
    items: [
      "Native Android",
      "Jetpack Compose",
      "Compose Multiplatform",
      "Flutter",
      "Spring Boot",
      "Go",
      "Swing",
    ],
  },
  {
    title: "Tools",
    items: [
      "Android Studio",
      "IntelliJ IDEA",
      "VS Code",
      "Docker",
      "Git",
      "Google Colab",
      "Visual Studio",
    ],
  },
] as const;
