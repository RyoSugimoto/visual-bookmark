import { inject, injectable } from 'tsyringe';
import type { EmailAddress } from '@/domains/models';
import type { HashedPassword } from '@/domains/models/user';
import type UserRepository from '@/domains/models/user/IUserRepository';
import Service from '@/services/shared/Service';

export const ERROR_CODES = {
  inputOmission: 'input-omission',
  userExisting: 'user-existing',
  failure: 'failure',
};

export interface CredentialsRegistrationCommand {
  email: EmailAddress;
  hashedPassword: HashedPassword;
}

@injectable()
export default class CredentialsRegistrationService extends Service<
  CredentialsRegistrationCommand,
  void,
  (typeof ERROR_CODES)[keyof typeof ERROR_CODES]
> {
  static ERROR_CODES = ERROR_CODES;

  constructor(
    @inject('UserRepository')
    private repository: UserRepository,
  ) {
    super();
  }

  async execute(command: CredentialsRegistrationCommand) {
    if (!command.email || !command.hashedPassword) {
      this.throwError({
        message: `[CredentialsRegistrationService] 必要な値が揃っていません。`,
        code: CredentialsRegistrationService.ERROR_CODES.inputOmission,
      });
    }

    const existingUser = await this.repository.findByEmail(command.email);

    if (existingUser) {
      this.throwError({
        message: `[CredentialsRegistrationService] このメールアドレスは既に登録されています。`,
        code: CredentialsRegistrationService.ERROR_CODES.userExisting,
      });
    }

    try {
      await this.repository.create(command);
    } catch (exception) {
      console.error(exception);

      this.throwError({
        message: `[CredentialsRegistrationService] ユーザー登録に失敗しました。 詳細: ${exception.message || ''}`,
        code: CredentialsRegistrationService.ERROR_CODES.failure,
      });
    }
  }
}
