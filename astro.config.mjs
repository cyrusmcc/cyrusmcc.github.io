import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://cyrusmcc.com",
  integrations: [mdx(), sitemap(), tailwind()],
  base: '/',
  build: {
    assets: '_astro',
    format: 'file'
  },
  output: 'static'
});