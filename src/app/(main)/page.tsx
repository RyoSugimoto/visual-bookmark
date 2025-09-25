import type { Metadata } from 'next';
import { RedirectType, redirect } from 'next/navigation';
import { countBookmarks } from '@/actions/bookmark/bookmark-count-action/count-bookmarks';
import { getBookmarkList } from '@/actions/bookmark/bookmark-list-action/get-bookmark-list';
import { getBookmarkImageUrl } from '@/actions/storage/bookmark-image-url-action/get-bookmark-image-url';
import { BookmarkList } from '@/app/shared/components/bookmark-list';
import { Pagination } from '@/app/shared/components/pagination';
import type { PageProps } from '@/app/shared/types/next';
import { getBookmarkListCommandSchema } from '@/schema/bookmark/bookmark-list-schema';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `ブックマーク一覧 | Visual Bookmark`,
    openGraph: {
      images: [],
    },
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const {
    success,
    data: { limit, orderByKey, orderByWay, page },
  } = getBookmarkListCommandSchema.safeParse(params);

  if (!success) {
    redirect(`/`, RedirectType.replace);
  }

  const response = await getBookmarkList({
    limit,
    orderByKey,
    orderByWay,
    page,
  });

  if (response.success === false) {
    return (
      <div className="grid place-items-center">
        データの取得に失敗しました。
      </div>
    );
  }

  const {
    data: { count },
  } = await countBookmarks();

  const bookmarkPromises = response.data.bookmarks.map(async bookmark => {
    if (!bookmark.imageId) {
      return bookmark;
    }

    const { data } = await getBookmarkImageUrl(bookmark.imageId);

    return { ...bookmark, imageUrl: data };
  });

  const bookmarks = await Promise.all(bookmarkPromises);

  return (
    <>
      <BookmarkList bookmarks={bookmarks} />

      <Pagination
        className="my-12"
        numberOfAllItems={count}
        numberOfItemsOnPage={limit}
      />
    </>
  );
}
