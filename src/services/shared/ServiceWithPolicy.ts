import type { User } from '@/domains/models/user';
import Service from './Service';

export default abstract class ServiceWithPolicy<
  ExecuteCommand,
  ExecuteReturn,
  PolicyOption = null,
  ErrorCode extends string = string,
> extends Service<ExecuteCommand, ExecuteReturn, ErrorCode> {
  /**
   * 認可処理を行なう。
   * @param user ログイン中のユーザーの `User` エンティティ
   * @param option サービスの認可処理に必要な値
   */
  protected abstract checkPolicy(user: User, option?: PolicyOption): boolean;
}
