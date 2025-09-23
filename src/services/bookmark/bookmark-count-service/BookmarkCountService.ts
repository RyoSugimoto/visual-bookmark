import { inject, injectable } from 'tsyringe';
import type IBookmarkRepository from '@/domains/models/bookmark/IBookmarkRepository';
import type { UserId } from '@/domains/models/user';
import Service from '@/services/shared/Service';

interface Command {
  userId: UserId;
}

@injectable()
export default class BookmarkCountService extends Service<
  Command,
  Promise<number>
> {
  constructor(
    @inject('BookmarkRepository')
    private bookmarkRepository: IBookmarkRepository,
  ) {
    super();
  }

  async execute({ userId }: Command): Promise<number> {
    const count = await this.bookmarkRepository.count({
      userId,
    });

    return count;
  }
}
