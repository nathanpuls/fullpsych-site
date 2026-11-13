# FullPsych

Eleventy + Pages CMS + Cloudflare Pages. Edit and publish from `main` only.

## Edit, preview, publish

1. Edit in [Pages CMS](https://app.pagescms.org/nathanpuls/fullpsych-site/main) or GitHub.
2. Preview `main` in [StackBlitz](https://stackblitz.com/github/nathanpuls/fullpsych-site). Run `npm ci` and `npm run dev` if it does not start automatically. Reload the project to pick up later GitHub edits.
3. Click **Publish** in Pages CMS or **Run workflow** in [Publish FullPsych](https://github.com/nathanpuls/fullpsych-site/actions/workflows/publish.yml). This builds the selected main commit and deploys to the existing Cloudflare Pages project serving fullpsych.com.

The workflow runs only when manually dispatched, and refuses branches other than main. Pages CMS saves are GitHub commits, not publish requests.

ChatGPT's currently connected GitHub tools do not expose workflow dispatch. A typed or voice request can publish only when ChatGPT has another authorized way to trigger the workflow, such as browser control of Pages CMS or GitHub. Voice alone does not grant this capability.

## One-time deployment setup

- Add the repository Actions secret `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with **Account → Cloudflare Pages → Edit**, restricted to account `ed3b0af15e1c2b8a6a351cc929b0a312`.
- The existing project is `fullpsych-site`, production branch `main`, output `_site`.
- Run Publish FullPsych once and verify it succeeds.
- Only after that succeeds, in Cloudflare Pages → fullpsych-site → Settings → Builds & deployments → Branch control: disable automatic production deployments and select no preview branches.
- If Pages CMS requests updated GitHub App access, approve **Actions: read and write** for this repository so its Publish action can dispatch the workflow.

Until the Cloudflare branch controls are changed, automatic deployments remain enabled.

## Local preview

```sh
npm ci
npm run dev
```
