import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider, {
  type CredentialInput,
} from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { authorize } from '@/lib/auth/authorizeAction';
import { prisma } from '@/lib/prisma';

const credentialsInputs: Record<'email' | 'password', CredentialInput> = {
  email: {
    type: 'email',
    label: 'Email',
  },
  password: {
    type: 'password',
    label: 'Password',
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      // デフォルトでは `authjs.dev` となりResendで送信不可
      from: process.env.RESEND_FROM || 'authjs.dev',
    }),
    Google,
    CredentialsProvider({
      name: 'credentials',
      credentials: credentialsInputs,
      authorize,
    }),
  ],
  session: {
    /**
     * NOTE: Credentialsプロバイダを使用する場合は、通常はJWT戦略を使う必要がある。
     * @see https://next-auth.js.org/providers/credentials
     * @see https://authjs.dev/getting-started/providers/credentials
     * * "users authenticated in this manner are not persisted in the database"
     */
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日
    updateAge: 1 * 24 * 60 * 60, // 1日
  },
  callbacks: {
    async jwt({ token, user }) {
      // JWTにユーザIDを設定
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // クライアントサイドで取得できる情報
      // デフォルトでは `email` `name` `image`
      // idを追加
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
