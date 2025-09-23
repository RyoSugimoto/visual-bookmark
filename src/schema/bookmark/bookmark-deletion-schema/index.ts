import type { BookmarkResponse } from '../bookmark-schema';

export const PREFIX = 'bookmark-deletion';

export const ERROR_CODES = {
  unauthorized: `${PREFIX}-unauthorized`,
  notFound: `${PREFIX}-not-found`,
  inputOmission: `${PREFIX}-input-omission`,
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const FIELD_NAMES = {
  id: `${PREFIX}-id`,
} as const;

export type FieldName = (typeof FIELD_NAMES)[keyof typeof FIELD_NAMES];

export type ResponseData = BookmarkResponse;
