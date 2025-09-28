import { container } from 'tsyringe';
import { ActionResponse } from '@/actions/shared';
import UserDto from '@/actions/user/shared/UserDto';
import type { User } from '@/domains/models/user';
import type { UserResponse } from '@/schema/user';
import { ERROR_CODES, type ErrorCode } from '@/schema/user/user-find-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import UserFindService from '@/services/user/user-find-service/UserFindService';

export async function getSessionUserFromDB() {
  const res = ActionResponse.createResponseObject<UserResponse, ErrorCode>;

  try {
    const sessionUserService = container.resolve(SessionUserService);

    let sessionUser: User;

    try {
      sessionUser = await sessionUserService.execute();
    } catch {
      return res(false, null, ERROR_CODES.unauthorized);
    }

    const userFindService = container.resolve(UserFindService);

    const user = await userFindService.execute({
      key: 'id',
      value: sessionUser.id,
    });

    const dto = UserDto.create(user);

    return res(true, dto.toObject());
  } catch (exception) {
    console.error(`[actions/getUserById] ${exception?.message || ''}`);

    return res(false, null, ERROR_CODES.failure);
  }
}
