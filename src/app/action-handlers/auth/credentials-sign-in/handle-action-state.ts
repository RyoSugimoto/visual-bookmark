'use server';

import '@/di';
import { redirect } from 'next/navigation';
import { signInWithCredentials } from '@/actions/auth/credentials-sign-in-action/sign-in-with-credentials';
import type {
  ActionState,
  HandleActionState,
} from '@/app/action-handlers/shared';
import type {
  ErrorCode,
  ResponseData,
} from '@/schema/auth/credentials-sign-in-schema';

export const handleActionState: HandleActionState<
  ActionState<ResponseData, ErrorCode>,
  FormData
> = async (prevState, formData) => {
  const actionResponse = await signInWithCredentials(formData);

  if (!actionResponse.success) {
    return {
      status: 'error',
      input: prevState.data,
      errorCode: actionResponse.errorCode,
    };
  }

  redirect(`/`);
};
