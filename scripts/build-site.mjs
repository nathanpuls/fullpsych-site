import { spawnSync } from 'node:child_process';
// Tina's local API runs during generation; Astro must still render production output.
const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
  stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' },
});
if (result.status !== 0) process.exit(result.status || 1);
// Tina's build generates a Cloud-connected admin, while Astro renders checked-out content.
// Keep dist/admin so editing works on any computer through TinaCloud authentication.
