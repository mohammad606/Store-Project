import { NextResponse } from 'next/server';
import { getCookieServer } from '@/actions/serverCookies';

// @ts-ignore
export async function middleware(request) {
    const token = await getCookieServer('token');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!login|api|_next/static|_next/image|favicon.ico).*)'],
};