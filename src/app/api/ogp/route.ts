import { type NextRequest, NextResponse } from 'next/server';
import { fetchOgp } from '@/actions/ogp-fetch-action/fetch-ogp';
import type { RouteContext } from '@/app/shared/types/next';
import { HTTP_STATUS_CODES } from '@/utils';

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { url } = await params;

  if (!url) {
    return new NextResponse(null, { status: HTTP_STATUS_CODES.badRequest });
  }

  const decodedUrl = decodeURIComponent(url.toString());

  const actionResponse = await fetchOgp(decodedUrl);

  if (!actionResponse.success) {
    return new NextResponse(JSON.stringify(actionResponse), {
      status: HTTP_STATUS_CODES.internalServerError,
    });
  }

  return new NextResponse(JSON.stringify(actionResponse), {
    status: HTTP_STATUS_CODES.ok,
  });
}
