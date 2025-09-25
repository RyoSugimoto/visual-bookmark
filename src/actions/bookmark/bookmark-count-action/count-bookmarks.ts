import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import {
  ERROR_CODES,
  type ErrorCode,
  type ResponseData,
} from '@/schema/bookmark/bookmark-count-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import BookmarkCountService from '@/services/bookmark/bookmark-count-service/BookmarkCountService';

export const countBookmarks: Action<
  null,
  ResponseData,
  ErrorCode
> = async () => {
  const send = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  const sessionService = container.resolve(SessionUserService);

  try {
    const user = await sessionService.execute();
    const countService = container.resolve(BookmarkCountService);
    const count = await countService.execute({
      userId: user.id,
    });

    return send(true, { count });
  } catch {
    return send(false, null, ERROR_CODES.failure);
  }
};
