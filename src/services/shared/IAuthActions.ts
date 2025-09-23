import type Credentials from '@/domains/models/credentials/Credentials';
import type EmailAddress from '@/domains/models/email-address/EmailAddress';
import type User from '@/domains/models/user/User';

export default interface IAuthActions {
  getSessionUser(): Promise<User | null>;

  signOut(): Promise<void> | void;

  signInWithCredentials(credentials: Credentials): Promise<void> | void;

  signInWithGoogle(): Promise<void> | void;

  signInWithMagicLink(email: EmailAddress): Promise<void> | void;
}
