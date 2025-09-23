import { inject, injectable } from 'tsyringe';
import type { Bookmark } from '@/domains/models/bookmark';
import type IBookmarkRepository from '@/domains/models/bookmark/IBookmarkRepository';
import type { FileKey } from '@/domains/models/file';
import type IFileRepository from '@/domains/models/file/IFileRepository';
import type { User } from '@/domains/models/user';
import type IStorageAdapter from '@/services/shared/IStorageAdapter';
import type ITransactionProvider from '@/services/shared/ITransactionProvider';
import ServiceWithPolicy from '@/services/shared/ServiceWithPolicy';

interface Command {
  user: User;
  bookmark: Bookmark;
}

/**
 * * 認可処理あり
 */
@injectable()
export default class BookmarkDeletionService extends ServiceWithPolicy<
  Command,
  Promise<Bookmark>,
  Bookmark
> {
  constructor(
    @inject('BookmarkRepository')
    private bookmarkRepository: IBookmarkRepository,
    @inject('FileRepository')
    private fileRepository: IFileRepository,
    @inject('TransactionProvider')
    private transaction: ITransactionProvider,
    @inject('BookmarkImageStorageAdapter')
    private storageAdapter: IStorageAdapter,
  ) {
    super();
  }

  protected checkPolicy(user: User, bookmark: Bookmark): boolean {
    return user.id.equals(bookmark.userId);
  }

  async execute(command: Command) {
    const { user, bookmark } = command;

    if (!this.checkPolicy(user, bookmark)) {
      throw new Error(
        `[BookmarkDeletionService] ブックマークのオーナーIDがユーザーIDと一致しません。`,
      );
    }

    this.transaction.begin(async () => {
      await this.bookmarkRepository.delete(bookmark.id);

      let fileKey: FileKey;

      if (bookmark.imageFileId) {
        fileKey = await this.fileRepository.delete(bookmark.imageFileId);
      }

      if (fileKey) {
        await this.storageAdapter.delete(fileKey);
      }
    });

    return bookmark;
  }
}
