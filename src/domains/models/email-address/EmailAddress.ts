import { testEmail } from '@/utils';
import ValueObject from '../shared/ValueObject';

type EmailAddressValue = string;

export default class EmailAddress extends ValueObject<
  EmailAddressValue,
  'EmailAddress'
> {
  protected validate(value: EmailAddressValue): void {
    if (!testEmail(value)) {
      throw new Error('メールアドレスとして不正な値です。');
    }
  }
}
