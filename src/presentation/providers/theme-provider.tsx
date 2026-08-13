"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ComponentProps, ReactNode } from "react";

type NextThemeProviderProps = ComponentProps<typeof NextThemeProvider>;

export function ThemeProvider({
  children,
  ...props
}: NextThemeProviderProps & { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
