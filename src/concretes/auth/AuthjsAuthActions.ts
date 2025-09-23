import { EmailAddress, Url } from '@/domains/models';
import type { Credentials } from '@/domains/models/credentials';
import { User, UserId, UserName } from '@/domains/models/user';
import { auth, signIn, signOut } from '@/lib/auth';
import type AuthActions from '@/services/shared/IAuthActions';

export default class AuthjsAuthActions implements AuthActions {
  async getSessionUser() {
    const session = await auth();

    if (!session) return null;

    const { id, email, name, image } = session.user;

    const user = User.reconstruct(
      new UserId(id),
      new EmailAddress(email),
      name ? new UserName(name) : null,
      image ? new Url(image) : null,
    );

    return user;
  }

  async signOut() {
    await signOut();
  }

  async signInWithCredentials(credentials: Credentials) {
    const data = {
      email: credentials.email.value,
      password: credentials.password.value,
    };

    /**
     * Auth.jsの設定ファイル `auth.ts` で
     * `CredentialsProvider` の引数に設定された
     * `authorize` メソッドが呼び出される。
     */
    await signIn('credentials', data);
  }

  async signInWithGoogle() {
    await signIn('google');
  }

  async signInWithMagicLink(email: EmailAddress) {
    await signIn('resend', { email: email.value });
  }
}
