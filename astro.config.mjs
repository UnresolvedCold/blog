import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import compress from "astro-compress";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import remarkSimplePlantumlPlugin from "@unresolvedcold/remark-simple-plantuml"
import react from "@astrojs/react";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://astrofy-template.netlify.app',
  markdown: {
    shikiConfig: {
      theme: "dracula"
    },
    remarkPlugins: [remarkSimplePlantumlPlugin]
  },
  integrations: [
    mdx(), 
    sitemap(), 
    tailwind(), 
    react(),
    compress(),
    image(
      {
        serviceEntryPoint: '@astrojs/image/sharp',
        cacheDir: "./.cache/image",
        logLevel: 'debug',
      })
    ]
});