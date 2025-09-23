import type z from 'zod';
import type { credentialsSignUpResponseSchema } from '@/schema';

export const PREFIX = 'credentials-sign-up';

/**
 * サーバーアクションが返すエラーコード
 */

export const ERROR_CODES = {
  inputOmission: `${PREFIX}-input-omission`,
  userExisting: `${PREFIX}-user-existing`,
  invalidEmail: `${PREFIX}-invalid-email-address`,
  invalidPassword: `${PREFIX}-invalid-password`,
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * サーバーアクション関数用
 */

export type ResponseData = z.infer<typeof credentialsSignUpResponseSchema>;

/**
 * `useActionState` ハンドラ用
 */
