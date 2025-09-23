'use server';

import { redirect } from 'next/navigation';
import { signInWithCredentials } from '@/actions/auth/credentials-sign-in-action';
import type { HandleActionState } from '../shared';
import type { State } from './schema';

export const handleActionState: HandleActionState<State, FormData> = async (
  prevState,
  formData,
): Promise<State> => {
  const response = await signInWithCredentials(formData);

  if (!response.success) {
    return {
      success: false,
      inputs: prevState.success === false ? prevState.inputs : {},
      errorCode: response.errorCode,
    };
  }

  redirect(`/`);
};
