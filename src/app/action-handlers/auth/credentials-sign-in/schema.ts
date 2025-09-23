import z from 'zod';
import { ERROR_CODES } from '@/actions/auth/credentials-sign-in-action';
import { credentialsSignInResponseSchema } from '@/schema';

export const stateSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(false),
    inputs: credentialsSignInResponseSchema,
    errorCode: z.enum(ERROR_CODES).optional(),
  }),
  z.object({
    success: z.literal(true),
  }),
]);

export type State = z.infer<typeof stateSchema>;
