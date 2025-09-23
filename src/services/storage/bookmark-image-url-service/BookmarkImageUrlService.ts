import { inject, injectable } from 'tsyringe';
import type { Url } from '@/domains/models';
import type { FileId, File as FileRecord } from '@/domains/models/file';
import type IFileRepository from '@/domains/models/file/IFileRepository';
import type { User } from '@/domains/models/user';
import type IStorageAdapter from '@/services/shared/IStorageAdapter';
import ServiceWithPolicy from '@/services/shared/ServiceWithPolicy';

const PREFIX = 'bookmark-image-url';

const ERROR_CODES = {
  notAllowed: `${PREFIX}-not-allowed`,
} as const;

@injectable()
export default class BookmarkImageUrlService extends ServiceWithPolicy<
  { user: User; fileId: FileId },
  Promise<Url>,
  FileRecord,
  (typeof ERROR_CODES)[keyof typeof ERROR_CODES]
> {
  constructor(
    @inject('FileRepository')
    private fileRepository: IFileRepository,
    @inject('BookmarkImageStorageAdapter')
    private storageAdapter: IStorageAdapter,
  ) {
    super();
  }

  protected checkPolicy(user: User, file: FileRecord): boolean {
    return user.id.equals(file.userId);
  }

  public async execute({ user, fileId }: { user: User; fileId: FileId }) {
    const fileRecord = await this.fileRepository.findById(fileId);

    if (!this.checkPolicy(user, fileRecord)) {
      this.throwError({
        message: `[BookmarkImageUrlService] ファイルを参照する権限がありません。`,
        code: ERROR_CODES.notAllowed,
      });
    }

    const url = await this.storageAdapter.getPresignedUrl({
      file: fileRecord,
    });

    return url;
  }
}
