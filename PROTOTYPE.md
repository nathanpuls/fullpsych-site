# Prototype verification

This branch is an isolated experiment, not a migration or deployment.

Verified in a running StackBlitz WebContainer:
- npm install completed and Astro served Home and About.
- Keystatic loaded the two page editors and Design settings.
- Saving the Home heading in Keystatic updated the already-open Astro preview without manually refreshing it. The change was observed within about 5.5 seconds; this is an observation, not a guaranteed latency.
- A rich-text body edit also appeared in the preview after Save.
- Changing the accent from blue to teal in Keystatic changed the already-open preview.
- Restoring the original Markdoc directly in the code editor also updated the preview.
- npm run build completed successfully and generated static dist output with Keystatic integration excluded.
- Temporary content and palette edits were restored in the working preview. Committed prototype content retains the original page text.

Important limits:
- Keystatic uses local storage in the same development filesystem as Astro. Save updates those working files; it does not automatically commit them to GitHub.
- Unsaved CMS keystrokes are not streamed to the frontend.
- GitHub App / Keystatic Cloud authenticated hosted editing has not been configured or tested.
- External GitHub commits still need to be pulled/reopened. Astro does not solve external Git synchronization.
- StackBlitz dev preview URLs require the workspace to remain open. Use its Open Preview in new tab control, then Open CMS.
- The prototype has no Cloudflare deployment configuration. The existing workflow is main-only; production and main were not changed.

Try it:
https://stackblitz.com/github/nathanpuls/fullpsych-site/tree/astro-keystatic-prototype

Open the CMS from the preview footer. Keep the preview and CMS in separate tabs, edit a heading or content, click Save, and watch the preview.
