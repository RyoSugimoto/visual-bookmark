/**
 * `form` 要素の `action` 属性に直接渡す関数の実装型
 *
 * 使用例:
 *
 * ```tsx
 * <form action={handleAction}>
 *   フォームの内容
 * </form>
 * ```
 */
export type HandleAction = (formData: FormData) => void;
