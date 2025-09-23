export type ActionResponseObject<
  ResponseData,
  ErrorCode = string,
  Type = 'ActionResponseObject',
> = {
  readonly _type: Type;
  success: boolean;
  data?: ResponseData;
  errorCode?: ErrorCode;
  message?: string;
};

export default class ActionResponse<ResponseData, ErrorCode = string> {
  private _type: 'ActionResponse';

  constructor(
    public readonly success: boolean = false,
    public readonly data?: ResponseData,
    public readonly errorCode?: ErrorCode,
    public readonly message: string = '',
  ) {}

  static create<ResponseData, ErrorCode>(
    success: boolean,
    data?: ResponseData,
    errorCode?: ErrorCode,
    message: string = '',
  ) {
    return new ActionResponse<ResponseData, ErrorCode>(
      success,
      data,
      errorCode,
      message,
    );
  }

  toObject() {
    return {
      success: this.success,
      data: this.data,
      errorCode: this.errorCode,
      message: this.message,
    } as ActionResponseObject<ResponseData, ErrorCode>;
  }

  static createResponseObject<ResponseData, ErrorCode>(
    success: boolean,
    data?: ResponseData,
    errorCode?: ErrorCode,
    message: string = '',
  ) {
    return new ActionResponse<ResponseData, ErrorCode>(
      success,
      data,
      errorCode,
      message,
    ).toObject();
  }
}
