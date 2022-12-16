import { defineConfig } from "astro/config";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import astroLayouts from "astro-layouts";
import { remarkReadingTime } from './src/library/remark/remark-reading-time.mjs';
import svelte from '@astrojs/svelte';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: "https://shubham.codes",
  markdown: {
    shikiConfig: {
      theme: "dracula"
    },
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true
  },
  output: 'server',
  base: "/",
  integrations: [compress({
    css: true,
    html: true,
    js: true,
    img: true,
    svg: true,
    logger: 0
  }), tailwind(), sitemap(), mdx({
    remarkPlugins: [[astroLayouts, {
      default: "@layouts/Layout.astro",
      posts: "@layouts/BlogLayout.astro"
    }]]
  }), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), svelte()]
});