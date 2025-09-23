export type TransactionCallback = () => Promise<void>;

export default interface ITransactionProvider {
  begin(callback: TransactionCallback): Promise<void>;
}
