import { inject, injectable } from 'tsyringe';
import type { EmailAddress } from '@/domains/models';
import type AuthActions from '@/services/shared/IAuthActions';

@injectable()
export default class MagicLinkAuthService {
  constructor(
    @inject('AuthActions')
    private actions: AuthActions,
  ) {}

  async execute(email: EmailAddress) {
    try {
      await this.actions.signInWithMagicLink(email);
    } catch (exception) {
      console.error(exception);

      throw exception;
    }
  }
}
