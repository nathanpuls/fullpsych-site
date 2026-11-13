# FullPsych · Astro + Keystatic prototype

Isolated experiment on `astro-keystatic-prototype`. Do not merge into main or publish to fullpsych.com.

## Try it
```sh
npm install
npm run dev
```
Open http://localhost:4321/keystatic and the homepage in another tab. Edit Home or About, click Save, and watch the preview. Design settings change accent color and reading width. Source CSS changes use Astro/Vite live updates.

[Open browser workspace](https://stackblitz.com/github/nathanpuls/fullpsych-site/tree/astro-keystatic-prototype).

## What this demonstrates
- Real Keystatic local storage + Astro's watched files in the same development session.
- Two copies of existing pages, not a full migration.
- Browser CMS Save triggers local preview without a Cloudflare deployment.
- Unsaved rich-text edits are not promised to appear on the frontend.
- Existing Eleventy content and main branch remain intact.

## GitHub
The prototype source is committed to this branch. Local CMS saves edit working files; review and commit them using ordinary Git or a connected IDE. Direct edits on GitHub still require a pull/reopen into this development session; Astro does not solve external Git synchronization.
For a remotely hosted authenticated CMS, use Keystatic's supported GitHub mode or Keystatic Cloud. That needs its own GitHub App authorization. It is intentionally not enabled just to test local editing latency.

## Later Cloudflare publishing
`npm run build` excludes Keystatic API/admin routes and produces static `dist/` for a separate Cloudflare Pages project. No prototype deployment is configured. The existing publish workflow is gated to main and is not a prototype publisher. A hosted CMS would need a supported Node runtime or a separate development environment; do not assume the local filesystem CMS can be published as static files.
