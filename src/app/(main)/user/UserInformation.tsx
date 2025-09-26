'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Message } from '@/components/common';
import { FormItem, FormStack } from '@/components/form';
import { Button } from '@/components/lib/shadcn/ui/button';
import { Input } from '@/components/lib/shadcn/ui/input';
import { Label } from '@/components/lib/shadcn/ui/label';
import {
  ERROR_CODES,
  type ErrorCode,
  FIELD_NAMES,
} from '@/schema/user/user-update-schema';
import { fetcher } from '@/utils/fetcher';

type UserInformationProps = {
  formId: string;
  email: string;
  userName?: string;
  hasCredentials: boolean;
};

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  'user-update-failure': '更新に失敗しました。',
};

export default function UserInformation(props: UserInformationProps) {
  const [editable, setEditable] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(props.email || '');
  const [userName, setUserName] = useState<string>(props.userName || '');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  function Row({ children }) {
    return (
      <div className="first:border-0 first:pt-0 pt-4 border-t-1 grid gap-4 grid-cols-2">
        {children}
      </div>
    );
  }

  function Title({ children }) {
    return <dt className="">{children}</dt>;
  }

  function Data({ children }) {
    return <dd className="">{children}</dd>;
  }

  return (
    <>
      <h1 className="text-xl mb-8">アカウント情報</h1>

      <div>
        {(editable && (
          <form
            onSubmit={async event => {
              event.preventDefault();

              setDisabled(true);

              const formData = new FormData();

              formData.append(FIELD_NAMES.email, email);
              formData.append(FIELD_NAMES.name, userName);

              // const response = await fetcher.post(
              //   `/api/user-update/`,
              //   formData,
              // );
              const { success, data } = {
                success: true,
                data: {
                  data: Object.fromEntries(formData.entries()),
                  errorCode: ERROR_CODES.failure,
                },
              };

              setDisabled(false);

              if (!success) {
                console.log(data.data);

                setMessage(
                  data.errorCode
                    ? ERROR_MESSAGES[data.errorCode]
                    : ERROR_CODES.failure,
                );

                return;
              }

              setEditable(false);
              router.refresh();
            }}
          >
            <FormStack>
              <FormItem>
                <Label>ユーザー名</Label>
                <Input
                  type="text"
                  value={userName}
                  onChange={event => setUserName(event.target.value)}
                />
              </FormItem>
              <FormItem>
                <Label>メールアドレス</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </FormItem>
              <FormItem>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={disabled}>
                    更新する
                  </Button>
                  <Button
                    type="button"
                    onClick={event => {
                      event.preventDefault();

                      setEditable(false);
                    }}
                    variant="outline"
                  >
                    更新を取り消す
                  </Button>
                </div>

                <Message message={message} variant="error" />
              </FormItem>
            </FormStack>
          </form>
        )) || (
          <div>
            <dl className="grid gap-4">
              <Row>
                <Title>ユーザー名</Title>
                <Data>{props.userName || '未設定'}</Data>
              </Row>
              <Row>
                <Title>メールアドレス</Title>
                <Data>{props.email}</Data>
              </Row>
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={event => {
                    event.preventDefault();

                    setEditable(true);
                  }}
                  variant="outline"
                >
                  アカウント情報を編集する
                </Button>
              </div>
            </dl>
          </div>
        )}
      </div>
    </>
  );
}
