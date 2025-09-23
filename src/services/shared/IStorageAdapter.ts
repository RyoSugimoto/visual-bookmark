import type { Url } from '@/domains/models';
import type { FileKey } from '@/domains/models/file';
import type FileRecord from '@/domains/models/file/File';

export interface UploadCommand {
  file: File;
  key: FileKey;
}

export interface ReadCommand {
  file: FileRecord;
  options?: Record<string, unknown>;
}

export interface GetPresignedUrlCommand {
  file: FileRecord;
  /** URLの有効期限を秒単位で指定 */
  expires?: number;
  options?: Record<string, unknown>;
}

export default interface IStorageAdapter {
  /**
   * ファイルのデータを返す。
   */
  read(command: ReadCommand): Promise<ReadableStream>;

  /**
   * ストレージ内のファイルにアクセス可能なURLを発行して返す。
   */
  getPresignedUrl(command: GetPresignedUrlCommand): Promise<Url>;

  upload(command: UploadCommand): Promise<void>;

  delete(key: FileKey): Promise<boolean>;
}
