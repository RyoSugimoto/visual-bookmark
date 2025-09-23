import { inject, injectable } from 'tsyringe';
import type { Bookmark, BookmarkId } from '@/domains/models/bookmark';
import type IBookmarkRepository from '@/domains/models/bookmark/IBookmarkRepository';
import type { User } from '@/domains/models/user';
import ServiceWithPolicy from '@/services/shared/ServiceWithPolicy';

interface Command {
  user: User;
  bookmarkId: BookmarkId;
}

/**
 * * 認可処理あり
 */
@injectable()
export default class BookmarkFindService extends ServiceWithPolicy<
  Command,
  Promise<Bookmark>,
  Bookmark
> {
  constructor(
    @inject('BookmarkRepository')
    private repository: IBookmarkRepository,
  ) {
    super();
  }

  protected checkPolicy(user: User, bookmark: Bookmark): boolean {
    return user.id.equals(bookmark.userId);
  }

  async execute(command: Command): Promise<Bookmark> {
    const { user, bookmarkId } = command;

    const bookmark = await this.repository.findById(bookmarkId);

    if (this.checkPolicy(user, bookmark)) {
      return bookmark;
    } else {
      throw new Error(
        `[BookmarkFindService] ブックマークのオーナーIDがユーザーIDと一致しません。`,
      );
    }
  }
}
