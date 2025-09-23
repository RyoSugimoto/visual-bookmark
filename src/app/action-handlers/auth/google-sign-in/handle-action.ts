'use server';

import { signInWithGoogle } from '@/actions/auth/oauth-sign-in-action';

export async function handleSignInWithGoogle() {
  signInWithGoogle();
}
