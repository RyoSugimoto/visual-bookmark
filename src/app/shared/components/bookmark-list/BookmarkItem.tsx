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
      <div className="grid gap-2">
        <Link
          href={`/bookmark/single/${id}`}
          className="flex items-center gap-1"
        >
          {((imageId || imageUrl) && (
            <Image
              src={imageUrl ? imageUrl : generateBookmarkImageUrl(imageId)}
              alt=""
              title={title}
              width={480}
              height={480}
              unoptimized
              className="w-full aspect-square object-cover object-center"
            />
          )) || <ImagePlaceholder>{title}</ImagePlaceholder>}
        </Link>
        <div>
          <h2 className="text-sm px-2">
            <Link href={`/bookmark/single/${id}`}>{title}</Link>
          </h2>
        </div>
      </div>
    </CardListItem>
  );
}
