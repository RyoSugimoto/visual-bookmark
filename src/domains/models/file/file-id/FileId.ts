import ValueObject from '../../shared/ValueObject';

type FileIdValue = string;

const CUID_REGEX = /^c[a-z0-9]{24}$/;

export default class FileId extends ValueObject<FileIdValue, 'FileId'> {
  protected validate(value: FileIdValue) {
    if (!CUID_REGEX.test(value)) {
      throw new Error(`IDの形式が不正です。 -> ${value}`);
    }
  }
}
