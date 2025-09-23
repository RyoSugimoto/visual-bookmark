import { CircleAlert, CircleX } from 'lucide-react';

type Variant = 'default' | 'success' | 'error' | 'warn' | 'info';

type MessageProps = {
  /** 表示するメッセージ。空のとき、コンポーネント自体が表示されない。 */
  message?: string;
  /** 「削除」ボタンを押した時の挙動。設定すると「削除」ボタンを表示する。 */
  handleClose?(message: string): void;
  variant?: Variant;
  className?: string;
};

const stylesByVariant: Record<Variant, string> = {
  default: '',
  success: 'text-success',
  error: 'font-bold text-error',
  warn: 'text-warn',
  info: 'text-info',
} as const;

const iconSize = '1em';

export default function Message({
  message,
  handleClose,
  variant = 'default',
  className,
}: MessageProps) {
  if (!message) {
    return;
  }

  return (
    <div className={`${stylesByVariant} flex items-center gap-2 ${className}`}>
      <span className="grow-0 shrink-0">
        {variant === 'error' && <CircleAlert size={iconSize} />}
      </span>
      {message}

      {handleClose && (
        <button
          type="button"
          onClick={event => {
            event.preventDefault();

            if (typeof handleClose === 'function') {
              handleClose(message);
            }
          }}
          title={`${message}のメッセージを消す`}
          className="ml-auto"
        >
          <CircleX size="1em" aria-label="削除" />
        </button>
      )}
    </div>
  );
}
