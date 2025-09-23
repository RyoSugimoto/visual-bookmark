export const HTTP_STATUS_CODES = {
  ok: 200,
  created: 201,
  movedPermanently: 301,
  found: 302,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  internalServerError: 500,
} as const;

export type HttpStatusCode =
  (typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];
