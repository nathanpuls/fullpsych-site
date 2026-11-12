export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));
  });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ public: "." });
  eleventyConfig.addCollection("navigationPages", (collectionApi) =>
    collectionApi.getFilteredByTag("sitePages")
      .filter((item) => item.data.published !== false && item.data.showInNavigation !== false)
      .sort((a, b) => (a.data.navOrder || 999) - (b.data.navOrder || 999))
  );
  eleventyConfig.addCollection("publishedArticles", (collectionApi) =>
    collectionApi.getFilteredByTag("articles")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => new Date(b.data.date || 0) - new Date(a.data.date || 0))
  );
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
