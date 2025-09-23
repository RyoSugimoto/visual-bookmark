import ValueObject from '../../shared/ValueObject'

type UserNameValue = string

export default class UserName extends ValueObject<UserNameValue, 'UserName'> {
  constructor(value: UserNameValue) {
    super(value)
  }

  protected validate(value: UserNameValue) {
    //
  }
}
