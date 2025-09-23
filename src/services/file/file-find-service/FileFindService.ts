import { inject, injectable } from 'tsyringe';
import type { FileId, File as FileRecord } from '@/domains/models/file';
import type IFileRepository from '@/domains/models/file/IFileRepository';
import Service from '@/services/shared/Service';

const PREFIX = 'file-find';

const ERROR_CODES = {
  failure: `${PREFIX}-failure`,
} as const;

type Command = {
  fileId: FileId;
};

@injectable()
export default class FileFindService extends Service<Command, FileRecord> {
  constructor(
    @inject('FileRepository')
    private fileRepository: IFileRepository,
  ) {
    super();
  }

  public execute({ fileId }: Command): FileRecord | Promise<FileRecord> {
    try {
      const fileRecord = this.fileRepository.findById(fileId);

      return fileRecord;
    } catch (exception) {
      this.throwError({
        message: `[FileFindService] 詳細: ${exception.message || ''}`,
        code: ERROR_CODES.failure,
      });
    }
  }
}
