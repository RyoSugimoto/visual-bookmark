'use server';

import '@/di';
import { signInWithMagicLink } from '@/actions/auth/magic-link-sign-in-action/sign-in-with-magic-link';

export async function handleSignInWithMagicLink(payload: FormData) {
  signInWithMagicLink(payload);
}
