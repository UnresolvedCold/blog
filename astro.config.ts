import { defineConfig } from "astro/config";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import astroLayouts from "astro-layouts";
import { remarkReadingTime } from './src/library/remark/remark-reading-time.mjs';
import react from "@astrojs/react";
import PlantUML from "@akebifiky/remark-simple-plantuml"

// https://astro.build/config
export default defineConfig({
  site: "https://shubham.codes",
  markdown: {
    shikiConfig: {
      theme: "dracula"
    },
    remarkPlugins: [remarkReadingTime, PlantUML],
    extendDefaultPlugins: true
  },
  base: "/",
  integrations: [
  tailwind(), 
  sitemap(), 
  mdx({
    remarkPlugins: [[astroLayouts, {
      default: "@layouts/Layout.astro",
      posts: "@layouts/BlogLayout.astro"
    }]]
  }), 
  image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), 
  react(),
  compress({
    css: true,
    html: true,
    js: true,
    img: true,
    svg: true,
    logger: 0
  })]
});