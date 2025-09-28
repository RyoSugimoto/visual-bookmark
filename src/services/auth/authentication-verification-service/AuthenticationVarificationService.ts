import { inject, injectable } from 'tsyringe';
import type IAuthActions from '@/services/shared/IAuthActions';

@injectable()
export default class AuthenticationVerificationService {
  constructor(
    @inject('AuthActions')
    private authActions: IAuthActions,
  ) {}

  async execute() {
    const sessionUser = this.authActions.getSessionUser();

    if (!sessionUser) {
      return false;
    }

    return true;
  }
}
