import { findBookmarkById } from '@/actions/bookmark/bookmark-find-action/find-bookmark-by-id';
import { getBookmarkImageUrl } from '@/actions/storage/bookmark-image-url-action/get-bookmark-image-url';
import { createUuidV4 } from '@/utils';
import BookmarkUpdateForm from '../BookmarkUpdateForm';

export default async function Page({ params }) {
  const { bookmarkId } = await params;

  const response = await findBookmarkById({
    bookmarkId,
  });

  if (!response.success) {
    return <div>ページが存在しません。</div>;
  }

  const { url, title, description, imageId } = response.data;

  const imageUrl = await (async () => {
    const response = await getBookmarkImageUrl(imageId);

    if (response.success) {
      return response.data;
    }

    return null;
  })();

  return (
    <div>
      <BookmarkUpdateForm
        formId={createUuidV4()}
        bookmarkId={bookmarkId}
        init={{
          url,
          title,
          description,
          imageUrl: imageUrl ? imageUrl : '',
        }}
      />
    </div>
  );
}
