import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url }) => {
  const production = url.hostname === new URL(import.meta.env.SITE).hostname;
  const rules = production
    ? `Allow: /\nDisallow: /_emdash/\nAllow: /_emdash/api/media/file/\nSitemap: ${new URL("/sitemap.xml", import.meta.env.SITE).href}`
    : "Disallow: /";
  return new Response(`User-agent: *\n${rules}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
