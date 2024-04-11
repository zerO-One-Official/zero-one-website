import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req, event) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const { pathname } = req.nextUrl;
    const publicUrl = ['/login', '/signup', '/recoverPassword', '/setPassword'];

    // Simplify first condition to avoid redundancy
    if (publicUrl.includes(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Combine negative checks and simplify logic
    if (!publicUrl.includes(pathname) && !pathname.startsWith('/activateAccount') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check token role and redirect only if not admin
    if (pathname.includes('/admin') && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Only redirect nested paths if intended
    if (pathname.startsWith('/activateAccount') && isAuthenticated) {
        // Construct redirect URL to desired nested path
        return NextResponse.redirect(new URL('/', req.url));
    }

    // No redirect needed, continue processing request
    return NextResponse.next();
}

export const config = {
    matcher: ["/login", '/activateAccount', '/admin/:path*', '/profile', '/recoverPassword', '/setPassword'],
};
