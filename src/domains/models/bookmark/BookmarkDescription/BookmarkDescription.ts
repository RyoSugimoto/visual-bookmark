import ValueObject from '../../shared/ValueObject'

type BookmarkDescriptionValue = string

export default class BookmarkDescription extends ValueObject<BookmarkDescriptionValue, 'BookmarkDescription'> {
  protected validate(value: string): void {
    //
  }
} 
