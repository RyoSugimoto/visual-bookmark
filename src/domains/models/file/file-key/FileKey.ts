import ValueObject from '../../shared/ValueObject';

type FileKeyType = string;

export default class FileKey extends ValueObject<FileKeyType, 'FileKey'> {
  protected validate(value: string): void {
    if (!value) {
      throw new Error('値が不正です。');
    }
  }
}
