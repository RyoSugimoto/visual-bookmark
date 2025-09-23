import { type NextRequest, NextResponse } from 'next/server';
import { updateBookmark } from '@/actions/bookmark/bookmark-update-action/update-bookmark';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const actionResponse = await updateBookmark(formData);

  return new NextResponse(JSON.stringify(actionResponse));
}
