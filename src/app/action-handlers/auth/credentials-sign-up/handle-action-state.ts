'use server';

import { redirect } from 'next/navigation';
import { signUpWithCredentials } from '@/actions/auth/credentials-sign-up-action';
import type { HandleActionState } from '../shared';
import type { State } from './schema';

export const handleActionState: HandleActionState<State, FormData> = async (
  prevState,
  formData,
): Promise<State> => {
  const response = await signUpWithCredentials(formData);

  if (!response.success) {
    return {
      success: false,
      inputs: prevState.success === false ? prevState.inputs : {},
      errorCode: response.errorCode,
    };
  }

  redirect(`/`);
};
