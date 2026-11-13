# FullPsych

Astro + TinaCMS, with GitHub as the source of truth and deliberate publishing to the existing Cloudflare Pages project `fullpsych-site` at https://fullpsych.com.

## Editing on the Mac

Double-click **Edit-FullPsych.command**. Tina opens at http://localhost:4323/admin/index.html#/~/ with a live website preview. Leave its Terminal window running.

- **Pages**: all five existing pages, text, images, descriptions, and existing page layouts. Headings are edited in the content, with no extra required heading field.
- **Articles**: existing articles and future posts. Only published content goes to production.
- **Site Settings**: navigation (add, remove, rename, drag to reorder), site identity, logo, default portrait, and the existing contact form key.
- Save writes Markdown/MDX or JSON locally. Previewing does not deploy or consume a Cloudflare build.

**Update-FullPsych.command** pulls GitHub changes when the working copy is clean. The running Astro preview refreshes. It stops if local edits need reconciling rather than overwriting them. Opening Edit FullPsych also pulls when clean.

**Publish-FullPsych.command** commits and pushes saved local changes, updating `publish.json` to request the existing GitHub Action. Commit and push can also be done with ordinary Git tools.

## GitHub and publishing

Edit on `main`. Normal commits do not deploy. Publish deliberately using GitHub Actions → Publish FullPsych → Run workflow, or by updating `publish.json`. ChatGPT can update that file when asked to publish; direct workflow dispatch depends on the tools available in the conversation.

The Action runs `npm ci`, builds Astro, and deploys `dist/` using Wrangler to the existing Cloudflare project. Existing `CLOUDFLARE_API_TOKEN` repository secret and account ID remain in use. Cloudflare automatic builds remain disabled. DNS and custom domains are unchanged.

## Development

Node 24 LTS is recommended (Tina CLI supports Node 22 and 24).

```sh
npm ci
npm run dev
# In another terminal, after stopping the preview when needed:
npm run build
npm run preview
```

Content lives in `content/pages/*.mdx`, `content/articles/*.mdx`, and `content/settings/site.json`. Astro components live in `src/components` and `src/layouts`. Production builds use the checked-out content, including GitHub edits, rather than a remote CMS cache.

The original five page URLs, `/articles/art1/`, published status, article date, content, images, contact form endpoint, 404, sitemap, and crawler rules are preserved. Markdown bodies are copied verbatim. Legacy nav metadata remains in the content for reference; **Site Settings → Navigation** now controls links.

## Tina account and hosting

Tina is configured in local mode: no additional token or TinaCloud account is needed. Its official Astro integration supplies live editing on the Mac. The production output is static and deliberately excludes the local-only admin and API. `/admin/` on the public site is not a hosted editor.

Editing from another computer without running the project locally would require connecting the GitHub repository to a TinaCloud project (or hosting Tina's data layer). That is a separate account setup, not required for this workflow. Nothing automatically pushes or reconciles unsaved local edits with GitHub.

## Migration / rollback

Eleventy and Pages CMS configuration have been replaced. The previous production source remains in Git history at `99dda0a33c8291c1a3d6ac1820518bc9ba5a536b`. To roll back, restore that revision's source and deploy it with its `_site` workflow. Prototype branches and local test folders are separate experiments and are not production content.
