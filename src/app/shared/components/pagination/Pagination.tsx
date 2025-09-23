'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shadcn/button';

type PaginationProps = {
  numberOfAllItems: number;
  numberOfItemsOnPage: number;
  className?: string;
};

export default function Pagination({
  numberOfAllItems,
  numberOfItemsOnPage,
  className = '',
}: PaginationProps) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = searchParams.get('page')
    ? parseInt(searchParams.get('page'), 10)
    : 1;

  const prevParams = new URLSearchParams(searchParams.toString());
  const nextParams = new URLSearchParams(searchParams.toString());
  prevParams.set('page', String(currentPage - 1 || 1));
  nextParams.set('page', String(currentPage + 1));
  const prevUrl = `${pathname}?${prevParams.toString()}`;
  const nextUrl = `${pathname}?${nextParams.toString()}`;

  const numberOfPages = Math.ceil(numberOfAllItems / numberOfItemsOnPage);

  if (currentPage <= 1 && currentPage >= numberOfPages) {
    // 1ページしかない場合はページネーションを表示しない。
    return;
  }

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-4 ${className}`}
    >
      <Button
        disabled={currentPage <= 1}
        type="button"
        onClick={() => {
          router.push(prevUrl);
          // location.href = prevUrl; // フルリロード
        }}
      >
        <ArrowLeft size="1em" />
        前のページ
      </Button>
      <Button
        disabled={currentPage >= numberOfPages}
        type="button"
        onClick={() => {
          router.push(nextUrl);
          // location.href = nextUrl; // フルリロード
        }}
      >
        次のページ
        <ArrowRight size="1em" />
      </Button>
      <div className="basis-full grow text-center">{`現在のページ: ${currentPage} / ${numberOfPages}`}</div>
    </div>
  );
}
