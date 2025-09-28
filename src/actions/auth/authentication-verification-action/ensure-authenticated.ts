import { container } from 'tsyringe';
import AuthenticationVerificationService from '@/services/auth/authentication-verification-service/AuthenticationVarificationService';

export async function ensureAuthenticated() {
  const authenticationVerificationService = container.resolve(
    AuthenticationVerificationService,
  );

  return await authenticationVerificationService.execute();
}
