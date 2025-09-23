import { inject, injectable } from 'tsyringe';
import type AuthActions from '@/services/shared/IAuthActions';

@injectable()
export default class GoogleAuthService {
  constructor(
    @inject('AuthActions')
    private actions: AuthActions,
  ) {}

  async execute() {
    try {
      await this.actions.signInWithGoogle();
    } catch (exception) {
      console.error(exception);

      throw exception;
    }
  }
}
