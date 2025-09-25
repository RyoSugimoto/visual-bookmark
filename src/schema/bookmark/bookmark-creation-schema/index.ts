import z from 'zod';
import type { bookmarkResponseSchema } from '@/schema/bookmark/bookmark-schema';

export const PREFIX = 'bookmark-creation';

export const ERROR_CODES = {
  inputOmission: `${PREFIX}-input-omission`,
  invalidUrl: `${PREFIX}-invalid-url`,
  invalidTitle: `${PREFIX}-invalid-title`,
  invalidDescription: `${PREFIX}-invalid-description`,
  notAllowedFileType: `${PREFIX}-not-allowed-file-type`,
  notAllowedFileSize: `${PREFIX}-not-allowed-file-size`,
  unauthorized: `${PREFIX}-unauthorized`,
  failure: `${PREFIX}-failure`,
} as const;

export const FIELD_NAMES = {
  url: `${PREFIX}-url`,
  title: `${PREFIX}-title`,
  description: `${PREFIX}-description`,
  imageFile: `${PREFIX}-imageFile`,
} as const;

export const requestDataSchema = z.object({
  [FIELD_NAMES.url]: z.url(),
  [FIELD_NAMES.title]: z.string().optional(),
  [FIELD_NAMES.description]: z.string().optional(),
  [FIELD_NAMES.imageFile]: z
    .instanceof(File)
    .refine(
      file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      {
        message: '対応している形式は、JPEG、PNG、WebPのみです。',
      },
    )
    .optional(),
});

export type RequestData = z.infer<typeof requestDataSchema>;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type ResponseData = z.infer<typeof bookmarkResponseSchema>;
