import '@/di';
import { type NextRequest, NextResponse } from 'next/server';
import { readBookmarkImage } from '@/actions/storage/bookmark-image-reading-action/read-bookmark-image';
import type { RouteContext } from '@/app/shared/types/next';
import { HTTP_STATUS_CODES } from '@/utils';

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse<ReadableStream>> {
  const { fileId } = await params;

  if (!fileId) {
    return new NextResponse('Bad request', {
      status: HTTP_STATUS_CODES.badRequest,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const response = await readBookmarkImage(fileId.toString());

  if (!response.success) {
    return new NextResponse('Not found', {
      status: HTTP_STATUS_CODES.notFound,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  return new NextResponse(response.data.source, {
    status: HTTP_STATUS_CODES.ok,
    headers: {
      'Content-Type': response.data.type,
      /**
       * `Cache-Control`
       * * `'no-store'` : キャッシュを残さない
       * * `'public, max-age=<期限>'`: キャッシュの期限を設定
       */
      'Cache-Control': 'no-store',
    },
  });
}
