import '@/di';
import { type NextRequest, NextResponse } from 'next/server';
import { updateUser } from '@/actions/user/user-update-action/update-user';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const actionResponse = await updateUser(formData);

  return new NextResponse(JSON.stringify(actionResponse));
}
