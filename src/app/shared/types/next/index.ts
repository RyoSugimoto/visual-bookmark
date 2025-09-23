export type PageSearchParams = { [key: string]: string | string[] | undefined };

export type PageUrlParams = { [key: string]: string };

/**
 * @see https://nextjs.org/docs/messages/sync-dynamic-apis
 */
export type PageProps = {
  params?: Promise<PageUrlParams> | PageUrlParams;
  searchParams?: Promise<PageSearchParams> | PageSearchParams;
};

/**
 * API RouteでエクスポートされるHTTPメソッド名の関数が受け取る第2引数の型
 * * NOTE: 公式ではグローバルで使用できるとあるが、エディタ上でエラーが出るため、既存の型と同様に動作するものを便宜的に使用。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route#route-context-helper
 */
export interface RouteContext {
  params: Promise<Record<string, string | string[]>>;
}
