import '@/di/register-common';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSessionUser } from './actions/auth/session-user-action/get-session-user';

/**
 * ログイン時のみアクセスできるパス
 */
const prefixesForAuthenticated = ['/user', '/bookmark'];

/**
 * 非ログイン時のみアクセスできるパス
 */
const prefixesForNotAuthenticated = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  console.log(`[Middleware] Begin middleware`);

  const { pathname } = request.nextUrl;
  const actionResponse = await getSessionUser();
  const user = actionResponse.data;

  console.log(`[Middleware] Pathname: "${pathname}"`);
  console.log(`[Middleware] Authenticated: ${user !== null}`);

  if (
    !user &&
    prefixesForAuthenticated.some(prefix => pathname.startsWith(prefix))
  ) {
    console.log(`[Middleware] Not authenticated on a functional page`);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (!user && pathname === '/') {
    console.log(`[Middleware] Not authenticated on the root"`);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (
    user &&
    prefixesForNotAuthenticated.some(prefix => pathname.startsWith(prefix))
  ) {
    console.log(`Middleware: "has session & login or register"`);
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  console.log(`[Middleware] End middleware`);

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/user/:path*', '/bookmark/:path*'],
};
