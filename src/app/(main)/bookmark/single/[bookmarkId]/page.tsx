import { Edit, ExternalLink, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findBookmarkById } from '@/actions/bookmark/bookmark-find-action/find-bookmark-by-id';
import { getBookmarkImageUrl } from '@/actions/storage/bookmark-image-url-action/get-bookmark-image-url';
import type { RouteContext } from '@/app/shared/types/next';
import { Button } from '@/components/lib/shadcn/ui/button';

export default async function Page({ params }: RouteContext) {
  const { bookmarkId } = (await params) as Record<string, string>;

  const actionResponse = await findBookmarkById({
    bookmarkId,
  });

  if (!actionResponse.success) {
    notFound();
  }

  const { url, title, description, imageId } = actionResponse.data;

  const imageUrl = imageId ? await getBookmarkImageUrl(imageId) : null;

  return (
    <article className="grid gap-8 items-start max-w-screen-lg mx-auto md:grid-cols-2">
      {(imageUrl?.success && (
        <Link href={`/gallery/bookmark/${imageId}`}>
          <Image
            className="block w-auto mx-auto max-h-svh max-w-full"
            src={imageUrl.data}
            alt=""
            title={title}
            width={480}
            height={480}
          />
        </Link>
      )) || <div>画像が設定されていません。</div>}

      <div className="grid gap-6">
        <header className="grid gap-2">
          <h1 className="text-xl">{title || 'タイトルなし'}</h1>
          <a
            href={url}
            title={url}
            target="_blank"
            className="flex gap-2 items-center text-xs leading-normal break-all px-2 py-1 hover:bg-neutral-700 focus-within:bg-neutral-700 rounded-sm overflow-hidden text-link transition-colors"
          >
            <LinkIcon size="1em" className="shrink-0" />
            <span className="text-ellipsis whitespace-nowrap overflow-hidden shrink grow">
              {url}
            </span>
          </a>
        </header>
        <div>{description || '説明なし'}</div>
        <div className="flex flex-wrap gap-4">
          <Button asChild className="grow">
            <a href={url} target="_blank" className="flex items-center">
              <ExternalLink size="1em" />
              リンク先ページを開く
            </a>
          </Button>
          <Button variant="outline" asChild className="grow">
            <Link href={`/bookmark/edit/${bookmarkId}`}>
              <Edit size="1em" />
              登録内容を編集する
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
