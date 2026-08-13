import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Profile } from "@/domain/entities/profile";
import { GitHubIcon, LinkedInIcon } from "@/presentation/components/ui/brand-icons";
import { NAV_ITEMS } from "@/shared/config/site";

const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter({ profile }: { profile: Profile }) {
  const github = profile.socials.find((social) => social.kind === "github");
  const linkedin = profile.socials.find((social) => social.kind === "linkedin");

  return (
    <footer className="border-t border-line bg-canvas-alt">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-ink">
              {profile.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {profile.role} · {profile.location}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {github ? (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:border-accent-line hover:text-accent"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
              ) : null}
              {linkedin ? (
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:border-accent-line hover:text-accent"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={profile.resumeSrc}
              download
              className="inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-accent"
            >
              Résumé <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
