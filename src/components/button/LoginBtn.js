"use client"
import Button from '../button/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react';

const LoginBtn = ({ unmount = () => { } }) => {
    const SpanStyle = {
        zIndex: 1,
        color: 'inherit',
        transition: 'all 300ms ease-in-out',
    };

    const [active, setActive] = useState(false);

    const path = usePathname();
    const { data } = useSession();

    return (
        path === '/login'
            ?
            null
            :
            data && data.user ?

                <Link href={'/profile'}>
                    <div className='relative w-10 h-10 rounded-full  border border-white/25 cursor-pointer' >
                        <Image src={data.user.profilePic} width={50} height={50} alt={data.user.name} className="rounded-full w-full h-full object-cover object-center" />
                        {/* <div className="absolute top-10">
                        <div className="">
                        <Link href={'/profile'}>Profile</Link>
                        </div>
                        <button onClick={signOut}>
                        Logout
                        </button>
                    </div> */}
                    </div>
                </Link>
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