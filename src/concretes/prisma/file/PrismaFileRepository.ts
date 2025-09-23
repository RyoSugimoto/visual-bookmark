import { inject, injectable } from 'tsyringe';
import type { IDataAccessClientManager } from '@/concretes/shared/IDataAccessClientManager';
import { FileId, FileKey, FileSize, FileType } from '@/domains/models/file';
import FileRecord from '@/domains/models/file/File';
import type IFileRepository from '@/domains/models/file/IFileRepository';
import type { CreateCommand } from '@/domains/models/file/IFileRepository';
import { UserId } from '@/domains/models/user';
import type { PrismaClientType } from '../shared/PrismaClientType';

@injectable()
export default class PrismaFileRepository implements IFileRepository {
  constructor(
    @inject('DataAccessClientManager')
    private clientManager: IDataAccessClientManager<PrismaClientType>,
  ) {}

  async create({ userId, key, type, size }: CreateCommand) {
    const client = this.clientManager.getClient();

    try {
      const file = await client.file.create({
        data: {
          userId: userId.value,
          key: key.value,
          type: type.value,
          size: size.value,
        },
      });

      return FileRecord.create(
        new FileId(file.id),
        new UserId(file.userId),
        new FileKey(file.key),
        new FileType(file.type),
        new FileSize(file.size),
      );
    } catch (exception) {
      throw new Error(
        `[Prisma.file.create] ファイルレコードの作成に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async findById(id: FileId): Promise<FileRecord> {
    const client = this.clientManager.getClient();

    try {
      const file = await client.file.findUnique({
        where: {
          id: id.value,
        },
      });

      return FileRecord.create(
        new FileId(file.id),
        new UserId(file.userId),
        new FileKey(file.key),
        new FileType(file.type),
        new FileSize(file.size),
      );
    } catch (exception) {
      throw new Error(
        `[Prisma.file.findById] ファイルレコードの取得に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async findByKey(key: FileKey): Promise<FileRecord> {
    const client = this.clientManager.getClient();

    try {
      const file = await client.file.findUnique({
        where: {
          key: key.value,
        },
      });

      return FileRecord.create(
        new FileId(file.id),
        new UserId(file.userId),
        new FileKey(file.key),
        new FileType(file.type),
        new FileSize(file.size),
      );
    } catch (exception) {
      throw new Error(
        `[Prisma.file.findByKey] ファイルレコード取得に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async delete(id: FileId) {
    const client = this.clientManager.getClient();

    try {
      const file = await client.file.delete({
        where: {
          id: id.value,
        },
      });

      return new FileKey(file.key);
    } catch (exception) {
      throw new Error(
        `[Prisma.file.delete] ファイルレコードの削除に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }
}
