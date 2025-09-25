import '@/di';
import { type NextRequest, NextResponse } from 'next/server';
import { createBookmark } from '@/actions/bookmark/bookmark-creation-action/create-bookmark';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const actionResponse = await createBookmark(formData);

  return new NextResponse(JSON.stringify(actionResponse));
}
