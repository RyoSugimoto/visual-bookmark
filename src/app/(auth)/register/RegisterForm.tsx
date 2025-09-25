'use client';

import { Check } from 'lucide-react';
import { useActionState, useState } from 'react';
import { handleActionState } from '@/app/action-handlers/auth/credentials-sign-up/handle-action-state';
import { Message } from '@/components/common';
import { FormItem, FormStack, FormWrapper } from '@/components/form';
import type { ErrorCode } from '@/schema/auth/credentials-sign-up-schema';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';
import { createUuidV4 } from '@/utils';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  'credentials-sign-up-input-omission':
    'すべてのフィールドを入力してください。',
  'credentials-sign-up-user-existing':
    'このメールアドレスは既に登録されています。',
  'credentials-sign-up-invalid-password': `パスワードは文字以上に設定してください。`,
  'credentials-sign-up-invalid-email-address':
    '有効なメールアドレスを入力してください。',
  'credentials-sign-up-failure':
    '登録に失敗しました。時間を空けてもう一度お試しください。',
};

type RegisterFormProps = {
  init?: {
    email?: string;
  };
};

export default function RegisterForm({ init = {} }: RegisterFormProps) {
  const formId = createUuidV4();

  const [state, action, isPending] = useActionState<
    ReturnType<typeof handleActionState>,
    FormData
  >(handleActionState, {
    status: 'default',
    data: {
      email: init?.email || '',
    },
  });

  const [email, setEmail] = useState<string>(
    state.status === 'error' ? state.data.email : '',
  );

  const [displayMessage, setDisplayMessage] = useState<boolean>(true);

  return (
    <FormWrapper
      title="新規ユーザー登録フォーム"
      description="すべてのフィールドを入力し「新規登録」ボタンを押してください。"
    >
      <form action={action}>
        <FormStack>
          <FormItem>
            <Label htmlFor={`${formId}-email`}>メールアドレス</Label>
            <Input
              name="email"
              type="email"
              id={`${formId}-email`}
              autoComplete="email"
              placeholder=""
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor={`${formId}-password`}>パスワード</Label>
            <Input
              name="password"
              type="password"
              id={`${formId}-password`}
              autoComplete=""
            />
          </FormItem>

          <div>
            <Button className="gap-2" type="submit" disabled={isPending}>
              <Check size="1em" /> 新規登録
            </Button>

            <Message
              className="py-2"
              message={
                displayMessage && state.status === 'error'
                  ? ERROR_MESSAGES[state.errorCode]
                  : ''
              }
              handleClose={() => setDisplayMessage(false)}
              variant="error"
            />
          </div>
        </FormStack>
      </form>
    </FormWrapper>
  );
}
