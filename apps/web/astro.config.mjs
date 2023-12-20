import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import solidJs from "@astrojs/solid-js";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sannajammeh.com",
  integrations: [UnoCSS({
    injectReset: true,
    content: {
      pipeline: {
        include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/, "src/**/*.{js,ts}"]
      }
    }
  }), solidJs(), sitemap()],
  vite: {
    css: {
      transformer: "lightningcss"
    }
  },
  experimental: {}
});