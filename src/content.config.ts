import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    coverImage: z.string().optional(),
    coverCaption: z.string().optional(),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    relatedTools: z.array(z.string()).optional(),
    references: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
