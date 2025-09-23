import { inject, injectable } from 'tsyringe';
import type { Url } from '@/domains/models';
import type {
  Bookmark,
  BookmarkDescription,
  BookmarkId,
  BookmarkTitle,
} from '@/domains/models/bookmark';
import type IBookmarkRepository from '@/domains/models/bookmark/IBookmarkRepository';
import { type FileKey, FileSize, FileType } from '@/domains/models/file';
import type IFileRepository from '@/domains/models/file/IFileRepository';
import type { User } from '@/domains/models/user';
import type IStorageAdapter from '@/services/shared/IStorageAdapter';
import type ITransactionProvider from '@/services/shared/ITransactionProvider';
import ServiceWithPolicy from '@/services/shared/ServiceWithPolicy';

type Command = {
  user: User;
  id: BookmarkId;
  url?: Url;
  title?: BookmarkTitle;
  description?: BookmarkDescription;
  image?:
    | {
        command: 'noop';
      }
    | {
        command: 'delete';
      }
    | {
        command: 'change';
        key: FileKey;
        file: File;
      };
};

@injectable()
export default class BookmarkUpdateService extends ServiceWithPolicy<
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
    private transactionProvider: ITransactionProvider,
    @inject('BookmarkImageStorageAdapter')
    private imageStorage: IStorageAdapter,
  ) {
    super();
  }

  protected checkPolicy(user: User, bookmark: Bookmark): boolean {
    return user.id.equals(bookmark.userId);
  }

  async execute({
    user,
    id,
    url,
    title,
    description,
    image,
  }: Command): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.findById(id);

    if (!this.checkPolicy(user, bookmark)) {
      throw new Error(`[BookmarkUpdateService] 権限がありません。`);
    }

    try {
      if (image?.command === 'delete') {
      }

      if (image?.command === 'change') {
        // 画像が指定されている場合
        await this.imageStorage.upload({
          file: image.file,
          key: image.key,
        });

        const newFileRecord = await this.fileRepository.create({
          userId: user.id,
          key: image.key,
          type: new FileType(image.file.type),
          size: new FileSize(image.file.size),
        });

        // 古い画像を削除
        if (bookmark.imageFileId) {
          const fileKey = await this.fileRepository.delete(
            bookmark.imageFileId,
          );

          await this.imageStorage.delete(fileKey);
        }

        return await this.bookmarkRepository.update({
          id: bookmark.id,
          url,
          title,
          description,
          imageFileId: newFileRecord.id,
        });
      }

      if (image?.command === 'delete') {
        // 古い画像を削除
        if (bookmark.imageFileId) {
          const fileKey = await this.fileRepository.delete(
            bookmark.imageFileId,
          );

          await this.imageStorage.delete(fileKey);
        }
      }

      return await this.bookmarkRepository.update({
        id: bookmark.id,
        url,
        title,
        description,
      });
    } catch (exception) {
      throw new Error(
        `[BookmarkUpdateService] 詳細: ${exception.message || ''}`,
      );
    }
  }
}
