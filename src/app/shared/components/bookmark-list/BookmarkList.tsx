'use client';

import { toast } from 'sonner';
import { CardList } from '@/components/common';
import { Toaster } from '@/shadcn/sonner';
import BookmarkItem, { type Bookmark } from './BookmarkItem';

type BookmarkListProps = {
  bookmarks: Bookmark[];
};

export default function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <>
      <Toaster />
      <CardList className="">
        {bookmarks.map(async bookmark => {
          return (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              handleDeletionError={({ message }) => {
                toast(`${message}`);
              }}
            />
          );
        })}
      </CardList>
    </>
  );
}
