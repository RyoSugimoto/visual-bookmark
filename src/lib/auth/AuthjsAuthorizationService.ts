import type { User } from 'next-auth';
import { inject, singleton } from 'tsyringe';
import { EmailAddress } from '@/domains/models';
import type IUserRepository from '@/domains/models/user/IUserRepository';
import { compareWithHash } from '@/utils';
import AuthjsUserDto from './AuthjsUserDto';

type Command = {
  email: string;
  password: string;
};

@singleton()
export default class AuthjsAuthorizationService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: Command): Promise<User> {
    const user = await this.userRepository.findByEmail(new EmailAddress(email));

    if (!user || !user.password) {
      throw new Error('[AuthjsAuthorizationService] 資格情報が不正です。');
    }

    const isValidPassword = await compareWithHash(
      password,
      user.password.value,
    );

    if (!isValidPassword) {
      throw new Error('[AuthjsAuthorizationService] 資格情報が不正です。');
    }

    const dto = AuthjsUserDto.create(user);

    return dto.toObject();
  }
}
