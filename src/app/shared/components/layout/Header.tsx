'use server';

import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import MainNavItem from './MainNavItem';

export default async function Header() {
  return (
    <header>
      <div className="grid gap-8 px-4 py-6 container mx-auto max-w-screen-xl">
        <p className="grid place-items-center-safe">
          <Link href="/">
            <Logo size="2xl" />
          </Link>
        </p>

        <nav className="grid grid-cols-3 gap-2 w-full">
          <MainNavItem href="/">ホーム</MainNavItem>
          <MainNavItem href="/bookmark/create">新規ブックマーク</MainNavItem>
          <MainNavItem href="/user">アカウント</MainNavItem>
        </nav>
      </div>
    </header>
  );
}
