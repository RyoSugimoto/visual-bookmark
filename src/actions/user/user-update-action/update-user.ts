import { container } from 'tsyringe';
import { ActionResponse } from '@/actions/shared';
import { EmailAddress } from '@/domains/models';
import { UserName } from '@/domains/models/user';
import type { UserResponse } from '@/schema/user';
import {
  ERROR_CODES,
  type ErrorCode,
  FIELD_NAMES,
  requestDataSchema,
} from '@/schema/user/user-update-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import UserFindService from '@/services/user/user-find-service/UserFindService';
import UserUpdateService from '@/services/user/user-update-service.ts/UserUpdateService';
import UserDto from '../shared/UserDto';

export async function updateUser(formData: FormData) {
  const res = ActionResponse.createResponseObject<
    UserResponse | null,
    ErrorCode
  >;

  const requestData = Object.fromEntries(formData.entries());

  try {
    const userFindService = container.resolve(UserFindService);

    const { success, data } = requestDataSchema.safeParse(requestData);

    if (!success) {
      return res(false, null, ERROR_CODES.inputOmission);
    }

    const { [FIELD_NAMES.name]: name, [FIELD_NAMES.email]: email } = data;

    const sessionUserService = container.resolve(SessionUserService);

    const sessionUser = await sessionUserService.execute();

    const targetUser = await userFindService.execute({
      key: 'id',
      value: sessionUser.id,
    });

    const userUpdateService = container.resolve(UserUpdateService);

    const updatedUser = await userUpdateService.execute({
      user: sessionUser,
      id: targetUser.id,
      name: name ? new UserName(name) : null,
      email: email ? new EmailAddress(email) : null,
    });

    const dto = new UserDto(updatedUser.user);

    return res(true, dto.toObject());
  } catch (exception) {
    console.error(`[actions/updateUser] ${exception?.message || ''}`);

    return res(false, null, ERROR_CODES.failure);
  }
}
