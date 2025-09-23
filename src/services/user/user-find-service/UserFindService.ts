import { inject, injectable } from 'tsyringe';
import type { EmailAddress } from '@/domains/models';
import type IUserRepository from '@/domains/models/user/IUserRepository';

interface Command {
  email: EmailAddress;
}

@injectable()
export default class UserFindService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email }: Command) {
    const user = this.userRepository.findByEmail(email);

    return user;
  }
}
