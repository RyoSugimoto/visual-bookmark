'use server';

import '@/di';
import { container } from 'tsyringe';
import { type Action, ActionResponse } from '@/actions/shared';
import { EmailAddress } from '@/domains/models';
import { Password } from '@/domains/models/credentials';
import { HashedPassword } from '@/domains/models/user';
import CredentialsRegistrationService from '@/services/auth/credentials-registration-service/CredentialsRegistrationService';
import ServiceError from '@/services/shared/ServiceError';
import { makeHash } from '@/utils';
import { ERROR_CODES, type ErrorCode, type ResponseData } from './modules';

export const signUpWithCredentials: Action<
  FormData,
  ResponseData,
  ErrorCode
> = async (data: FormData) => {
  /**
   * クライアントに返却するデータを作成して返す。
   */
  const send = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  const emailValue = data.get('email').toString();
  const passwordValue = data.get('password').toString();

  if (!emailValue || !passwordValue) {
    return send(false, { email: emailValue }, ERROR_CODES.inputOmission);
  }

  let email: EmailAddress;
  let password: Password;

  try {
    email = new EmailAddress(emailValue);
  } catch {
    return send(false, { email: emailValue }, ERROR_CODES.invalidEmail);
  }

  try {
    password = new Password(passwordValue);
  } catch {
    return send(false, { email: emailValue }, ERROR_CODES.invalidPassword);
  }

  const service = container.resolve(CredentialsRegistrationService);
  const hashedPassword = await makeHash(password.value);

  try {
    await service.execute({
      email,
      hashedPassword: new HashedPassword(hashedPassword),
    });

    return send(true, null);
  } catch (exception) {
    if (
      exception instanceof ServiceError &&
      exception.code === CredentialsRegistrationService.ERROR_CODES.userExisting
    ) {
      return send(false, { email: emailValue }, ERROR_CODES.userExisting);
    }

    return send(false, { email: emailValue }, ERROR_CODES.failure);
  }
};
