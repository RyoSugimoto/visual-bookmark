import { inject, injectable } from 'tsyringe';
import type { EmailAddress } from '@/domains/models';
import type { User, UserId, UserName } from '@/domains/models/user';
import type IUserRepository from '@/domains/models/user/IUserRepository';
import ServiceWithPolicy from '@/services/shared/ServiceWithPolicy';

type ExecuteCommand = {
  user: User;
  id: UserId;
  name?: UserName;
  email?: EmailAddress;
};

type ExecuteResult = {
  user: User;
};

@injectable()
export default class UserUpdateService extends ServiceWithPolicy<
  ExecuteCommand,
  Promise<ExecuteResult>,
  UserId
> {
  constructor(
    @inject('UserRepository')
    private UserRepository: IUserRepository,
  ) {
    super();
  }

  protected checkPolicy(user: User, id: UserId): boolean {
    return user.id.equals(id);
  }

  public async execute({
    user,
    id,
    name,
    email,
  }: ExecuteCommand): Promise<ExecuteResult> {
    if (!this.checkPolicy(user, id)) {
      this.throwError({
        code: `user-update-service-not-allowed`,
        message: `[UserUpdateService] 権限がありません。`,
      });
    }

    const updatedUser = await this.UserRepository.update({
      id,
      name,
      email,
    });

    return { user: updatedUser };
  }
}
