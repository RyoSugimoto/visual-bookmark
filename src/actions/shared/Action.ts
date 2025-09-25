import type { ActionResponseObject } from './ActionResponse';

export type Action<Payload, ResponseData, ErrorCode = string> = (
  payload?: Payload,
) =>
  | Promise<ActionResponseObject<ResponseData, ErrorCode>>
  | ActionResponseObject<ResponseData, ErrorCode>;
