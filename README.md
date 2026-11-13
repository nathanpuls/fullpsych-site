# FullPsych · TinaCMS local test

A separate Astro + TinaCMS experiment. Main, Eleventy, Keystatic's local test, and production are unchanged.

Double-click **Try-TinaCMS.command**.
- Editor with preview: http://localhost:4322/admin/index.html#/~/
- Standalone website: http://localhost:4322/
- About: http://localhost:4322/about/

The first launch installs npm dependencies. No TinaCloud account or API token is needed for local mode. The integration uses TinaCMS's official Astro visual editing path, not a custom synchronization service.

Edit inside Tina's visual editor to test updates while typing. Save persists to local Markdown/MDX files. A Heading field exists but is optional.

Site Settings → Navigation controls the header links. Add, remove, rename, or drag items to reorder them. The local editor and rendered navigation have been checked. Evaluate the editing experience before adopting it.

The supported Astro 6 integration requires a newer Astro major than the previous Keystatic test; the experiment uses the dependency versions from Tina's official current Astro starter. No existing site was upgraded.

GitHub/cloud editing and Cloudflare publishing are not configured here. Local edits are not automatically pushed. A hosted Tina CMS would need TinaCloud or a self-hosted backend; those are separate decisions.

Reference: https://tina.io/docs/frameworks/astro
Reference: https://github.com/tinacms/tina-astro-starter

