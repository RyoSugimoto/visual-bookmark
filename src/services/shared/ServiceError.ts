export default class ServiceError<ErrorCode extends string> extends Error {
  public code?: ErrorCode;
  public readonly type: string = 'ServiceError';
}
