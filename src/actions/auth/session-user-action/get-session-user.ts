import '@/di';
import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import UserDto from '@/actions/user/shared/UserDto';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import { ERROR_CODES, type ErrorCode, type ResponseData } from './modules';

export const getSessionUser: Action<
  null,
  ResponseData,
  ErrorCode
> = async () => {
  const send = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  const sessionUserService = container.resolve(SessionUserService);

  try {
    const user = await sessionUserService.execute();

    const dto = UserDto.create(user);

    return send(true, dto.toObject());
  } catch (exception) {
    console.error(`[getSessionUser] 詳細: ${exception.message || ''}`);

    return send(false, null, ERROR_CODES.failure);
  }
};
