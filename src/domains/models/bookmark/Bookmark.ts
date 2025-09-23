import FileId from '../file/file-id/FileId';
import Url from '../url/Url';
import { UserId } from '../user';
import { BookmarkDescription, BookmarkId, BookmarkTitle } from '.';

export default class Bookmark {
  constructor(
    public readonly id: BookmarkId,
    public readonly userId: UserId,
    public readonly url: Url,
    public readonly title: BookmarkTitle,
    public readonly imageFileId?: FileId,
    public readonly description?: BookmarkDescription,
  ) {}

  static create(
    id: BookmarkId,
    userId: UserId,
    url: Url,
    title: BookmarkTitle,
    imageFileId?: FileId,
    description?: BookmarkDescription,
  ) {
    return new Bookmark(id, userId, url, title, imageFileId, description);
  }

  static fromValues({
    id,
    userId,
    url,
    title,
    imageFileId,
    description,
  }: {
    id: string;
    userId: string;
    url: string;
    title: string;
    imageFileId?: string;
    description?: string;
  }) {
    return new Bookmark(
      new BookmarkId(id),
      new UserId(userId),
      new Url(url),
      new BookmarkTitle(title),
      imageFileId ? new FileId(imageFileId) : null,
      description ? new BookmarkDescription(description) : null,
    );
  }
}
