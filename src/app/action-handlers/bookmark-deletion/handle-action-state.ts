import { redirect } from 'next/navigation';
import {
  deleteBookmark,
  FIELD_NAMES,
  PREFIX,
} from '@/actions/bookmark/bookmark-deletion-action';
import type { HandleActionState } from '@/app/action-handlers/shared';
import type { State } from './schema';

export const handleActionState: HandleActionState<State, FormData> = async (
  _prevState,
  formData,
): Promise<State> => {
  const bookmarkId = formData.get(FIELD_NAMES.id) as string;

  const response = await deleteBookmark(formData);

  if (response.success === false) {
    return {
      status: 'error',
      input: { [FIELD_NAMES.id]: bookmarkId },
      errorCode: response.errorCode,
    };
  }

  if (response.success === true) {
    const params = new URLSearchParams();
    params.append(`${PREFIX}`, 'success');
    params.append(`${PREFIX}-result`, bookmarkId);

    redirect(`/?${params.toString()}`);
  }

  return {
    status: 'default',
  };
};

export default handleActionState;
