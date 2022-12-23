import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('./posts/**/*.mdx', { eager: true });
let posts = Object.values(postImportResult);
posts = posts.filter((post) => {
  return post.frontmatter.draft != true
})

export const get = () => rss({
  title: 'shubham.codes',
  description: 'subscribe and get notified',
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.pubDate
  })).sort(
    (a, b) =>
      new Date(b.pubDate).valueOf() -
      new Date(a.pubDate).valueOf()
  ),
  stylesheet: '/style.xsl',
});