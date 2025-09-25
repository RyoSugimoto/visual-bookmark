import type z from 'zod';
import type { userResponseSchema } from '@/schema/user';

export const PREFIX = 'get-session';

export const ERROR_CODES = {
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type ResponseData = z.infer<typeof userResponseSchema>;
