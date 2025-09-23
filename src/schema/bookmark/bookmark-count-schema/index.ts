export const PREFIX = 'bookmark-count';

export const ERROR_CODES = {
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type ResponseData = {
  count: number;
};
