import { inject, injectable } from 'tsyringe';
import type { Url } from '@/domains/models';
import type {
  Bookmark,
  BookmarkDescription,
  BookmarkTitle,
} from '@/domains/models/bookmark';
import type IBookmarkRepository from '@/domains/models/bookmark/IBookmarkRepository';
import { type FileKey, FileSize, FileType } from '@/domains/models/file';
import type FileRecord from '@/domains/models/file/File';
import type IFileRepository from '@/domains/models/file/IFileRepository';
import type { User } from '@/domains/models/user';
import type IStorageAdapter from '@/services/shared/IStorageAdapter';
import type ITransactionProvider from '@/services/shared/ITransactionProvider';
import ServiceWithPolicy from '@/services/shared/ServiceWithPolicy';

export interface Command {
  user: User;
  url: Url;
  title: BookmarkTitle;
  description?: BookmarkDescription;
  image?: File;
  imageKey?: FileKey;
}

const PREFIX = 'bookmark-creation';

export const ERROR_CODES = {
  unauthorized: `${PREFIX}-unauthorized`,
  imageUploadFailure: `${PREFIX}-image-upload-failure`,
  failure: `${PREFIX}-failure`,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

@injectable()
export default class BookmarkCreationService extends ServiceWithPolicy<
  Command,
  Promise<Bookmark>,
  null,
  ErrorCode
> {
  constructor(
    @inject('BookmarkImageStorageAdapter')
    private storage: IStorageAdapter,
    @inject('FileRepository')
    private fileRepository: IFileRepository,
    @inject('BookmarkRepository')
    private bookmarkRepository: IBookmarkRepository,
    @inject('TransactionProvider')
    private transactionProvider: ITransactionProvider,
  ) {
    super();
  }

  protected checkPolicy(user: User): boolean {
    return user !== null && user !== undefined;
  }

  async execute(command: Command) {
    const { user, url, title, description, image, imageKey } = command;

    if (!this.checkPolicy(user)) {
      this.throwError({
        message: `[BookmarkCreationService] ユーザー認証が必要です。`,
        code: ERROR_CODES.unauthorized,
      });
    }

    const hasImage = image instanceof File && image.size !== 0;

    // 画像のアップロード
    try {
      if (hasImage) {
        await this.storage.upload({
          file: image,
          key: imageKey,
        });
      }
    } catch (exception) {
      console.error(exception);

      this.throwError({
        message: `[BookmarkCreationService] 画像ファイルのアップロードに失敗しました。 詳細: ${exception.message || ''}`,
        code: ERROR_CODES.imageUploadFailure,
      });
    }

    // データベースへの登録

    try {
      let result: Bookmark;

      await this.transactionProvider.begin(async () => {
        let fileUploaded: FileRecord = null;

        if (hasImage) {
          fileUploaded = await this.fileRepository.create({
            userId: user.id,
            key: imageKey,
            type: new FileType(image.type),
            size: new FileSize(image.size),
          });
        }

        result = await this.bookmarkRepository.create({
          userId: user.id,
          url,
          title,
          imageFileId: fileUploaded?.id,
          description,
        });
      });

      return result;
    } catch (exception) {
      console.error(exception);

      this.throwError({
        message: `データベースの書き込みに失敗しました。 詳細: ${exception.message || ''}`,
        code: ERROR_CODES.failure,
      });
    }
  }
}
