import '@/di';
import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import { FileId } from '@/domains/models/file';
import type { User } from '@/domains/models/user';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import FileFindService from '@/services/file/file-find-service/FileFindService';
import BookmarkImageReadingService from '@/services/storage/bookmark-image-reading-service/BookmarkImageReadingService';

export type ResponseData = {
  source: ReadableStream;
  type: string;
};

export const PREFIX = 'load-bookmark-image';

export const ERROR_CODES = {
  unauthorized: `${PREFIX}-unauthorized`,
  notFound: `${PREFIX}-not-found`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const readBookmarkImage: Action<
  string,
  ResponseData | null,
  ErrorCode
> = async (fileId: string) => {
  const res = ActionResponse.createResponseObject<
    ResponseData | null,
    ErrorCode
  >;

  const sessionService = container.resolve(SessionUserService);

  const service = container.resolve(BookmarkImageReadingService);

  const fileFindService = container.resolve(FileFindService);

  let user: User;

  try {
    user = await sessionService.execute();
  } catch {
    return res(false, null, ERROR_CODES.unauthorized);
  }

  try {
    const fileIdObject = new FileId(fileId);

    const file = await fileFindService.execute({
      fileId: fileIdObject,
    });

    const source = await service.execute({
      user,
      fileId: fileIdObject,
    });

    return res(true, {
      source,
      type: file.type.value,
    });
  } catch (exception) {
    console.error(exception.message);

    return res(false, null, ERROR_CODES.notFound);
  }
};
