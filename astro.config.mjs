import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";
import { defineConfig, sessionDrivers } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { d1, r2 } from "@emdash-cms/cloudflare";

const emdashDev = process.env.NODE_ENV === "development" || process.argv.includes("dev");

export default defineConfig({
  site: "https://creativico-portfolio.aryusniardi15.workers.dev",
  output: "server",
  ...(!emdashDev ? { adapter: cloudflare({ imageService: "cloudflare-binding" }) } : {}),
  integrations: [
    react(),
    emdash({
      database: emdashDev ? sqlite({ url: "file:./data.db" }) : d1({ binding: "DB" }),
      storage: emdashDev
        ? local({ directory: "./uploads", baseUrl: "/_emdash/api/media/file" })
        : r2({ binding: "MEDIA" }),
      images: !emdashDev,
      admin: { siteName: "Creativico Content" },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
  ...(emdashDev ? { session: { driver: sessionDrivers.fs({ base: "./.astro/sessions" }) } } : {}),
});
