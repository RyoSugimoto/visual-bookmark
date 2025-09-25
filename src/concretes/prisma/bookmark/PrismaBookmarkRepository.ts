import { inject, injectable } from 'tsyringe';
import type { IDataAccessClientManager } from '@/concretes/shared/IDataAccessClientManager';
import { Bookmark, type BookmarkId } from '@/domains/models/bookmark';
import type IBookmarkRepository from '@/domains/models/bookmark/IBookmarkRepository';
import type { PrismaClientType } from '../shared/PrismaClientType';

@injectable()
export default class PrismaBookmarkRepository implements IBookmarkRepository {
  constructor(
    @inject('DataAccessClientManager')
    private clientManager: IDataAccessClientManager<PrismaClientType>,
  ) {}

  async create({ userId, url, title, imageFileId, description }) {
    const prisma = this.clientManager;
    const client = prisma.getClient();

    try {
      const bookmark = await client.bookmark.create({
        data: {
          userId: userId.value,
          url: url.value,
          title: title.value,
          imageFileId: imageFileId?.value,
          description: description?.value,
        },
      });

      return Bookmark.fromValues({
        id: bookmark.id,
        userId: bookmark.userId,
        url: bookmark.url,
        title: bookmark.title,
        imageFileId: bookmark.imageFileId,
        description: bookmark.description,
      });
    } catch (exception) {
      throw new Error(
        `[Prisma.bookmark.create] ブックマークの作成に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async list({ userId, limit, orderByKey, orderByWay, page }) {
    const client = this.clientManager.getClient();

    try {
      const bookmarks = await client.bookmark.findMany({
        where: {
          userId: userId.value,
        },
        orderBy: { [orderByKey]: orderByWay },
        skip: (page - 1) * limit,
        take: limit,
      });

      return bookmarks.map(
        ({ id, userId, url, title, imageFileId, description }) => {
          return Bookmark.fromValues({
            id,
            userId,
            url,
            title,
            imageFileId,
            description,
          });
        },
      );
    } catch (exception) {
      throw new Error(
        `[Prisma.bookmark.list] ブックマークの取得に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async findById(bookmarkId: BookmarkId): Promise<Bookmark> {
    const client = this.clientManager.getClient();

    try {
      const { id, userId, url, title, imageFileId, description } =
        await client.bookmark.findUnique({
          where: {
            id: bookmarkId.value,
          },
        });

      return Bookmark.fromValues({
        id,
        userId,
        url,
        title,
        imageFileId,
        description,
      });
    } catch (exception) {
      throw new Error(
        `[Prisma.bookmark.findById] ブックマークの取得に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async update({ id, url, title, description, imageFileId }) {
    const client = this.clientManager.getClient();

    const hasImage = imageFileId !== null;

    const data = {
      url: url.value,
      title: title.value,
      description: description.value,
      imageFileId: null,
    };

    if (hasImage) {
      data.imageFileId = imageFileId?.value || null;
    }

    const bookmark = await client.bookmark.update({
      where: {
        id: id.value,
      },
      data,
    });

    return Bookmark.fromValues({
      id: bookmark.id,
      userId: bookmark.userId,
      url: bookmark.url,
      title: bookmark.title,
      imageFileId: bookmark.imageFileId,
      description: bookmark.description,
    });
  }

  async delete(id: BookmarkId) {
    const client = this.clientManager.getClient();

    try {
      const { userId, url, title, imageFileId, description } =
        await client.bookmark.delete({
          where: {
            id: id.value,
          },
        });

      return Bookmark.fromValues({
        id: id.value,
        userId,
        url,
        title,
        imageFileId,
        description,
      });
    } catch (exception) {
      throw new Error(
        `[Prisma.bookmark.delete] ブックマークの削除に失敗しました。 詳細: ${exception.message || '不明'}`,
      );
    }
  }

  async count({ userId }) {
    const client = this.clientManager.getClient();

    const count = await client.bookmark.count({
      where: {
        userId: userId.value,
      },
    });

    return count;
  }
}
