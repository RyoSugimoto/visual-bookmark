import { inject, injectable } from 'tsyringe';
import type { FileId, File as FileRecord } from '@/domains/models/file';
import type IFileRepository from '@/domains/models/file/IFileRepository';
import type { User } from '@/domains/models/user';
import type IStorageAdapter from '@/services/shared/IStorageAdapter';
import ServiceWithPolicy from '@/services/shared/ServiceWithPolicy';

const PREFIX = 'bookmark-image-reading';

const ERROR_CODES = {
  notAllowed: `${PREFIX}-not-allowed`,
} as const;

interface Command {
  user: User;
  fileId: FileId;
}

@injectable()
export default class BookmarkImageReadingService extends ServiceWithPolicy<
  Command,
  Promise<ReadableStream>,
  FileRecord,
  (typeof ERROR_CODES)[keyof typeof ERROR_CODES]
> {
  constructor(
    @inject('FileRepository')
    private fileRepository: IFileRepository,
    @inject('BookmarkImageStorageAdapter')
    private bookmarkImageStorage: IStorageAdapter,
  ) {
    super();
  }

  protected checkPolicy(user: User, file: FileRecord): boolean {
    return user.id.equals(file.userId);
  }

  async execute({ user, fileId }: Command) {
    const fileRecord = await this.fileRepository.findById(fileId);

    if (!this.checkPolicy(user, fileRecord)) {
      this.throwError({
        message: `[BookmarkImageReadingService] ファイルを読み込む権限がありません。`,
        code: ERROR_CODES.notAllowed,
      });
    }

    const source = await this.bookmarkImageStorage.read({
      file: fileRecord,
    });

    return source;
  }
}
