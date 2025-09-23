import type { ActionResponseObject } from './ActionResponse';

/**
 * サーバーアクション関数の実装型
 *
 * * サーバーコンポーネントの描画前処理で呼び出すことができる。
 * * `form` 要素の `action` には直接設定しても構わないが、振る舞いを調整したい場合は、 `HandleAction` を実装した関数でラップしたものを使用するのが望ましい。
 * * `useActionState` では直接使用できない。 `useActionState` で使用したいアクションは、必ず `HandleActionState` を実装した関数（ `State` を返すもの）でラップする。
 */
export type Action<Payload, ResponseData, ErrorCode = string> = (
  payload?: Payload,
) =>
  | Promise<ActionResponseObject<ResponseData, ErrorCode>>
  | ActionResponseObject<ResponseData, ErrorCode>;
