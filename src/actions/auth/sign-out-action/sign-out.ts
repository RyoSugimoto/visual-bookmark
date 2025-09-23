'use server';

import '@/di';
import { container } from 'tsyringe';
import SignOutService from '@/services/auth/sign-out-service/SignOutService';

export const signOut = async () => {
  const service = container.resolve(SignOutService);

  await service.execute();
};
