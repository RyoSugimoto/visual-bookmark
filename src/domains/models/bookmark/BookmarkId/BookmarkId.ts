import ValueObject from '../../shared/ValueObject'

type BookmarkIdValue = string

export default class BookmarkId extends ValueObject<BookmarkIdValue, 'BookmarkId'> {
  protected validate(value: string): void {
    //
  }
} 
