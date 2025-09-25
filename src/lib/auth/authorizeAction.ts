import { type User as AuthenticatedUser, CredentialsSignin } from 'next-auth';
import { container } from 'tsyringe';
import AuthjsAuthorizationService from './AuthjsAuthorizationService';

export async function authorize(credentials: {
  email: string;
  password: string;
}): Promise<AuthenticatedUser> {
  const { email, password } = credentials;

  if (!credentials?.email || !credentials?.password) {
    const error = new CredentialsSignin(
      `[authorize] フィールドの入力が不十分です。`,
    );
    error.code += '-input-omission';
    throw error;
  }

  const userFindService = container.resolve(AuthjsAuthorizationService);

  try {
    const response = await userFindService.execute({
      email,
      password,
    });

    return response;
  } catch {
    const error = new CredentialsSignin(`[authorize] 認証に失敗しました。`);
    error.code += '-failure';
    throw error;
  }
}
