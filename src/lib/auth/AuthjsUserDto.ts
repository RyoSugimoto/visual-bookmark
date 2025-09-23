import type { User } from '@/domains/models/user';
import type IUserWithCredentials from './IUserWithCredentials';

export default class AuthjsUserDto {
  constructor(private _entity: User) {}

  static create(entity: User) {
    return new AuthjsUserDto(entity);
  }

  toObject(): IUserWithCredentials {
    const { id, email, name, image, password } = this._entity;

    return {
      id: id.value,
      email: email.value,
      name: name.value,
      image: image.value,
      password: password.value,
    };
  }
}
