import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const prototypePages = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './prototype/content' }),
  schema: z.object({ title: z.string(), heading: z.string(), description: z.string() }),
});
export const collections = { prototypePages };
