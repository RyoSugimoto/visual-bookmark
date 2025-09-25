import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import { ERROR_CODES, type ErrorCode } from '@/schema/auth/sign-out-schema';
import SignOutService from '@/services/auth/sign-out-service/SignOutService';

export const signOut: Action<null, null, ErrorCode> = async () => {
  const res = ActionResponse.createResponseObject<null, ErrorCode>;

  try {
    const service = container.resolve(SignOutService);
    await service.execute();

    return res(true, null);
  } catch (exception) {
    console.error(`[actions/signOut] ${exception.message || ''}`);

    return res(false, null, ERROR_CODES.failure);
  }
};
