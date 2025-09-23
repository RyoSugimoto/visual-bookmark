/**
 * `get` や `post` メソッドの戻り値の型。
 * APIが返すデータ本体は `data` プロパティに格納される。
 */
export type FetcherResult<DataType, Code = string> = {
  success: boolean;
  data?: DataType;
  status: number;
  headers: Record<string, unknown>;
};

export type FetcherOptions = {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  timeout?: number;
};

export type FetcherBody =
  | Record<
      string,
      | string
      | File
      | ArrayBuffer
      | Blob
      | DataView
      | ReadableStream
      | URLSearchParams
      | string[]
      | File[]
    >
  | FormData;

export interface IFetcher {
  get<DataType>(
    endpoint: string | URL,
    options?: FetcherOptions,
  ): Promise<FetcherResult<DataType>>;

  post<DataType>(
    endpoint: string | URL,
    body?: FetcherBody,
    options?: FetcherOptions,
  ): Promise<FetcherResult<DataType>>;
}

export default IFetcher;
