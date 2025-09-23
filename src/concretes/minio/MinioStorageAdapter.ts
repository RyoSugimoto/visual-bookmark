import { Readable } from 'node:stream';
import { Url } from '@/domains/models';
import type { FileKey } from '@/domains/models/file';
import { minioClient } from '@/lib/minio';
import type IStorageAdapter from '@/services/shared/IStorageAdapter';
import type {
  GetPresignedUrlCommand,
  ReadCommand,
  UploadCommand,
} from '@/services/shared/IStorageAdapter';
import type { BucketSetting } from './shared/buckets';
import ensureBucketExists from './shared/ensure-bucket-exists';
import makeBucket from './shared/make-new-bucket';

export default class MinioStorageAdapter implements IStorageAdapter {
  constructor(
    private bucket: BucketSetting,
    private maxSize: number = 5 * 1024 * 1024, // 5MB
  ) {}

  async read({ file }: ReadCommand) {
    if (file.size.value > this.maxSize) {
      throw new Error(
        `[Minio.getSource] ファイルサイズが大きすぎます。サイズの上限は、${this.maxSize / (1024 * 1024)}MBです。`,
      );
    }

    try {
      const bucket = this.bucket.name;
      const stream = await minioClient.getObject(bucket, file.key.value);
      const streamForWeb = Readable.toWeb(stream) as ReadableStream;

      return streamForWeb;
    } catch (exception) {
      throw new Error(
        `[Minio.getSource] ファイルの取得に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async getPresignedUrl({ file, expires = 5 * 60 }: GetPresignedUrlCommand) {
    const bucket = this.bucket.name;

    try {
      const presignedUrl = await minioClient.presignedGetObject(
        bucket,
        file.key.value,
        expires,
      );

      return new Url(presignedUrl);
    } catch (exception) {
      throw new Error(
        `[Minio.getUrl] ファイルの公開URLの発行に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async upload({ file, key }: UploadCommand) {
    try {
      const exists = await ensureBucketExists(this.bucket.name);

      if (!exists) {
        await makeBucket(this.bucket);
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      await minioClient.putObject(
        this.bucket.name,
        key.value,
        buffer,
        file.size,
        {
          'Content-Type': file.type,
        },
      );
    } catch (exception) {
      throw new Error(
        `[Minio.upload] ファイルのアップロードに失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async delete(key: FileKey) {
    try {
      await minioClient.removeObject(this.bucket.name, key.value);

      return true;
    } catch (exception) {
      throw new Error(
        `[Minio.delete] ファイルの削除に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }
}
