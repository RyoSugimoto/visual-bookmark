import 'reflect-metadata';
import { Button } from '@/shadcn/button';

type LogoutButtonProps = {
  signOutAction(): void;
};

export default function LogoutButton({ signOutAction }: LogoutButtonProps) {
  return (
    <form action={signOutAction}>
      <Button type="submit">ログアウト</Button>
    </form>
  );
}
