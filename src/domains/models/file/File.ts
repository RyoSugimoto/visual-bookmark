import type { UserId } from '../user';
import type FileId from './file-id/FileId';
import type FileKey from './file-key/FileKey';
import type FileSize from './file-size/FileSize';
import type FileType from './file-type/FileType';

export default class File {
  constructor(
    public readonly id: FileId,
    public readonly userId: UserId,
    public readonly key: FileKey,
    public readonly type: FileType,
    public readonly size: FileSize,
  ) {}

  static create(
    id: FileId,
    userId: UserId,
    key: FileKey,
    type: FileType,
    size: FileSize,
  ) {
    return new File(id, userId, key, type, size);
  }
}
