/**
 * Scans `public/apps/<slug>/` and emits a typed screenshot manifest so the
 * content layer never hard-codes image dimensions by hand.
 *
 * Usage: `npm run sync:media`
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APPS_DIR = join(ROOT, "public", "apps");
const OUT_FILE = join(
  ROOT,
  "src",
  "infrastructure",
  "content",
  "generated",
  "app-media.generated.ts",
);

/** Reads intrinsic dimensions straight out of a WebP container. */
function readWebpSize(buffer) {
  const format = buffer.subarray(12, 16).toString("ascii");

  if (format === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }
  if (format === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (format === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  throw new Error(`Unsupported WebP variant: ${format}`);
}

const naturalSort = (a, b) =>
  a.localeCompare(b, "en", { numeric: true, sensitivity: "base" });

const manifest = readdirSync(APPS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => naturalSort(a.name, b.name))
  .map((entry) => {
    const slug = entry.name;
    const files = readdirSync(join(APPS_DIR, slug))
      .filter((file) => file.endsWith(".webp") && !file.includes("-icon"))
      .sort(naturalSort);

    const screenshots = files.map((file, index) => {
      const { width, height } = readWebpSize(
        readFileSync(join(APPS_DIR, slug, file)),
      );
      return {
        src: `/apps/${slug}/${file}`,
        width,
        height,
        index: index + 1,
      };
    });

    return { slug, screenshots };
  });

const body = manifest
  .map(({ slug, screenshots }) => {
    const rows = screenshots
      .map(
        (shot) =>
          `    { src: "${shot.src}", width: ${shot.width}, height: ${shot.height}, index: ${shot.index} },`,
      )
      .join("\n");
    return `  "${slug}": [\n${rows}\n  ],`;
  })
  .join("\n");

const source = `// GENERATED FILE — do not edit by hand.
// Run \`npm run sync:media\` after adding or replacing Play Store screenshots.

export interface RawScreenshot {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly index: number;
}

export const APP_SCREENSHOTS: Readonly<Record<string, readonly RawScreenshot[]>> = {
${body}
};
`;

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, source, "utf8");

const total = manifest.reduce((sum, app) => sum + app.screenshots.length, 0);
console.log(
  `sync:media — ${total} screenshots across ${manifest.length} apps → ${OUT_FILE.replace(ROOT, ".")}`,
);
