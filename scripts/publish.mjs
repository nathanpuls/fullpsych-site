import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const cwd = fileURLToPath(new URL('../', import.meta.url));
const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
const git = (...args) => execFileSync('git', args, { cwd, env, encoding: 'utf8', timeout: 60000 }).trim();
try {
  if (git('branch', '--show-current') !== 'main') throw new Error('Publishing is only available from main.');
  git('fetch', 'origin', 'main');
  const remote = git('rev-parse', 'origin/main');
  const local = git('rev-parse', 'HEAD');
  const dirty = git('status', '--porcelain');
  if (remote !== local) {
    try { git('merge-base', '--is-ancestor', remote, local); }
    catch {
      if (dirty) throw new Error('GitHub has newer changes. Save and commit your local edits, then pull GitHub changes before publishing. Nothing was overwritten.');
      git('pull', '--ff-only', 'origin', 'main');
    }
  }
  writeFileSync(new URL('../publish.json', import.meta.url), JSON.stringify({ revision: Date.now() }, null, 2) + '\n');
  git('add', '-A');
  git('commit', '-m', 'Publish FullPsych');
  git('push', 'origin', 'main');
  console.log('Publish requested. GitHub Actions will build and deploy to fullpsych.com.');
} catch (error) {
  console.error(error.stderr?.toString().trim() || error.message);
  process.exitCode = 1;
}
