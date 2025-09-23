'use server';

import '@/di';
import { container } from 'tsyringe';
import { EmailAddress } from '@/domains/models';
import MagicLinkSignInService from '@/services/auth/magic-link-auth-service/MagicLinkAuthService';

export const signInWithMagicLink = async (data: FormData) => {
  const service = container.resolve(MagicLinkSignInService);

  const email = data.get('email').toString();

  await service.execute(new EmailAddress(email));
};
