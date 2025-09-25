import { container } from 'tsyringe';
import { BookmarkDto } from '@/actions/bookmark/shared';
import { type Action, ActionResponse } from '@/actions/shared';
import {
  ERROR_CODES,
  type ErrorCode,
  type GetBookmarkListCommand,
  getBookmarkListCommandSchema,
  type ResponseData,
} from '@/schema/bookmark/bookmark-list-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import BookmarkListService from '@/services/bookmark/bookmark-list-service/BookmarkListService';

export const getBookmarkList: Action<
  GetBookmarkListCommand,
  ResponseData,
  ErrorCode
> = async command => {
  const res = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  const { limit, orderByKey, orderByWay, page } =
    getBookmarkListCommandSchema.parse(command);

  try {
    const sessionService = container.resolve(SessionUserService);

    const user = await sessionService.execute();

    if (!user) {
      return res(false, null, ERROR_CODES.unauthorized);
    }

    const service = container.resolve(BookmarkListService);
    const bookmarkRecords = await service.execute({
      userId: user.id,
      limit,
      orderByKey,
      orderByWay,
      page,
    });

    const bookmarks = bookmarkRecords.map(bookmark => {
      const dto = BookmarkDto.create(bookmark);

      return dto.toObject();
    });

    return res(true, { bookmarks });
  } catch (exception) {
    console.error(exception);

    return res(false, null, ERROR_CODES.failure);
  }
};
