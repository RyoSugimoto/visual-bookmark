import z from 'zod';

export const PREFIX = 'credentials-sign-up';

export const ERROR_CODES = {
  inputOmission: `${PREFIX}-input-omission`,
  userExisting: `${PREFIX}-user-existing`,
  invalidEmail: `${PREFIX}-invalid-email-address`,
  invalidPassword: `${PREFIX}-invalid-password`,
  failure: `${PREFIX}-failure`,
} as const;

export const credentialsSignUpRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const credentialsSignUpResponseSchema = z.object({
  email: z.string().nullable(),
});

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type RequestData = z.infer<typeof credentialsSignUpRequestSchema>;

export type ResponseData = z.infer<typeof credentialsSignUpResponseSchema>;
