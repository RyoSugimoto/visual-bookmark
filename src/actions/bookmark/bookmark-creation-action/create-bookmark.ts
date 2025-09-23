'use server';

import '@/di';
import { container } from 'tsyringe';
import { BookmarkDto } from '@/actions/bookmark/shared';
import { type Action, ActionResponse } from '@/actions/shared';
import { Url } from '@/domains/models';
import { BookmarkDescription, BookmarkTitle } from '@/domains/models/bookmark';
import { FileKey } from '@/domains/models/file';
import {
  ERROR_CODES,
  type ErrorCode,
  FIELD_NAMES,
  type ResponseData,
  requestDataSchema,
} from '@/schema/bookmark/bookmark-creation-schema';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import BookmarkCreationService from '@/services/bookmark/bookmark-creation-service/BookmarkCreationService';
import { createUuidV4 } from '@/utils';

export const createBookmark: Action<FormData, ResponseData, ErrorCode> = async (
  formData: FormData,
) => {
  const send = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  const { success, data } = requestDataSchema.safeParse(formData.entries());

  if (!success) {
    return send(false, null, ERROR_CODES.inputOmission);
  }

  const sessionService = container.resolve(SessionUserService);

  const user = await sessionService.execute();

  if (!user) {
    return send(false, null, ERROR_CODES.unauthorized);
  }

  const imageFile = data[FIELD_NAMES.imageFile];

  const hasImage = imageFile?.size !== 0;

  const service = container.resolve(BookmarkCreationService);

  try {
    const bookmark = await service.execute({
      user,
      url: new Url(data[FIELD_NAMES.url]),
      title: new BookmarkTitle(data[FIELD_NAMES.title]),
      description: new BookmarkDescription(data[FIELD_NAMES.description]),
      image: hasImage ? imageFile : null,
      imageKey: hasImage ? new FileKey(createUuidV4()) : null,
    });

    const dto = BookmarkDto.create(bookmark);

    return send(true, dto.toObject());
  } catch (exception) {
    console.error(exception);

    return send(false, null, ERROR_CODES.failure);
  }
};
