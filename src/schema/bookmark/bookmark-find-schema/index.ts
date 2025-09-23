import z from 'zod';
import type { bookmarkResponseSchema } from '@/schema/bookmark/bookmark-schema';

export const PREFIX = 'bookmark-find';

export const ERROR_CODES = {
  unauthorized: `${PREFIX}-unauthorized`,
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const findBookmarkByIdCommandSchema = z.object({
  bookmarkId: z.string(),
});

export type FindBookmarkByIdCommand = z.infer<
  typeof findBookmarkByIdCommandSchema
>;

export type ResponseData = z.infer<typeof bookmarkResponseSchema>;
