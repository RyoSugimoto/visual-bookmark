'use client';

import { LogIn, Send } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import {
  type CredentialsSignInErrorCode as ErrorCode,
  handleActionStateCredentialsSignIn as handleActionState,
  handleSignInWithGoogle,
  handleSignInWithMagicLink,
  type CredentialsSignInState as State,
} from '@/app/action-handlers/auth';
import { Message } from '@/components/common';
import {
  FormItem,
  FormSectionHeading,
  FormStack,
  FormWrapper,
} from '@/components/form';
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
    email: string;
  };
};

export default function LoginForm({ init }: LoginFormProps) {
  const formId = createUuidV4();

  const [state, action, isPending] = useActionState<State, FormData>(
    handleActionState,
    {
      success: false,
      inputs: {
        email: init?.email || '',
      },
      errorCode: null,
    },
  );

  const [email, setEmail] = useState<string>(
    state.success === false ? state.inputs?.email || '' : '',
  );

  const [message, setMessage] = useState<string>(
    state.success === false ? ERROR_MESSAGES[state.errorCode] : '',
  );

  useEffect(() => {
    if (state.success === false) {
      setMessage(ERROR_MESSAGES[state.errorCode]);
    }
  }, [state]);

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
                    setMessage('');
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
                    setMessage('');
                  }}
                />
              </FormItem>
            </FormStack>

            <FormItem>
              <Message
                className="py-2"
                message={message}
                handleClose={() => setMessage('')}
                variant="error"
              />
              <Button type="submit" disabled={isPending} className="gap-2">
                <LogIn size="1em" /> ログイン
              </Button>
            </FormItem>
          </form>
        </section>
      </div>
    </FormWrapper>
  );
}
