import type { HashedPassword, User, UserName } from '@/domains/models/user';
import type { EmailAddress, Url } from '../';

export interface CreateCommand {
  email: EmailAddress;
  hashedPassword: HashedPassword;
  name?: UserName;
  image?: Url;
}

export default interface UserRepository {
  findByEmail(emailAddress: EmailAddress): Promise<User | null>;

  /**
   * 新規ユーザーを登録する。
   * @param command
   */
  create(command: CreateCommand): Promise<User | null>;
}
