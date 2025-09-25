'use server';

import '@/di';
import { redirect } from 'next/navigation';
import { signUpWithCredentials } from '@/actions/auth/credentials-sign-up-action/sign-up-with-credentials';
import type {
  ActionState,
  HandleActionState,
} from '@/app/action-handlers/shared';
import type {
  ErrorCode,
  ResponseData,
} from '@/schema/auth/credentials-sign-up-schema';

export const handleActionState: HandleActionState<
  ActionState<ResponseData, ErrorCode>,
  FormData
> = async (prevState, formData) => {
  const response = await signUpWithCredentials(formData);

  if (!response.success) {
    return {
      status: 'error',
      input: prevState.data,
      errorCode: response.errorCode,
    };
  }

  redirect(`/`);
};
