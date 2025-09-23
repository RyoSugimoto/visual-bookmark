import type z from 'zod';
import { Dto } from '@/actions/shared';
import type { User } from '@/domains/models/user';
import type { userResponseSchema } from '@/schema';

type UserObject = z.infer<typeof userResponseSchema>;

export default class UserDto extends Dto<User, UserObject> {
  static create(user: User) {
    return new UserDto(user);
  }

  toObject(): UserObject {
    const { id, name, email, image, password } = this.entity;

    return {
      id: id.value,
      email: email.value,
      name: name?.value || null,
      image: image?.value || null,
      password: password?.value || null,
    };
  }
}
