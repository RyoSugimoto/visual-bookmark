import z from 'zod';

export const bookmarkResponseSchema = z.object({
  id: z.string(),
  url: z.url(),
  title: z.string().optional(),
  description: z.string().optional(),
  imageId: z.url().optional().nullable(),
});

export type BookmarkResponse = z.infer<typeof bookmarkResponseSchema>;
