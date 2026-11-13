import { rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
// Tina's local API runs during generation; Astro must still render production output.
const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
  stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' },
});
if (result.status !== 0) process.exit(result.status || 1);
// The local-mode editor uses a development API and stays on the Mac.
rmSync('dist/admin', { recursive: true, force: true });
