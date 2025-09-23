import bcrypt from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

export {
  HTTP_STATUS_CODES,
  type HttpStatusCode,
} from './types/http-status-code';

export function generateBookmarkImageUrl(
  imageId: string,
  baseUrl: string = 'http://localhost:3000',
): string {
  return `${process.env.BASE_URL || baseUrl}/api/files/bookmark-image/${imageId}`;
}

export function createUuidV4() {
  const uuid = uuidV4();
  return uuid;
}

export async function makeHash(string: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(string, salt);
  } catch (exception) {
    console.error(exception);

    throw new Error('ハッシュ化に失敗しました。');
  }
}

export async function compareWithHash(value: string, hashedValue: string) {
  try {
    return await bcrypt.compare(value, hashedValue);
  } catch (exception) {
    throw new Error(`[compareWithHash] ${exception}`);
  }
}

export function testEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false;

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * 公開URLから対象のファイルが存在するか確認する関数
 * @param url
 * @returns true: 存在する, false: 存在しない
 */
export async function fileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    // 200 が返れば存在
    if (response.ok) {
      return true;
    }

    // 404 や 403 は存在しない / 権限がない
    if (response.status === 404 || response.status === 403) {
      return false;
    }

    // それ以外のステータスコードの場合は一応 false 扱い
    return false;
  } catch (error) {
    console.error('ファイルの存在確認に失敗しました。', error);
    return false;
  }
}
