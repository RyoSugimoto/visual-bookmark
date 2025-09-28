import type {
  HashedPassword,
  User,
  UserId,
  UserName,
} from '@/domains/models/user';
import type { EmailAddress, Url } from '../';

export interface CreateCommand {
  email: EmailAddress;
  hashedPassword: HashedPassword;
  name?: UserName;
  image?: Url;
}

export interface UpdateCommand {
  id: UserId;
  name: UserName;
  email: EmailAddress;
}

export default interface UserRepository {
  findByEmail(emailAddress: EmailAddress): Promise<User | null>;

  findById(userId: UserId): Promise<User | null>;

  /**
   * 新規ユーザーを登録する。
   * @param command
   */
  create(command: CreateCommand): Promise<User | null>;

  update(command: UpdateCommand): Promise<User>;
}
