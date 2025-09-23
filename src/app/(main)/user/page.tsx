import { redirect } from 'next/navigation';
import { getSessionUser } from '@/actions/auth/session-user-action';
import { signOut } from '@/actions/auth/sign-out-action';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function Page() {
  const response = await getSessionUser();

  if (response.success === false) {
    redirect(`/login`);
  }

  const { data } = response;

  return (
    <div>
      <h1 className="text-2xl mb-8">アカウント情報</h1>

      <dl className="grid gap-4">
        <div>
          <dt className="mb-1">ユーザー名</dt>
          <dd>{data.name || '（未設定）'}</dd>
        </div>
        <div>
          <dt className="mb-1">メールアドレス</dt>
          <dd>{data.email}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <LogoutButton signOutAction={signOut} />
      </div>
    </div>
  );
}
