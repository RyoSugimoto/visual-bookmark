'use server';

import '@/di';
import { redirect } from 'next/navigation';
import { signOut } from '@/actions/auth/sign-out-action/sign-out';
import type {
  ActionState,
  HandleActionState,
} from '@/app/action-handlers/shared';
import type { ErrorCode } from '@/schema/auth/sign-out-schema';

export const handleActionState: HandleActionState<
  ActionState<null, ErrorCode>,
  null
> = async () => {
  const actionResponse = await signOut();

  if (actionResponse.success) {
    redirect(`/login`);
  }

  return {
    status: 'error',
    errorCode: actionResponse.errorCode,
  };
};
