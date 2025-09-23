export type StateIO<Input = unknown, Result = unknown, ErrorCode = string> =
  | {
      status: 'default';
    }
  | {
      status: 'error';
      input: Input;
      errorCode?: ErrorCode;
    }
  | {
      status: 'success';
      input?: Input;
      result?: Result;
    };

/**
 * `useActionState` に渡すアクションの実装型
 *
 * @template State
 * @template Payload
 *
 * @param {State} state `state` に反映される値
 * @param {Payload} payload アクションが受け取る引数
 *
 * @returns {Promise<State>} `state` に反映させる値を返却
 *
 * * `form` 要素の `action` 属性に**直接設定してはいけない**。
 * * 使用する際は、必ず `useActionState` に渡し、返却されたアクションを `form` に設定する。
 *
 * 使用例:
 *
 * ```tsx
 * const initState: State = {
 *   // 初期値
 * }
 *
 * const [state, action, isPending] = useActionState<State, FormData>(handleActionState, initState)
 *
 * return (
 *   <form action={action}>
 *     フォームの内容
 *   </form>
 * )
 * ```
 */
export type HandleActionState<State extends StateIO, Payload> = (
  state: State,
  payload: Payload,
) => Promise<State>;
