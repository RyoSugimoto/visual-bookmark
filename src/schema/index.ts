import z from 'zod';

export const ogpDataSchema = z.object({
  url: z.url(),
  title: z.string(),
  type: z.string(),
  siteName: z.string(),
  description: z.string(),
  image: z.url(),
});

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  image: z.url().optional(),
  password: z.string().optional(),
});

export const credentialsSignInRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const credentialsSignInResponseSchema = z.object({
  email: z.string().nullable(),
});

export const credentialsSignUpRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const credentialsSignUpResponseSchema = z.object({
  email: z.string().nullable(),
});

export const bookmarkCreationRequestSchema = z.object({
  url: z.url(),
  title: z.string(),
  description: z.string().optional(),
  imageFile: z
    .instanceof(File)
    .refine(
      file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      {
        message: '対応している形式は、JPEG、PNG、WebPのみです。',
      },
    )
    .optional(),
});

export const bookmarkCreationResponseSchema = z.object({
  url: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().optional().nullable(),
});
