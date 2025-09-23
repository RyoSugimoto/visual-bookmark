'use server';

import { signInWithMagicLink } from '@/actions/auth/magic-link-sign-in-action';

export async function handleSignInWithMagicLink(payload: FormData) {
  signInWithMagicLink(payload);
}
