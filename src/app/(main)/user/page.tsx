import { redirect } from 'next/navigation';
import { getSessionUserFromDB } from '@/actions/user/user-find-action/get-session-user-from-db';
import LogoutButton from '@/app/shared/components/auth/LogoutButton';
import { Separator } from '@/components/lib/shadcn/ui/separator';
import { ERROR_CODES } from '@/schema/user/user-find-schema';
import { createUuidV4 } from '@/utils';
import UserInformation from './UserInformation';

export default async function Page() {
  const actionResponse = await getSessionUserFromDB();

  if (actionResponse.success === false) {
    if (actionResponse.errorCode === ERROR_CODES.unauthorized) {
      redirect(`/login`);
    }
  }

  const {
    data: { email, name, password },
  } = actionResponse;

  return (
    <>
      <h1 className="text-2xl mb-8">アカウント</h1>

      <section>
        <h2 className="text-lg mb-6">基本情報</h2>

        <UserInformation
          email={email}
          userName={name}
          formId={createUuidV4()}
          hasCredentials={!!password}
        />
      </section>

      <Separator className="mt-8" />

      <div className="mt-8">
        <LogoutButton />
      </div>
    </>
  );
}
