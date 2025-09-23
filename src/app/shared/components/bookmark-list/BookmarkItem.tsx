'use client';

import { Edit, Trash2 as Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CardListItem, ImagePlaceholder } from '@/components/common';
import {
  type ErrorCode,
  FIELD_NAMES,
} from '@/schema/bookmark/bookmark-deletion-schema';
import type { BookmarkResponse } from '@/schema/bookmark/bookmark-schema';
import { generateBookmarkImageUrl } from '@/utils';
import { fetcher } from '@/utils/fetcher';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  'bookmark-deletion-failure': 'ブックマークの削除に失敗しました。',
  'bookmark-deletion-input-omission': 'ブックマークの削除に失敗しました。',
  'bookmark-deletion-not-found': 'ブックマークが見つかりません。',
  'bookmark-deletion-unauthorized': 'ブックマークを削除する権限がありません。',
} as const;

export type Bookmark = BookmarkResponse & {
  imageUrl?: string;
};

type BookmarkItemProps = {
  bookmark: Bookmark;
  handleDeletionError?(info: {
    message: (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
  }): void;
};

export default function BookmarkItem({
  bookmark,
  handleDeletionError,
}: BookmarkItemProps) {
  const { id, title, url, description, imageId, imageUrl } = bookmark;

  const [deleting, setDeleting] = useState<boolean>(false);

  return (
    <CardListItem gap="sm" className="relative">
      <div className="w-full">
        {((imageId || imageUrl) && (
          <Image
            src={imageUrl ? imageUrl : generateBookmarkImageUrl(imageId)}
            alt=""
            width={480}
            height={480}
            unoptimized
            className="w-full aspect-square object-cover"
          />
        )) || <ImagePlaceholder>{title}</ImagePlaceholder>}
      </div>

      <div className="grid gap-4">
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
        <p className="text-xs break-all">{url}</p>
        <div className="z-20 flex gap-2">
          <Link
            href={`/bookmark/edit/${id}`}
            className="flex items-center gap-1"
          >
            <Edit size="1em" /> 編集
          </Link>
          <form
            onSubmit={async event => {
              event.preventDefault();

              const formData = new FormData();
              formData.append(FIELD_NAMES.id, id);

              setDeleting(true);

              const result = await fetcher.post(
                `/api/bookmark-deletion`,
                formData,
              );

              if (!result.success) {
                handleDeletionError({
                  message: ERROR_MESSAGES[result.data.errorCode],
                });
              }
            }}
          >
            <button
              type="submit"
              disabled={deleting}
              className="flex items-center gap-1"
            >
              <Trash size="1em" /> 削除
            </button>
          </form>
        </div>
      </div>

      <a
        className="absolute inset-0 z-10 focus-within:border-2 border-link"
        href={url}
        target="_blank"
      >
        <span className="sr-only">ブックマークされたページを開く</span>
      </a>
    </CardListItem>
  );
}
