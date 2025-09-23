'use client';

import { useState } from 'react';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from './DropZoneCustomized';

type FileUploaderProps = React.PropsWithChildren<{
  id?: string;
  ref?: React.Ref<HTMLButtonElement>;
  files: File[];
  className?: string;
  accept?: Record<string, string[]>;
  previewSrc: string;
  onDrop?(files: File[]): void;
}>;

export default function ImageUploader({
  id,
  ref,
  files,
  className,
  previewSrc,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
  },
  onDrop,
  children,
}: FileUploaderProps) {
  const handleDrop = (files: File[]) => {
    if (typeof onDrop === 'function') {
      onDrop(files);
    }
  };

  const [previewError, setPreviewError] = useState<boolean>(false)

  return (
    <Dropzone
      id={id}
      ref={ref}
      className={`${className}`}
      accept={accept}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      {(children && <DropzoneEmptyState>{children}</DropzoneEmptyState>) || (
        <DropzoneEmptyState>
          <p>1</p>
          {previewSrc && (
            <div>
              <p>現在のイメージ</p>
              {previewError && (
                <p>画像が読み込めませんでした。</p>
              ) || (
                <img
                  alt=""
                  className={`max-h-64 h-auto w-auto max-w-full object-contain`}
                  src={previewSrc}
                  width={480}
                  height={480}
                  onError={() => setPreviewError(true)}
                />
              )
            }
            </div>)}
        </DropzoneEmptyState>
      )}

      <DropzoneContent>
        <p>2</p>
        {previewSrc && (
          <img
            alt=""
            className={`max-h-64 h-auto w-auto max-w-full object-contain`}
            src={previewSrc}
            width={480}
            height={480}
          />
        )}
      </DropzoneContent>
    </Dropzone>
  );
}
