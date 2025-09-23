import ValueObject from '../shared/ValueObject'

type UrlValue = string

export default class Url extends ValueObject<UrlValue, 'Url'> {
  constructor(value: UrlValue) {
    super(value)
  }

  protected validate(value: UrlValue): void {
    try {
      new URL(value)
    } catch {
      throw new Error(`URLとして不正な値です。 -> ${value}`)
    }
  }
}
