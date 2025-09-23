import ValueObject from '../../shared/ValueObject'

type BookmarkTitleValue = string

export default class BookmarkTitle extends ValueObject<BookmarkTitleValue, 'BookmarkTitle'> {
  protected validate(value: string): void {
    //
  }
} 
