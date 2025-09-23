'use client';

import { useState } from 'react';
import type z from 'zod';
import { ConfirmDialog, useConfirm } from '@/components/common/confirm-dialog';
import type { ogpDataSchema } from '@/schema';
import { fetcher } from '@/utils/fetcher';

type OgpData = z.infer<typeof ogpDataSchema>;

type OgpFetcherProps = {
  url: string;
  getUrl(): string;
  /** 適用前に確認ダイアログを表示する条件 */
  toConfirm?(): boolean;
  onSuccess?(ogpData: OgpData): void;
  onError?(message: string): void;
  endpoint?: string | URL;
  className?: string;
  timeout?: number;
};

export default function OgpFetcher({
  url,
  getUrl,
  toConfirm = () => false,
  onSuccess,
  onError,
  endpoint = `/api/ogp`,
  className = '',
  timeout = 10 * 1000,
}: OgpFetcherProps) {
  const { confirm, isOpen, handleCancel, handleConfirm, message } =
    useConfirm();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  return (
    <>
      <ConfirmDialog
        title="入力情報の上書き"
        description={message}
        open={isOpen}
        action={handleConfirm}
        cancelLabel="キャンセル"
        actionLabel="上書きする"
        cancel={handleCancel}
      />

      <div className={`flex items-center gap-4 ${className}`}>
        <button
          className={`text-link underline p-0 border-0 bg-none inline-block disabled:opacity-50 text-sm`}
          type="button"
          disabled={isPending}
          onClick={async event => {
            event.preventDefault();

            setStatusMessage('');
            setHasError(false);

            if (
              toConfirm() &&
              !(await confirm('現在の入力内容を上書きしても良いですか？'))
            ) {
              return;
            }

            setIsPending(true);
            setStatusMessage('情報を取得中...');

            try {
              const result = await fetcher.get<OgpData>(endpoint, {
                params: { url },
                timeout,
              });

              if (!result.success) {
                throw new Error();
              }

              if (typeof onSuccess === 'function') {
                onSuccess(result.data);
              }

              setStatusMessage('');
              setHasError(false);
            } catch {
              if (typeof onError === 'function') {
                onError('情報の取得に失敗しました。');
              }

              setStatusMessage('情報の取得に失敗しました。');
              setHasError(true);
            } finally {
              setIsPending(false);
            }
          }}
        >
          OGPから情報を取得
        </button>

        <p className={`${hasError ? 'text-accent' : ''}`}>{statusMessage}</p>
      </div>
    </>
  );
}
