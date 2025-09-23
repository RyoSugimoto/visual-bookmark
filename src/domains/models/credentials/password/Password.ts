import ValueObject from '../../shared/ValueObject'

type PasswordValue = string

const MIN_LENGTH = 12
const MAX_LENGTH = 32
const NEEDED_CHARS = [
  /[a-z]/, /[A-Z]/, /[0-9]/,
  /[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
]
const ALLOWED_PATTERN = /^[a-zA-Z0-9!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~/]+$/

export const ERROR_MESSAGE = {
  tooShort: `パスワードは ${MIN_LENGTH} 字以上である必要があります。`,
  tooLong: `パスワードは ${MAX_LENGTH} 字以下である必要があります。`,
  tooEasy: 'パスワードに必要な字種が不足しています。',
  notAllowed: 'パスワードに使用できない字種が含まれています。',
}

export default class Password extends ValueObject<PasswordValue, 'Password'> {
  static MIN_LENGTH: number = MIN_LENGTH
  static MAX_LENGTH: number = MAX_LENGTH
  static NEEDED_CHARS: RegExp[] = NEEDED_CHARS
  static ALLOWED_PATTERN: RegExp = ALLOWED_PATTERN

  constructor(value: PasswordValue) {
    super(value)
  }

  protected validate(value: string): void {
    // if (value.length < Password.MIN_LENGTH) {
    //   throw new Error(ERROR_MESSAGE.tooShort)
    // }

    // if (value.length > Password.MAX_LENGTH) {
    //   throw new Error(ERROR_MESSAGE.tooLong)
    // }

    // if (!Password.NEEDED_CHARS.every(regex => regex.test(value))) {
    //   throw new Error(ERROR_MESSAGE.tooEasy)
    // }

    // if (!Password.ALLOWED_PATTERN.test(value)) {
    //   throw new Error(ERROR_MESSAGE.notAllowed)
    // }
  }
}
