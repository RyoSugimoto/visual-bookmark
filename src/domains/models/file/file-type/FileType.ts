import ValueObject from '@/domains/models/shared/ValueObject';

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

type BookmarkImageFileTypeType = string;

export default class FileType extends ValueObject<
  BookmarkImageFileTypeType,
  'BookmarkImageFile'
> {
  static ALLOWED_FILE_TYPES = ALLOWED_FILE_TYPES;

  static isValid(type: string) {
    return (FileType.ALLOWED_FILE_TYPES as readonly string[]).includes(type);
  }

  protected validate(value: (typeof ALLOWED_FILE_TYPES)[number]): void {
    if (!FileType.ALLOWED_FILE_TYPES.includes(value)) {
      throw new Error(
        `[FileType] ${value} <- このファイル形式には対応していません。`,
      );
    }
  }
}
