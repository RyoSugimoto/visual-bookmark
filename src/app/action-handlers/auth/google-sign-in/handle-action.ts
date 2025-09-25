'use server';

import '@/di';
import { signInWithGoogle } from '@/actions/auth/oauth-sign-in-action/sign-in-with-google';

export async function handleSignInWithGoogle() {
  signInWithGoogle();
}
