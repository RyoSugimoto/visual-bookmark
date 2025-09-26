export const PREFIX = 'user-update';

export const ERROR_CODES = {
  failure: `${PREFIX}-failure`,
} as const;

export const FIELD_NAMES = {
  email: `${PREFIX}-email`,
  name: `${PREFIX}-name`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
