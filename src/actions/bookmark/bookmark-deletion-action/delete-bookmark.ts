'use server';

import { BookmarkDto } from '../shared';
import '@/di';
import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import { BookmarkId } from '@/domains/models/bookmark';
import type { User } from '@/domains/models/user';
import {
  ERROR_CODES,
  type ErrorCode,
  FIELD_NAMES,
  type ResponseData,
} from '@/schema/bookmark/bookmark-deletion-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import BookmarkDeletionService from '@/services/bookmark/bookmark-deletion-service/BookmarkDeletionService';
import BookmarkFindService from '@/services/bookmark/bookmark-find-service/BookmarkFindService';

export const deleteBookmark: Action<FormData, ResponseData, ErrorCode> = async (
  formData: FormData,
) => {
  const send = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  const sessionUserService = container.resolve(SessionUserService);

  let user: User;

  try {
    user = await sessionUserService.execute();

    if (!user) {
      throw new Error();
    }
  } catch (exception) {
    console.error(exception);

    return send(false, null, ERROR_CODES.unauthorized);
  }

  const id = formData.get(FIELD_NAMES.id) as string;

  if (!id) {
    return send(false, null, ERROR_CODES.inputOmission);
  }

  try {
    const findService = container.resolve(BookmarkFindService);

    const bookmark = await findService.execute({
      user,
      bookmarkId: new BookmarkId(id),
    });

    if (!bookmark) {
      return send(false, null, ERROR_CODES.notFound);
    }

    const deletionService = container.resolve(BookmarkDeletionService);

    const deleted = await deletionService.execute({
      user,
      bookmark,
    });

    const dto = BookmarkDto.create(deleted);

    return send(true, dto.toObject());
  } catch {
    return send(false, null, ERROR_CODES.failure);
  }
};
