import { inject, injectable } from 'tsyringe';
import type AuthActions from '@/services/shared/IAuthActions';

@injectable()
export default class SignOutService {
  constructor(
    @inject('AuthActions')
    private actions: AuthActions,
  ) {}

  async execute() {
    await this.actions.signOut();
  }
}
