import { inject, injectable } from 'tsyringe';
import type AuthActions from '@/services/shared/IAuthActions';

@injectable()
export default class SessionUserService {
  constructor(
    @inject('AuthActions')
    private actions: AuthActions,
  ) {}

  async execute() {
    const user = await this.actions.getSessionUser();

    return user;
  }
}
