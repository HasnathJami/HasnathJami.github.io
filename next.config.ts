import type { NextConfig } from "next";

/**
 * Static export by default: `npm run build` emits a self-contained `out/`
 * directory that any web server (nginx, Apache, Netlify, GitHub Pages, cPanel)
 * can serve. Set `NEXT_OUTPUT=server` to build for a Node.js host instead.
 */
const isStaticExport = process.env.NEXT_OUTPUT !== "server";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  images: {
    // The optimiser needs a Node.js runtime; assets are pre-sized WebP already.
    unoptimized: isStaticExport,
  },
  trailingSlash: isStaticExport,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
};

export default nextConfig;
