import ServiceError from './ServiceError';

export default abstract class Service<
  ExecuteCommand,
  ExecuteReturn,
  ErrorCode extends string = string,
> {
  /**
   * サービスを実行する。
   */
  public abstract execute(command: ExecuteCommand): ExecuteReturn;

  protected throwError({
    message,
    code,
  }: {
    message?: string;
    code?: ErrorCode;
  }) {
    const error = new ServiceError<ErrorCode>(message);
    error.code = code;
    throw error;
  }
}
