import type EmailAddress from '../email-address/EmailAddress';
import type Url from '../url/Url';
import type { HashedPassword, UserId, UserName } from '.';

/**
 * 登録されたユーザー
 */
export default class User {
  constructor(
    public readonly id: UserId,
    public readonly email: EmailAddress,
    public readonly name?: UserName,
    public readonly image?: Url,
    public readonly password?: HashedPassword,
  ) {}

  static reconstruct(
    id: UserId,
    email: EmailAddress,
    name?: UserName,
    image?: Url,
    password?: HashedPassword,
  ) {
    return new User(id, email, name, image, password);
  }
}
