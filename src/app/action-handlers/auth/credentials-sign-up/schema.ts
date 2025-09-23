import z from 'zod';
import { ERROR_CODES } from '@/actions/auth/credentials-sign-up-action';
import { credentialsSignUpResponseSchema } from '@/schema';

export const stateSchema = z.discriminatedUnion('success', [
  z
    .object({
      success: z.literal(false),
      inputs: credentialsSignUpResponseSchema,
      errorCode: z.enum(ERROR_CODES).optional(),
    })
    .strict(),
  z.object({
    success: z.literal(true),
  }),
]);

export type State = z.infer<typeof stateSchema>;
