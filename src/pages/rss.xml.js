import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import mdxclean from '../utils/rss_conv.js';
const parser = new MarkdownIt();

export async function get(context) {
  const blog = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      content: sanitizeHtml(parser.render(mdxclean(post.body))),
      link: `/blog/${post.slug}/`,
    })),
  });
}
