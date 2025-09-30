import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBookmarkImageUrl } from '@/actions/storage/bookmark-image-url-action/get-bookmark-image-url';
import type { RouteContext } from '@/app/shared/types/next';

export default async function ImagePage({ params }: RouteContext) {
  const { imageId } = (await params) as Record<string, string>;

  const response = await getBookmarkImageUrl(imageId);

  if (!response.success) {
    notFound();
  }

  return (
    <div className="p-4">
      <Image
        src={response.data}
        alt=""
        title=""
        width={480}
        height={480}
        className="w-auto h-auto mx-auto block"
      />
    </div>
  );
}
