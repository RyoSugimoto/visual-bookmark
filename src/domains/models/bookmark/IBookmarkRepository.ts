import type FileId from '../file/file-id/FileId';
import type Url from '../url/Url';
import type { UserId } from '../user';
import type {
  Bookmark,
  BookmarkDescription,
  BookmarkId,
  BookmarkTitle,
} from '.';

interface CreateCommand {
  userId: UserId;
  url: Url;
  title: BookmarkTitle;
  imageFileId?: FileId;
  description?: BookmarkDescription;
}

interface GetCommand {
  userId: UserId;
  limit: number;
  orderByKey: 'createdAt' | 'title';
  orderByWay: 'desc' | 'asc';
  page: number;
}

interface UpdateCommand {
  id: BookmarkId;
  url: Url;
  title: BookmarkTitle;
  description?: BookmarkDescription;
  imageFileId?: FileId;
}

interface CountCommand {
  userId: UserId;
}

export default interface IBookmarkRepository {
  create(command: CreateCommand): Promise<Bookmark>;

  list(command: GetCommand): Promise<Bookmark[]>;

  findById(id: BookmarkId): Promise<Bookmark>;

  update(command: UpdateCommand): Promise<Bookmark>;

  delete(id: BookmarkId): Promise<Bookmark>;

  count(command: CountCommand): Promise<number>;
}
