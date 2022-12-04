import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'Shubham Blog',
  description: 'Get notification for my new blogs.',
  site: import.meta.env.SITE,
  items: import.meta.glob('./posts/**.mdx'),
  stylesheet: '/style.xsl',
});