import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl mb-8">ページが見つかりません。</h1>
      <div className="grid gap-4">
        <p>お探しのページを見つけることができませんでした。</p>
        <Link href="/">ホームに戻る</Link>
      </div>
    </div>
  );
}
