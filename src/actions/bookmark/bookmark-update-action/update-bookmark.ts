import '@/di';
import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import { Url } from '@/domains/models';
import {
  BookmarkDescription,
  BookmarkId,
  BookmarkTitle,
} from '@/domains/models/bookmark';
import { FileKey } from '@/domains/models/file';
import type { BookmarkResponse } from '@/schema/bookmark/bookmark-schema';
import {
  ERROR_CODES,
  type ErrorCode,
  FIELD_NAMES,
  requestDataSchema,
} from '@/schema/bookmark/bookmark-update-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import BookmarkUpdateService from '@/services/bookmark/bookmark-update-service/BookmarkUpdateService';
import { createUuidV4 } from '@/utils';
import { BookmarkDto } from '../shared';

export const updateBookmark: Action<
  FormData,
  BookmarkResponse,
  ErrorCode
> = async (formData: FormData) => {
  const send = ActionResponse.createResponseObject<BookmarkResponse, ErrorCode>;

  const formDataObject = Object.fromEntries(formData.entries());

  const { success, data } = requestDataSchema.safeParse(formDataObject);

  if (!success) {
    return send(false, null, ERROR_CODES.inputOmission);
  }

  const sessionService = container.resolve(SessionUserService);

  const sessionUser = await sessionService.execute();

  const updateService = container.resolve(BookmarkUpdateService);

  const image =
    data[FIELD_NAMES.imageCommand] === 'change'
      ? {
          command: 'change' as 'change',
          key: new FileKey(createUuidV4()),
          file: data[FIELD_NAMES.imageFile],
        }
      : {
          command: data[FIELD_NAMES.imageCommand] as 'noop' | 'delete',
        };

  const bookmark = await updateService.execute({
    user: sessionUser,
    id: new BookmarkId(data[FIELD_NAMES.id]),
    url: new Url(data[FIELD_NAMES.url]),
    title: new BookmarkTitle(data[FIELD_NAMES.title]),
    description: new BookmarkDescription(data[FIELD_NAMES.description]),
    image,
  });

  const dto = BookmarkDto.create(bookmark);

  return send(true, dto.toObject());
};
