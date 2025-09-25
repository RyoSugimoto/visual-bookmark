import z from 'zod';

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  image: z.url().optional(),
  password: z.string().optional(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
