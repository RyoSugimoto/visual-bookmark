import { Dto } from '@/actions/shared';
import type { User } from '@/domains/models/user';
import type { UserResponse } from '@/schema/user';

export default class UserDto extends Dto<User, UserResponse> {
  static create(user: User) {
    return new UserDto(user);
  }

  toObject(): UserResponse {
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
