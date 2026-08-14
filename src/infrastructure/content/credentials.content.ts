import type {
  Award,
  CompetitiveRecord,
  Education,
} from "@/domain/entities/credential";

export const EDUCATION: readonly Education[] = [
  {
    id: "aust-cse",
    degree: "B.Sc.",
    field: "Computer Science and Engineering",
    institution: "Ahsanullah University of Science and Technology",
    period: "2017 — 2022",
    result: "CGPA 3.32 / 4.00",
  },
] as const;

export const AWARDS: readonly Award[] = [
  {
    id: "outstanding-support-2025",
    kind: "award",
    title: "Outstanding Support Award",
    issuer: "Robi Axiata",
    period: "Q1 2025",
    description:
      "For delivering the new UI/UX revamp of the Binge native mobile app and the Binge native TV app.",
  },
  {
    id: "outstanding-delivery-2024",
    kind: "award",
    title: "Outstanding Delivery Award",
    issuer: "Robi Axiata",
    period: "Q2 2024",
    description:
      "For contributing to the full UI/UX revamp of the Binge native Android app.",
  },
] as const;

export const COMPETITIVE_RECORD: CompetitiveRecord = {
  solvedCount: 503,
  summary:
    "Solved 503+ problems and competed in multiple online programming contests across renowned judges.",
  judges: [
    { name: "LeetCode", url: "https://leetcode.com/u/jishanc46" },
    { name: "CodeChef", url: "https://www.codechef.com/users/jishanc46" },
    { name: "HackerRank", url: "https://www.hackerrank.com/profile/jishanc46" },
    {
      name: "GeeksForGeeks",
      url: "https://www.geeksforgeeks.org/profile/jishanc46",
    },
    { name: "Toph", url: "https://toph.co/u/HasnathJami" },
  ],
};
