import type { Profile } from "@/domain/entities/profile";

export const PROFILE: Profile = {
  name: "Hasnath Jami Chowdhury",
  shortName: "Hasnath",
  role: "Software Engineer — Android & Cross-Platform",
  headline: "I build mobile products people actually keep on their phone.",
  subheadline:
    "Android engineer at Red.Digital (a Robi Axiata company), shipping Kotlin, Jetpack Compose and Flutter apps that serve millions of users across Bangladesh.",
  bio: [
    "I'm a software engineer from Dhaka who specialises in Android. Most of my day is spent in Kotlin and Jetpack Compose — modernising large, long-lived codebases without breaking the people who depend on them.",
    "At Red.Digital I led UI/UX revamps for Binge, Bangladesh's largest OTT platform, rebuilt BDTICKETS in Flutter on a Clean Architecture + BLoC foundation, and shipped a lightweight Binge playback SDK that now lives inside My Robi and My Airtel.",
    "Outside work I ship my own products — Smart Ummah on Compose Multiplatform and Baby Shop on Flutter — and keep my fundamentals sharp with 503+ solved algorithm problems.",
  ],
  location: "Dhaka, Bangladesh",
  email: "jami.hasnath@gmail.com",
  phone: "+8801796390574",
  avatarSrc: "/profile.jpg",
  resumeSrc: "/hasnath-jami-chowdhury-resume.pdf",
  availableForWork: true,
  socials: [
    {
      kind: "github",
      label: "GitHub",
      handle: "HasnathJami",
      url: "https://github.com/HasnathJami",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      handle: "hasnath-jami-chowdhury",
      url: "https://www.linkedin.com/in/hasnath-jami-chowdhury-9a3425144/",
    },
    {
      kind: "email",
      label: "Email",
      handle: "jami.hasnath@gmail.com",
      url: "mailto:jami.hasnath@gmail.com",
    },
    {
      kind: "phone",
      label: "Phone",
      handle: "+880 1796 390574",
      url: "tel:+8801796390574",
    },
  ],
  metrics: [
    {
      id: "experience",
      value: "4+",
      label: "Years shipping",
      caption: "Android in production since 2022",
    },
    {
      id: "installs",
      value: "5M+",
      label: "Play Store installs",
      caption: "Across apps I build and maintain",
    },
    {
      id: "apps",
      value: "6",
      label: "Published apps",
      caption: "Professional and personal, all live",
    },
    {
      id: "problems",
      value: "503+",
      label: "Problems solved",
      caption: "LeetCode, CodeChef, HackerRank & more",
    },
  ],
};
