import { inject, injectable } from 'tsyringe';
import type IBookmarkRepository from '@/domains/models/bookmark/IBookmarkRepository';
import type { UserId } from '@/domains/models/user';

interface Command {
  userId: UserId;
  limit: number;
  orderByKey: 'createdAt' | 'title';
  orderByWay: 'desc' | 'asc';
  page: number;
}

@injectable()
export default class BookmarkListService {
  constructor(
    @inject('BookmarkRepository')
    private repository: IBookmarkRepository,
  ) {}

  async execute(command: Command) {
    const { userId, limit, orderByKey, orderByWay, page } = command;

    const bookmarks = await this.repository.list({
      userId,
      limit,
      orderByKey,
      orderByWay,
      page,
    });

    return bookmarks;
  }
}
