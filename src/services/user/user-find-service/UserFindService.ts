import { inject, injectable } from 'tsyringe';
import type { EmailAddress } from '@/domains/models';
import type { User, UserId } from '@/domains/models/user';
import type IUserRepository from '@/domains/models/user/IUserRepository';
import Service from '@/services/shared/Service';

type Command =
  | {
      key: 'id';
      value: UserId;
    }
  | {
      key: 'email';
      value: EmailAddress;
    };

@injectable()
export default class UserFindService extends Service<Command, Promise<User>> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {
    super();
  }

  async execute({ key, value }: Command) {
    let foundUser: User;

    if (key === 'id') {
      foundUser = await this.userRepository.findById(value);
    } else if (key === 'email') {
      foundUser = await this.userRepository.findByEmail(value);
    }

    return foundUser;
  }
}
