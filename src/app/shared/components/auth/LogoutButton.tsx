'use client';

import { useActionState } from 'react';
import { handleActionState } from '@/app/action-handlers/auth/sign-out/handle-action-state';
import { Message } from '@/components/common';
import type { ErrorCode } from '@/schema/auth/sign-out-schema';
import { Button } from '@/shadcn/button';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  'sign-out-failure': 'ログアウトに失敗しました。',
} as const;

export default function LogoutButton() {
  const [state, action, isPending] = useActionState<
    ReturnType<typeof handleActionState>,
    null
  >(handleActionState, {
    status: 'default',
  });

  return (
    <div>
      <form action={action}>
        <Button type="submit" disabled={isPending} variant="outline">
          ログアウトする
        </Button>
      </form>

      <Message
        message={
          (state.status === 'error' && ERROR_MESSAGES[state.errorCode]) || ''
        }
      />
    </div>
  );
}
