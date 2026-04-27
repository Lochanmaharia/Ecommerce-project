// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/checkout', '/profile'];

export function proxy(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth-token')?.value || null

    if (PROTECTED_ROUTES.includes(pathname) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

}

export const config = {
    matcher: [
        // Match protected patterns; exclude public paths
        '/checkout',
        '/profile',
    ],
};