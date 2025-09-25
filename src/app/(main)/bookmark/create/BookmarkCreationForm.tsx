'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { ActionResponseObject } from '@/actions/shared';
import { OgpFetcher } from '@/app/shared/components/ogp-fetcher';
import { Message } from '@/components/common';
import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import { FormItem, FormStack, FormWrapper } from '@/components/form';
import {
  type ErrorCode,
  FIELD_NAMES,
  type ResponseData,
} from '@/schema/bookmark/bookmark-creation-schema';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';
import { Textarea } from '@/shadcn/textarea';
import { fetcher } from '@/utils/fetcher';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  'bookmark-creation-unauthorized': 'ログインしてください。',
  'bookmark-creation-input-omission': '必要なフィールドを入力してください。',
  'bookmark-creation-not-allowed-file-type':
    'サポートされていないファイル形式です。',
  'bookmark-creation-not-allowed-file-size':
    'ファイルサイズが規定の範囲外です。',
  'bookmark-creation-failure':
    'ブックマークの登録に失敗しました。時間を空けてもう一度お試しください。',
  'bookmark-creation-invalid-url': 'URLが不正です。',
  'bookmark-creation-invalid-title': 'タイトルが不正です。',
  'bookmark-creation-invalid-description': '説明が不正です。',
};

type PostReturn = ActionResponseObject<ResponseData, ErrorCode>;

type BookmarkCreationFormProps = {
  formId: string;
};

export default function BookmarkCreationForm({
  formId,
}: BookmarkCreationFormProps) {
  /** フォームの入力値 */
  const [url, setUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<File[] | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /** `ImageUploader` 内の画像選択ダイアログを表示するボタンへの参照 */
  const imageUploaderRef = useRef<HTMLButtonElement | null>(null);

  /** エラーメッセージ */
  const [message, setMessage] = useState<string>();

  /** NextRouter */
  const router = useRouter();

  return (
    <FormWrapper title="ブックマーク登録フォーム">
      <form
        onSubmit={async event => {
          event.preventDefault();

          setMessage('送信中...');

          const formData = new FormData();

          formData.append(FIELD_NAMES.url, url);
          formData.append(FIELD_NAMES.title, title);
          formData.append(FIELD_NAMES.description, description);

          if (0 < images.length) {
            formData.append(FIELD_NAMES.imageFile, images[0]);
          }

          setDisable(true);

          const result = await fetcher.post<PostReturn>(
            '/api/bookmark-creation',
            formData,
          );

          setDisable(false);

          if (result.success) {
            if (result.data.success) {
              router.push(`/`);
            }

            setMessage(ERROR_MESSAGES[result.data.errorCode]);
          } else {
            setMessage(ERROR_MESSAGES['bookmark-creation-failure']);
          }
        }}
      >
        <FormStack>
          <FormItem>
            <Label htmlFor={`${formId}-url`}>URL</Label>
            <Input
              id={`${formId}-url`}
              type="url"
              name={FIELD_NAMES.url}
              required
              value={url}
              onChange={event => setUrl(event.target.value)}
            />

            <OgpFetcher
              url={url}
              toConfirm={() => {
                return title !== '' || description !== '';
              }}
              onSuccess={ogpData => {
                setTitle(ogpData.title);
                setDescription(ogpData.description);
              }}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor={`${formId}-title`}>タイトル</Label>
            <Input
              id={`${formId}-title`}
              type="text"
              name={FIELD_NAMES.title}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor={`${formId}-description`}>説明</Label>
            <Textarea
              id={`${formId}-description`}
              name={FIELD_NAMES.description}
              cols={50}
              rows={8}
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </FormItem>

          <FormItem>
            <Label
              htmlFor={`${formId}-images`}
              onClick={event => {
                event.preventDefault();

                imageUploaderRef?.current?.click();
              }}
            >
              画像
            </Label>

            <ImageUploader
              id={`${formId}-images`}
              ref={imageUploaderRef}
              files={images}
              previewSrc={imagePreview}
              onDrop={files => {
                setImages(files);
                setImagePreview(URL.createObjectURL(files[0]));
              }}
            />
          </FormItem>

          <FormItem className="py-2">
            <Button type="submit" disabled={disable}>
              登録する
            </Button>

            <Message
              message={message}
              handleClose={() => setMessage('')}
              variant="error"
            />
          </FormItem>
        </FormStack>
      </form>
    </FormWrapper>
  );
}
