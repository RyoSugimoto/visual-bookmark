import '@/di';
import { container } from 'tsyringe';
import type { Action } from '@/actions/shared';
import { ActionResponse } from '@/actions/shared';
import { FileId } from '@/domains/models/file';
import SessionUserService from '@/services/auth/session-user-service/SessionUserService';
import BookmarkImageUrlService from '@/services/storage/bookmark-image-url-service/BookmarkImageUrlService';

/**
 *
 * @param fileId 画像のID（ `bookmark.imageId` ）
 * @returns クライアントから画像を参照できるPresigned URL
 */
export const getBookmarkImageUrl: Action<string, string, string> = async (
  fileId: string,
) => {
  const res = ActionResponse.createResponseObject<string, string>;

  try {
    const sessionUserService = container.resolve(SessionUserService);
    const user = await sessionUserService.execute();

    if (!user) {
      return res(false, '', ``);
    }

    const bookmarkImageUrlService = container.resolve(BookmarkImageUrlService);
    const url = await bookmarkImageUrlService.execute({
      user,
      fileId: new FileId(fileId),
    });

    return res(true, url.value);
  } catch (exception) {
    console.error(`[actions/getBookmarkImageUrl] ${exception.message || ''}`);

    return res(false, '', ``);
  }
};
