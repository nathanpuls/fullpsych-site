export default {
  layout: "page.njk",
  tags: "sitePages",
  eleventyComputed: {
    permalink: (data) => {
      if (data.published === false) return false;
      const pageSlug = data.slug || data.page.fileSlug;
      return pageSlug === "home" ? "/index.html" : `/${pageSlug}/index.html`;
    }
  }
};
