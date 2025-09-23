/**
 * データアクセスクライアントの抽象化インターフェース
 */
export interface IDataAccessClientManager<T> {
  setClient(client: T): void;
  getClient(): T;
  reset(): void;
}
