import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req, event) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;


    const { pathname, params } = req.nextUrl;
    const publicUrl = ['/login', '/signup', '/recoverPassword', '/setPassword', '/user'];
    // const publicUrl = ['/login', '/signup', '/recoverPassword', '/setPassword'];

    // Simplify first condition to avoid redundancy
    if (publicUrl.includes(pathname) && isAuthenticated && !pathname.startsWith('/user')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname.endsWith('/edit')) {

        if (!token) {
            const username = req.nextUrl.pathname.split('/')[2]
            return NextResponse.redirect(new URL(`${username ? `/user/${username}` : '/'}`, req.url));
        }
        else {
            if (pathname !== `/user/${token.username}/edit`)
                return NextResponse.redirect(new URL(`/user/${token.username}/edit`, req.url));
        }
    }

    // Combine negative checks and simplify logic
    if (!publicUrl.includes(pathname) && !pathname.startsWith('/activateAccount') && !isAuthenticated && !pathname.startsWith('/user')) {
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
    matcher: ["/login", '/activateAccount', '/admin/:path*', '/profile', '/recoverPassword', '/setPassword', '/user/:path*'],
};
