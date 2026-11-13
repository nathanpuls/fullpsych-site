import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = resolve(root, 'public');
const settings = JSON.parse(await readFile(resolve(root, 'content/settings/site.json'), 'utf8'));
let logo;
if (/^https:\/\//i.test(settings.logo || '')) {
  const response = await fetch(settings.logo);
  if (!response.ok) throw new Error(`Could not load site logo: ${response.status}`);
  logo = Buffer.from(await response.arrayBuffer());
} else {
  if (!settings.logo?.startsWith('/')) throw new Error('Set a site logo in Tina before building.');
  const path = resolve(publicRoot, `.${decodeURIComponent(settings.logo)}`);
  if (relative(publicRoot, path).startsWith('..')) throw new Error('Site logo must be inside public/.');
  logo = await readFile(path);
}
// A content-based path prevents browsers from retaining a previous logo's icons.
const version = createHash('sha256').update('brand-icons-v1').update(logo).update(settings.name || '').digest('hex').slice(0, 16);
const base = `/generated-icons/${version}`;
const output = resolve(publicRoot, `.${base}`);
await rm(resolve(publicRoot, 'generated-icons'), { recursive: true, force: true });
await mkdir(output, { recursive: true });
const source = await sharp(logo).rotate().trim().png().toBuffer();
const white = { r: 255, g: 255, b: 255, alpha: 1 };

async function icon(filename, size, padding = 0, opaque = false) {
  const inner = size - padding * 2;
  let image = sharp(source).resize(inner, inner, { fit: 'contain', background: { ...white, alpha: 0 } });
  if (padding) image = image.extend({ top: padding, bottom: padding, left: padding, right: padding, background: white });
  if (opaque) image = image.flatten({ background: white });
  const png = await image.png().toBuffer();
  await writeFile(resolve(output, filename), png);
  return png;
}
const faviconImages = [];
for (const size of [16, 32, 48]) faviconImages.push({ size, png: await icon(`favicon-${size}.png`, size) });
for (const size of [120, 152, 167, 180]) await icon(`apple-touch-icon-${size}.png`, size, Math.round(size * 0.08), true);
for (const size of [192, 512]) await icon(`android-chrome-${size}.png`, size, Math.round(size * 0.08), true);
// The full rectangular logo fits within the circular safe zone of Android masks.
await icon('android-maskable-512.png', 512, 116, true);
await icon('mstile-144.png', 144, 12, true);
await sharp(source).resize(340, 340, { fit: 'inside' }).toBuffer().then(async image => {
  await sharp({ create: { width: 512, height: 512, channels: 4, background: white } })
    .composite([{ input: image, gravity: 'centre' }]).png().toFile(resolve(output, 'social-preview.png'));
});

// ICO directory entries point to PNG payloads supported by modern browsers/Windows.
const directory = Buffer.alloc(6 + 16 * faviconImages.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(faviconImages.length, 4);
let offset = directory.length;
faviconImages.forEach(({ size, png }, index) => {
  const entry = 6 + index * 16;
  directory[entry] = size;
  directory[entry + 1] = size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(png.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile(resolve(output, 'favicon.ico'), Buffer.concat([directory, ...faviconImages.map(image => image.png)]));
const manifest = {
  id: '/', name: settings.name, short_name: settings.name, start_url: '/', scope: '/', display: 'browser',
  theme_color: '#ffffff', background_color: '#ffffff',
  icons: [
    { src: `${base}/android-chrome-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: `${base}/android-chrome-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: `${base}/android-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
await writeFile(resolve(output, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
await copyFile(resolve(output, 'favicon.ico'), resolve(publicRoot, 'favicon.ico'));
await copyFile(resolve(output, 'apple-touch-icon-180.png'), resolve(publicRoot, 'apple-touch-icon.png'));
await copyFile(resolve(output, 'site.webmanifest'), resolve(publicRoot, 'site.webmanifest'));
await mkdir(resolve(root, 'src/generated'), { recursive: true });
await writeFile(resolve(root, 'src/generated/brand-icons.json'), JSON.stringify({ base }, null, 2) + '\n');
console.log(`Generated browser, Apple, Android, and social icons from ${settings.logo}`);
