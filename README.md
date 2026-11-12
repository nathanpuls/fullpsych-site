# Full Psych

Static FullPsych website built with Eleventy, edited with Pages CMS, stored in GitHub, and deployed with Cloudflare Pages.

## Editing content

- Use Pages CMS for pages, articles, site settings, and uploads.
- **New Page** creates a Markdown file in `src/content/pages`; its `slug` becomes the URL automatically.
- **New Article** creates a Markdown file in `src/content/articles`; it appears under `/articles/` when published.
- CMS saves commit directly to GitHub. Cloudflare Pages deploys the commit.

## Local development

```sh
npm install
npm run dev
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `_site`
- Production branch: `main`
