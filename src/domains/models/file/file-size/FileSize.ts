import ValueObject from '@/domains/models/shared/ValueObject';

type FileSizeType = number;

export default class FileSize extends ValueObject<
  FileSizeType,
  'BookmarkImageFile'
> {
  static MAX_FILE_SIZE: number = 5 * 1024 * 1024;
  static MIN_FILE_SIZE: number = 1;

  static isValid(size: number) {
    return FileSize.MAX_FILE_SIZE >= size && FileSize.MIN_FILE_SIZE <= size;
  }

  protected validate(value: number): void {
    if (value > FileSize.MAX_FILE_SIZE) {
      throw new Error('ファイルサイズが大きすぎます。');
    }

    if (value < FileSize.MIN_FILE_SIZE) {
      throw new Error('ファイルサイズが小さすぎます。');
    }
  }
}
