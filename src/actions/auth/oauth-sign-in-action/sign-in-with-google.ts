import { container } from 'tsyringe';
import GoogleSignInService from '@/services/auth/google-auth-service/GoogleAuthService';

export const signInWithGoogle = async () => {
  const service = container.resolve(GoogleSignInService);

  await service.execute();
};
