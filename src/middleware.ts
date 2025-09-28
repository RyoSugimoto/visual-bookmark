import '@/di/register-common';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ensureAuthenticated } from './actions/auth/authentication-verification-action/ensure-authenticated';

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
  const isAuthenticated = await ensureAuthenticated();

  console.log(`[Middleware] Authenticated: ${isAuthenticated}`);

  if (
    !isAuthenticated &&
    prefixesForAuthenticated.some(prefix => pathname.startsWith(prefix))
  ) {
    console.log(`[Middleware] Not authenticated on a functional page`);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (!isAuthenticated && pathname === '/') {
    console.log(`[Middleware] Not authenticated on the root"`);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (
    isAuthenticated &&
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
