import { type NextRequest, NextResponse } from 'next/server';
import { getBookmarkImageUrl } from '@/actions/storage/bookmark-image-url-action/get-bookmark-image-url';
import type { RouteContext } from '@/app/shared/types/next';
import { HTTP_STATUS_CODES } from '@/utils';

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse<string | string[]>> {
  const { fileId } = await params;

  if (!fileId) {
    return new NextResponse('Bad request', {
      status: HTTP_STATUS_CODES.badRequest,
    });
  }

  if (typeof fileId === 'string') {
    const actionResponse = await getBookmarkImageUrl(fileId);

    if (!actionResponse.success) {
      return new NextResponse(actionResponse.data, {
        status: HTTP_STATUS_CODES.internalServerError,
      });
    }

    return new NextResponse(actionResponse.data, {
      status: HTTP_STATUS_CODES.ok,
    });
  } else if (Array.isArray(fileId)) {
    const promises = fileId.map(id => {
      return getBookmarkImageUrl(id);
    });
    const results = await Promise.all(promises);
    const urls = results.map(result => result.data);

    return new NextResponse(JSON.stringify(urls), {
      status: HTTP_STATUS_CODES.ok,
    });
  } else {
    return new NextResponse('Bad request', {
      status: HTTP_STATUS_CODES.badRequest,
    });
  }
}
