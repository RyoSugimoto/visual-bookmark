import z from 'zod';

export const PREFIX = 'user-update';

export const ERROR_CODES = {
  failure: `${PREFIX}-failure`,
  inputOmission: `${PREFIX}-input-omission`,
} as const;

export const FIELD_NAMES = {
  currentEmail: `${PREFIX}-current-email`,
  email: `${PREFIX}-email`,
  name: `${PREFIX}-name`,
} as const;

export const requestDataSchema = z.object({
  [FIELD_NAMES.currentEmail]: z.email(),
  [FIELD_NAMES.name]: z.string().optional(),
  [FIELD_NAMES.email]: z.email().optional(),
});

export type RequestData = z.infer<typeof requestDataSchema>;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
