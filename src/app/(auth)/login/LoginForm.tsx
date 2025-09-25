'use client';

import { LogIn, Send } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { handleActionState } from '@/app/action-handlers/auth/credentials-sign-in/handle-action-state';
import { handleSignInWithGoogle } from '@/app/action-handlers/auth/google-sign-in/handle-action';
import { handleSignInWithMagicLink } from '@/app/action-handlers/auth/magic-link-sign-in/handle-action';
import { Message } from '@/components/common';
import {
  FormItem,
  FormSectionHeading,
  FormStack,
  FormWrapper,
} from '@/components/form';
import type { ErrorCode } from '@/schema/auth/credentials-sign-in-schema';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';
import { Separator } from '@/shadcn/separator';
import { createUuidV4 } from '@/utils';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  'credentials-sign-in-no-credentials': '資格情報が無効です。',
  'credentials-sign-in-failure':
    '認証に失敗しました。時間を空けてもう一度お試しください。',
};

type LoginFormProps = {
  init?: {
    email?: string;
  };
};

export default function LoginForm({ init = {} }: LoginFormProps) {
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
    state.status === 'error' ? state.data?.email || '' : '',
  );

  const [displayMessage, setDisplayMessage] = useState<boolean>(true);

  return (
    <FormWrapper
      title="ログインフォーム"
      description="下記のいずれかの方法でログインしてください。"
    >
      <div className="grid gap-6">
        <section>
          <FormSectionHeading className="mb-4">
            サービスアカウントでログイン
          </FormSectionHeading>
          <div>
            <form action={handleSignInWithGoogle}>
              <Button type="submit" className="gap-2">
                <FaGoogle />
                Googleアカウントでログイン
              </Button>
            </form>
          </div>
        </section>

        <Separator />

        <section>
          <FormSectionHeading className="mb-4">
            メールを受け取ってログイン
          </FormSectionHeading>
          <form action={handleSignInWithMagicLink}>
            <FormStack>
              <FormItem className="text-sm">
                送信されるメールの本文中のリンクからログインします。
              </FormItem>
              <FormItem>
                <Input
                  type="text"
                  name="email"
                  placeholder=""
                  autoComplete="email"
                />
              </FormItem>
              <FormItem>
                <Button type="submit" className="gap-2">
                  <Send size="1em" /> メールを送信
                </Button>
              </FormItem>
            </FormStack>
          </form>
        </section>

        <Separator />

        <section>
          <FormSectionHeading className="mb-4">
            メールアドレスとパスワードでログイン
          </FormSectionHeading>
          <p className="mb-4 text-sm">
            事前に「
            <Link href="/register" className="link">
              新規登録ページ
            </Link>
            」でアカウントの登録が必要です。
          </p>
          <form action={action}>
            <FormStack>
              <FormItem>
                <Label htmlFor={`${formId}-credentials-email`} className="mb-2">
                  メールアドレス
                </Label>
                <Input
                  id={`${formId}-credentials-email`}
                  type="text"
                  name="email"
                  placeholder="your-email@vbm.com"
                  autoComplete="email"
                  value={email}
                  onChange={event => {
                    setEmail(event.target.value);
                    setDisplayMessage(false);
                  }}
                />
              </FormItem>
              <FormItem>
                <Label
                  htmlFor={`${formId}-credentials-password`}
                  className="mb-2"
                >
                  パスワード
                </Label>
                <Input
                  id={`${formId}-credentials-password`}
                  type="password"
                  name="password"
                  autoComplete=""
                  placeholder=""
                  onChange={() => {
                    setDisplayMessage(false);
                  }}
                />
              </FormItem>
            </FormStack>

            <FormItem>
              <Button type="submit" disabled={isPending} className="gap-2">
                <LogIn size="1em" /> ログイン
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
            </FormItem>
          </form>
        </section>
      </div>
    </FormWrapper>
  );
}
