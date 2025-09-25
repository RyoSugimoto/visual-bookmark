import z from 'zod';

export const ogpDataSchema = z.object({
  url: z.url(),
  title: z.string(),
  type: z.string(),
  siteName: z.string(),
  description: z.string(),
  image: z.url(),
});
