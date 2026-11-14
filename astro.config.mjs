import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";
import { defineConfig, sessionDrivers } from "astro/config";

const emdashDev = process.env.NODE_ENV === "development" || process.argv.includes("dev");

export default defineConfig({
  output: "static",
  integrations: [
    react(),
    {
      name: "portfolio-rendering",
      hooks: {
        "astro:route:setup": ({ route }) => {
          if (route.component.endsWith("src/pages/index.astro")) route.prerender = !emdashDev;
        },
      },
    },
    ...(emdashDev
      ? [
          emdash({
            database: sqlite({ url: "file:./data.db" }),
            storage: local({
              directory: "./uploads",
              baseUrl: "/_emdash/api/media/file",
            }),
            images: false,
            admin: { siteName: "Creativico Content" },
          }),
        ]
      : []),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
  ...(emdashDev ? { session: { driver: sessionDrivers.fs({ base: "./.astro/sessions" }) } } : {}),
});
