import z from 'zod';
import { bookmarkResponseSchema } from '@/schema/bookmark/bookmark-schema';

export const PREFIX = 'bookmark-list';

export const ERROR_CODES = {
  unauthorized: `${PREFIX}-unauthorized`,
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const ResponseSchema = z.object({
  bookmarks: z.array(bookmarkResponseSchema).nullable(),
});

export type ResponseData = z.infer<typeof ResponseSchema>;

export const getBookmarkListCommandSchema = z.object({
  limit: z.coerce.number().int().min(1).max(120).default(12),
  orderByKey: z.enum(['createdAt']).default('createdAt'),
  orderByWay: z.enum(['desc', 'asc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
});

export type GetBookmarkListCommand = z.infer<
  typeof getBookmarkListCommandSchema
>;
