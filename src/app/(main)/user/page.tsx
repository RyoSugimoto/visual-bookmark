import { redirect } from 'next/navigation';
import { getSessionUser } from '@/actions/auth/session-user-action/get-session-user';
import LogoutButton from '@/app/shared/components/auth/LogoutButton';
import { Separator } from '@/components/lib/shadcn/ui/separator';
import { createUuidV4 } from '@/utils';
import UserInformation from './UserInformation';

export default async function Page() {
  const response = await getSessionUser();

  if (response.success === false) {
    redirect(`/login`);
  }

  const {
    data: { email, name, password },
  } = response;

  return (
    <>
      <UserInformation
        email={email}
        userName={name}
        formId={createUuidV4()}
        hasCredentials={!!password}
      />

      <Separator className="mt-8" />

      <div className="mt-8">
        <LogoutButton />
      </div>
    </>
  );
}
