import '@/di';
import { type NextRequest, NextResponse } from 'next/server';
import { deleteBookmark } from '@/actions/bookmark/bookmark-deletion-action/delete-bookmark';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const actionResponse = await deleteBookmark(formData);

  return new NextResponse(JSON.stringify(actionResponse));
}
