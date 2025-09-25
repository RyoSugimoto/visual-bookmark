export type ActionState<Data = unknown, ErrorCode = string> =
  | {
      status: 'default';
      data?: Data;
    }
  | {
      status: 'error';
      data?: Data;
      errorCode?: ErrorCode;
    }
  | {
      status: 'success';
      data?: Data;
    };
