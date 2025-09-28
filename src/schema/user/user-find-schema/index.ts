export const PREFIX = 'user-find';

export const ERROR_CODES = {
  failure: `${PREFIX}-failure`,
  unauthorized: `${PREFIX}-unauthorized`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
