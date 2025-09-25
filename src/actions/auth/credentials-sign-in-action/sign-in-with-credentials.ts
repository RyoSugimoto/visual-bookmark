import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import { EmailAddress } from '@/domains/models';
import { Credentials, Password } from '@/domains/models/credentials';
import {
  ERROR_CODES,
  type ErrorCode,
  type ResponseData,
} from '@/schema/auth/credentials-sign-in-schema';
import CredentialsSignInService from '@/services/auth/credentials-sign-in-service/CredentialsSignInService';

export const signInWithCredentials: Action<
  FormData,
  ResponseData,
  ErrorCode
> = async (data: FormData) => {
  /**
   * クライアントに返却するデータを作成して返す。
   */
  const send = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  const email = data.get('email').toString();
  const password = data.get('password').toString();

  if (!email || !password) {
    return send(false, {}, ERROR_CODES.noCredentials);
  }

  let credentials: Credentials;

  try {
    credentials = Credentials.create(
      new EmailAddress(email),
      new Password(password),
    );
  } catch {
    return send(false, { email }, ERROR_CODES.noCredentials);
  }

  try {
    const service = container.resolve(CredentialsSignInService);

    await service.execute(credentials);

    return send(true, null);
  } catch (exception) {
    console.error(`[signUpWithCredentials] 詳細: ${exception.message || ''}`);

    return send(false, { email }, ERROR_CODES.failure);
  }
};
