import { inject, injectable } from 'tsyringe';
import type Credentials from '@/domains/models/credentials/Credentials';
import type IAuthActions from '@/services/shared/IAuthActions';
import Service from '@/services/shared/Service';

export const ERROR_CODES = {
  inputOmission: 'input-omission',
  failure: 'failure',
};

@injectable()
export default class CredentialsSignInService extends Service<
  Credentials,
  void,
  (typeof ERROR_CODES)[keyof typeof ERROR_CODES]
> {
  constructor(
    @inject('AuthActions')
    private actions: IAuthActions,
  ) {
    super();
  }

  async execute(credentials: Credentials) {
    if (!credentials?.email || !credentials?.password) {
      this.throwError({
        message: `[CredentialsSignInService] 必要な値が揃っていません。`,
        code: ERROR_CODES.inputOmission,
      });
    }

    try {
      await this.actions.signInWithCredentials(credentials);
    } catch (exception) {
      console.error(exception);

      this.throwError({
        message: `[CredentialsSignInService] サインイン処理に失敗しました。 詳細: ${exception.message || ''}`,
        code: ERROR_CODES.failure,
      });
    }
  }
}
