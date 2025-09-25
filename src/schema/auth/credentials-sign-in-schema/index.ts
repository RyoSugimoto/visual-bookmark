import z from 'zod';

export const PREFIX = 'credentials-sign-in';

export const ERROR_CODES = {
  noCredentials: `${PREFIX}-no-credentials`,
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const credentialsSignInRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const credentialsSignInResponseSchema = z.object({
  email: z.string().nullable(),
});

export type RequestData = z.infer<typeof credentialsSignInRequestSchema>;

export type ResponseData = z.infer<typeof credentialsSignInResponseSchema>;
