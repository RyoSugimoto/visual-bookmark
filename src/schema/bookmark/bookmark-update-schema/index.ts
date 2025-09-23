import z from 'zod';
import type { BookmarkResponse } from '../bookmark-schema';

export const PREFIX = 'bookmark-update';

export const FIELD_NAMES = {
  id: `${PREFIX}-id`,
  url: `${PREFIX}-url`,
  title: `${PREFIX}-title`,
  description: `${PREFIX}-description`,
  imageCommand: `${PREFIX}-image-command`,
  imageFile: `${PREFIX}-image-file`,
} as const;

export const ERROR_CODES = {
  inputOmission: `${PREFIX}-input-omission`,
  failure: `${PREFIX}-failure`,
} as const;

export const requestDataSchema = z.object({
  [FIELD_NAMES.id]: z.string(),
  [FIELD_NAMES.url]: z.string().optional(),
  [FIELD_NAMES.title]: z.string().optional(),
  [FIELD_NAMES.description]: z.string().optional(),
  [FIELD_NAMES.imageCommand]: z
    .literal(['noop', 'delete', 'change'])
    .default('noop')
    .optional(),
  [FIELD_NAMES.imageFile]: z.instanceof(File).optional(),
});

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type RequestData = z.infer<typeof requestDataSchema>;

export type ResponseData = BookmarkResponse;
