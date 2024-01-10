"use client"
import Button from '../button/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { MdLogin } from 'react-icons/md'
import { FaCircleUser } from 'react-icons/fa6';

const LoginBtn = ({ unmount = () => { } }) => {
    const [active, setActive] = useState(false);

    const path = usePathname();
    const { data } = useSession();

    const popUpRef = useRef(null);

    useEffect(() => {
        const handleOutClick = (e) => {
            if (!popUpRef?.current?.contains(e.target)) {
                setActive(false);
            }
        }

        document.addEventListener('click', handleOutClick);
        return () => document.removeEventListener('click', handleOutClick);
    })

    return (
        path === '/login'
            ?
            null
            :
            data && data.user ?
                <div className='relative w-10 h-10'>
                    <button className='w-full h-full rounded-full  border border-white/20 cursor-pointer flex items-center justify-center overflow-hidden' onClick={() => setActive(prev => !prev)}>
                        {data.user.profilePic ?
                            <Image src={data.user.profilePic} width={50} height={50} alt={data.user.name} className="rounded-full w-full h-full object-cover object-center" />
                            :
                            <FaCircleUser size={50} />
                        }
                    </button>
                    {
                        active &&
                        <div ref={popUpRef} className="absolute -right-[1rem] top-[75px] w-96 bg-primary border border-white/10 z-[100] rounded-2xl flex flex-col gap-4 items-center p-4">
                            <h3 className='font-semibold'>{data.user.email}</h3>
                            <div className="flex flex-col items-center mx-auto gap-2">
                                <div className='w-24 h-24  border border-white/10 rounded-full flex items-center justify-center'>
                                    {
                                        data.user.profilePic ?
                                            <Image src={data.user.profilePic} width={80} height={80} quality={100} alt={data.user.name} className="rounded-full w-full h-full object-cover object-center" />

                                            :
                                            <FaCircleUser size={100} />
                                    }
                                </div>
                                <h2 className='capitalize text-lg font-bold'>Hi, {data.user.name}</h2>
                            </div>
                            <div className="flex xs:flex-col gap-1 w-full">
                                <Link href={'/profile'} onClick={() => setActive(false)} className='flex-1 bg-white/5 p-2 py-3 flex justify-center rounded-l-md xs:rounded-md hover:bg-white/10 transition-all items-center'>Profile</Link>
                                <button onClick={signOut} className='flex-1 bg-red-500 p-2 py-3 flex justify-center rounded-r-md xs:rounded-md hover:bg-red-600 transition-all items-center'>Logout</button>
                            </div>
                        </div>
                    }
                </div>
                :
                <Link
                    href="/login"
                    className="flex rounded-full"
                    onClick={unmount}
                >
                    <Button varrient={'filled'}>
                        <MdLogin className='fill-inherit' />
                        Login
                    </Button>
                </Link>
    )
}

export default LoginBtn