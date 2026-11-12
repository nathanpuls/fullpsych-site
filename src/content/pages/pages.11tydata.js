export default {
  layout: "page.njk",
  tags: "sitePages",
  eleventyComputed: {
    permalink: (data) => {
      if (data.published === false) return false;
      return data.slug === "home" ? "/index.html" : `/${data.slug}/index.html`;
    }
  }
};
