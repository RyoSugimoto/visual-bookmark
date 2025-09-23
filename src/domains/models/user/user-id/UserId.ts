import ValueObject from '../../shared/ValueObject';

type UserIdValue = string;

const CUID_REGEX = /^c[a-z0-9]{24}$/;

export default class UserId extends ValueObject<UserIdValue, 'UserId'> {
  protected validate(value: UserIdValue) {
    if (!CUID_REGEX.test(value)) {
      throw new Error(`IDの形式が不正です。 -> ${value}`);
    }
  }
}
