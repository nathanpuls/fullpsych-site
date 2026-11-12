export default {
  layout: "article.njk",
  tags: "articles",
  eleventyComputed: {
    permalink: (data) => data.published === false ? false : `/articles/${data.slug}/index.html`
  }
};
