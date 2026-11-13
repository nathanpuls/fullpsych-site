# FullPsych

Eleventy + Pages CMS + Cloudflare Pages. Edit and publish from `main` only.

## Edit, preview, publish

1. Edit in [Pages CMS](https://app.pagescms.org/nathanpuls/fullpsych-site/main) or GitHub.
2. Preview `main` in [StackBlitz](https://stackblitz.com/github/nathanpuls/fullpsych-site). Run `npm ci` and `npm run dev` if it does not start automatically. Reload the project to pick up later GitHub edits.
3. Click **Publish** in Pages CMS or **Run workflow** in [Publish FullPsych](https://github.com/nathanpuls/fullpsych-site/actions/workflows/publish.yml). This builds the selected main commit and deploys to the existing Cloudflare Pages project serving fullpsych.com.

The workflow runs when manually dispatched or when `publish.json` changes on `main`. It refuses other branches. Ordinary content edits do not trigger this workflow.

## Publish through ChatGPT or Voice

When explicitly asked to **Publish FullPsych**, update `publish.json` on `main`: increment `revision` by one. Commit that change with a normal commit message (do not use `[skip ci]` or `[CF-Pages-Skip]`). This triggers the same Publish FullPsych workflow used by Pages CMS. Do not modify this file during ordinary content edits. Its contents are a publish signal, not site content.

ChatGPT's connected GitHub tools do not expose workflow dispatch, but repository write tools can update this file. Voice can use this route only when GitHub write tools are available in that conversation. Check the resulting workflow run before reporting a successful deployment.

## Deployment setup

- Configured repository Actions secret `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with **Account → Cloudflare Pages → Edit**, restricted to account `ed3b0af15e1c2b8a6a351cc929b0a312`.
- The existing project is `fullpsych-site`, production branch `main`, output `_site`.
- Publishing through `publish.json` was verified successfully: https://github.com/nathanpuls/fullpsych-site/actions/runs/43357467587
- Cloudflare automatic production deployments are disabled; preview branch deployments are set to None.
- If Pages CMS requests updated GitHub App access, approve **Actions: read and write** for this repository so its Publish action can dispatch the workflow.

GitHub content edits remain unpublished until an explicit publish request. Credentials are already configured and do not need to be requested for normal publishing.

## Local preview

```sh
npm ci
npm run dev
```
