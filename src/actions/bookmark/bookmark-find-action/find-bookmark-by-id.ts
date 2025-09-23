'use server';

import '@/di';
import { container } from 'tsyringe';
import { BookmarkDto } from '@/actions/bookmark/shared';
import { type Action, ActionResponse } from '@/actions/shared';
import { type Bookmark, BookmarkId } from '@/domains/models/bookmark';
import type { User } from '@/domains/models/user';
import {
  ERROR_CODES,
  type ErrorCode,
  type FindBookmarkByIdCommand,
  type ResponseData,
} from '@/schema/bookmark/bookmark-find-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import BookmarkFindService from '@/services/bookmark/bookmark-find-service/BookmarkFindService';

export const findBookmarkById: Action<
  FindBookmarkByIdCommand,
  ResponseData,
  ErrorCode
> = async ({ bookmarkId }: FindBookmarkByIdCommand) => {
  const send = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  let user: User;
  let bookmarkEntity: Bookmark;

  const sessionUserService = container.resolve(SessionUserService);
  const bookmarkFindService = container.resolve(BookmarkFindService);

  try {
    user = await sessionUserService.execute();
  } catch (exception) {
    console.error(exception);

    return send(false, null, ERROR_CODES.unauthorized);
  }

  try {
    bookmarkEntity = await bookmarkFindService.execute({
      user,
      bookmarkId: new BookmarkId(bookmarkId),
    });

    const dto = BookmarkDto.create(bookmarkEntity);
    const bookmarkResponseObject = dto.toObject();

    return send(true, bookmarkResponseObject);
  } catch (exception) {
    console.error(exception);

    return send(false, null, ERROR_CODES.failure);
  }
};
