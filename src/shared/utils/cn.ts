import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conditional class names with conflicting Tailwind utilities resolved. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
