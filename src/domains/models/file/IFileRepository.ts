import type { UserId } from '../user';
import type { FileId, FileKey, FileSize, FileType } from '.';
import type FileRecord from './File';

export interface CreateCommand {
  userId: UserId;
  key: FileKey;
  type: FileType;
  size: FileSize;
}

export default interface IFileRepository {
  create(command: CreateCommand): Promise<FileRecord>;

  findById(id: FileId): Promise<FileRecord>;

  findByKey(key: FileKey): Promise<FileRecord>;

  delete(id: FileId): Promise<FileKey>;
}
