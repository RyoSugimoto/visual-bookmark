import ValueObject from '../../shared/ValueObject';

type HashedPasswordValue = string;

const BCRYPT_REGEX = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

export const ERROR_MESSAGE = {
  notHashed: 'ハッシュ化された値ではありません。',
};

export default class HashedPassword extends ValueObject<
  HashedPasswordValue,
  'HashedPassword'
> {
  static REGEX = BCRYPT_REGEX;

  protected validate(value: string): void {
    if (!HashedPassword.REGEX.test(value)) {
      throw new Error(ERROR_MESSAGE.notHashed);
    }
  }
}
