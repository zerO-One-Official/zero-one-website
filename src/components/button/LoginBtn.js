"use client"
import Button from '../button/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react'


const LoginBtn = ({ unmount = () => { } }) => {
    const SpanStyle = {
        zIndex: 1,
        color: 'inherit',
        transition: 'all 300ms ease-in-out',
    };

    const path = usePathname();
    const { data } = useSession();

    return (
        path === '/login'
            ?
            null
            :
            data && data.user ?
                <button
                    onClick={() => { signOut(); unmount(); }}
                    className="flex rounded-full"
                >
                    <Button
                        style={{ border: 'none' }}
                        className="bg-primary-light text-primary hover:text-primary-light"
                    >
                        <span style={SpanStyle}>Log Out</span>
                    </Button>
                </button>
                :
                <Link
                    href="/login"
                    className="flex rounded-full"
                    onClick={unmount}
                >
                    <Button
                        style={{ border: 'none' }}
                        className="bg-primary-light text-primary hover:text-primary-light"
                    >
                        <span style={SpanStyle}>Login</span>
                    </Button>
                </Link>
    )
}

export default LoginBtn