import type { EmailAddress } from '../';
import type Password from './password/Password';

export default class Credentials {
  constructor(
    public readonly email: EmailAddress,
    public readonly password: Password,
  ) {}

  static create(email: EmailAddress, password: Password) {
    return new Credentials(email, password);
  }
}
