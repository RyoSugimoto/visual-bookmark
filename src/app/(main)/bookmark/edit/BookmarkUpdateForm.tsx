'use client';

import { Trash2 as Trash, Undo2 as Undo } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { OgpFetcher } from '@/app/shared/components/ogp-fetcher';
import { Message } from '@/components/common';
import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import { FormItem, FormStack, FormWrapper } from '@/components/form';
import {
  type ErrorCode,
  FIELD_NAMES,
} from '@/schema/bookmark/bookmark-update-schema';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';
import { Textarea } from '@/shadcn/textarea';
import { fetcher } from '@/utils/fetcher';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  'bookmark-update-input-omission': '入力内容が不正です。',
  'bookmark-update-failure': 'ブックマークの更新に失敗しました。',
};

type BookmarkUpdateFormProps = {
  formId: string;
  bookmarkId: string;
  init: {
    url: string;
    title: string;
    description: string;
    imageUrl: string;
  };
};

export default function BookmarkUpdateForm({
  formId,
  bookmarkId,
  init,
}: BookmarkUpdateFormProps) {
  /** フォームの入力値 */
  const [url, setUrl] = useState(init.url);
  const [title, setTitle] = useState(init.title);
  const [description, setDescription] = useState(init.description);
  const [images, setImages] = useState<File[]>([]);
  const [disable, setDisable] = useState<boolean>(false);
  const [imageCommand, setImageCommand] = useState<
    'noop' | 'delete' | 'change'
  >('noop');
  const [imagePreview, setImagePreview] = useState<string | null>(
    init.imageUrl,
  );

  /** `ImageUploader` 内の画像選択ダイアログを表示するボタンへの参照 */
  const imageUploaderRef = useRef<HTMLButtonElement | null>(null);

  /** エラーメッセージ */
  const [message, setMessage] = useState<string>();

  /** NextRouter */
  const router = useRouter();

  return (
    <FormWrapper title="ブックマーク更新フォーム">
      <form
        onSubmit={async event => {
          event.preventDefault();

          setMessage('送信中...');

          const formData = new FormData();

          formData.append(FIELD_NAMES.id, bookmarkId);
          formData.append(FIELD_NAMES.url, url);
          formData.append(FIELD_NAMES.title, title);
          formData.append(FIELD_NAMES.description, description);
          formData.append(FIELD_NAMES.imageCommand, imageCommand);

          if (0 < images.length) {
            formData.append(FIELD_NAMES.imageFile, images[0]);
          }

          setDisable(true);

          const result = await fetcher.post('/api/bookmark-update', formData);

          setDisable(false);

          if (result.success) {
            router.push(`/`);
          } else {
            setMessage(ERROR_MESSAGES['bookmark-update-failure']);
          }
        }}
      >
        <FormStack>
          <FormItem>
            <Label htmlFor={`${formId}-url`}>URL</Label>
            <Input
              id={`${formId}-url`}
              type="url"
              name="url"
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
              name="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor={`${formId}-setDescription`}>説明</Label>
            <Textarea
              id={`${formId}-description`}
              name="description"
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
              onDrop={files => {
                setImages(files);
                setImageCommand('change');
                setImagePreview(URL.createObjectURL(files[0]));
              }}
              previewSrc={imagePreview}
            ></ImageUploader>

            <div className="grid grid-cols-2 gap-4">
              {imageCommand === 'change' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setImages([]);
                    setImageCommand('noop');
                    setImagePreview(init.imageUrl);
                  }}
                >
                  <Undo size="1em" />
                  画像を元に戻す
                </Button>
              )}

              {imagePreview && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setImages([]);
                    setImageCommand('delete');
                    setImagePreview(null);
                  }}
                >
                  <Trash size="1em" />
                  画像を削除
                </Button>
              )}
            </div>
          </FormItem>

          <FormItem className="py-2">
            <Button type="submit" disabled={disable}>
              更新する
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
