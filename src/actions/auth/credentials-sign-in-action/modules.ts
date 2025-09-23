import type z from 'zod';
import type { credentialsSignInResponseSchema } from '@/schema';

export const PREFIX = 'credentials-sign-in';

/**
 * クライアントに送信するエラーコード
 */
export const ERROR_CODES = {
  noCredentials: `${PREFIX}-no-credentials`,
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type ResponseData = z.infer<typeof credentialsSignInResponseSchema>;
