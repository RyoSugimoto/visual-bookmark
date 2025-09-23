import { Dto } from '@/actions/shared';
import type { Bookmark } from '@/domains/models/bookmark';
import type { BookmarkResponse } from '@/schema/bookmark';

export default class BookmarkDto extends Dto<Bookmark, BookmarkResponse> {
  static create(bookmark: Bookmark) {
    return new BookmarkDto(bookmark);
  }

  toObject(): BookmarkResponse {
    const { id, url, title, description, imageFileId } = this.entity;

    return {
      id: id.value,
      url: url.value,
      title: title.value,
      description: description?.value || '',
      imageId: imageFileId?.value || '',
    };
  }
}
