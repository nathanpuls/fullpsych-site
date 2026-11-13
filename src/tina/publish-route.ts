import type { APIRoute } from 'astro';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
const run = promisify(execFile);
let publishing = false;
export const prerender = false;
export const POST: APIRoute = async ({ request, url }) => {
  if (request.headers.get('origin') !== url.origin || !request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Publish must be requested from the local FullPsych editor.' }, { status: 403 });
  }
  if (publishing) return Response.json({ error: 'Publishing is already in progress.' }, { status: 409 });
  publishing = true;
  try {
    await run(process.execPath, ['scripts/publish.mjs'], {
      cwd: fileURLToPath(new URL('../../', import.meta.url)), timeout: 120000,
      env: { ...process.env, PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH || ''}` },
    });
    return Response.json({ message: 'Publish requested. GitHub Actions is building and deploying your saved changes.' });
  } catch (error: any) {
    return Response.json({ error: error.stderr?.trim() || 'Publishing failed. Check the local server log.' }, { status: 500 });
  } finally { publishing = false; }
};
