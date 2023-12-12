import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req, event) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const { pathname } = req.nextUrl;
    const publicUrl = ['/login', '/signup']

    if ((publicUrl.includes(pathname) || pathname.startsWith('/signup')) && isAuthenticated) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!publicUrl.includes(pathname) && !isAuthenticated && !pathname.startsWith('/signup/')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname.includes('/admin') && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
    }

}
export const config = {
    matcher: ["/login", '/signup/:path*', '/admin/:path*'],
};

