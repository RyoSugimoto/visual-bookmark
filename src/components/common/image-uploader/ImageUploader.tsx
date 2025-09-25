'use client';

import { Upload } from 'lucide-react';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from './DropZoneCustomized';

type FileUploaderProps = React.PropsWithChildren<{
  id?: string;
  ref?: React.Ref<HTMLButtonElement>;
  files?: File[];
  className?: string;
  accept?: Record<string, string[]>;
  previewSrc?: string;
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
}: FileUploaderProps) {
  const handleDrop = (files: File[]) => {
    if (typeof onDrop === 'function') {
      onDrop(files);
    }
  };

  function Preview() {
    return (
      <div>
        <img
          alt=""
          className={`max-h-64 h-auto w-auto max-w-full object-contain`}
          src={previewSrc}
          width={480}
          height={480}
        />
      </div>
    );
  }

  function Text({ children }) {
    return (
      <div className="grid gap-1 items-center justify-center">
        {children}
        <p className="text-xs">対応形式: JPEG、PNG、WebP</p>
      </div>
    );
  }

  function Wrapper({ children }) {
    return (
      <div className="break-keep px-4 text-sm grid gap-4 place-items-center">
        {children}
      </div>
    );
  }

  function Empty() {
    return (
      <Wrapper>
        <Upload size="1em" />
        <Text>
          <p>
            ここに画像をドロップするか<wbr></wbr>クリックして画像を選択
          </p>
        </Text>
      </Wrapper>
    );
  }

  function Content() {
    return (
      <Wrapper>
        <Preview />
        <Text>
          <p>
            ここに画像をドロップするか<wbr></wbr>クリックして新しい画像を選択
          </p>
        </Text>
      </Wrapper>
    );
  }

  return (
    <Dropzone
      id={id}
      ref={ref}
      className={`${className} hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/40`}
      accept={accept}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState>
        {(previewSrc && <Content />) || <Empty />}
      </DropzoneEmptyState>

      <DropzoneContent>
        <Content />
      </DropzoneContent>
    </Dropzone>
  );
}
