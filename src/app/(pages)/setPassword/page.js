"use client"
import BottomGlitter from '@/components/StyledText/BottomGlitter'
import Button from '@/components/button/Button'
import StyledInput from '@/components/input/StyledInput'
import LoadingText from '@/components/loader/LoadingText'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {

    const router = useRouter();
    const token = useSearchParams().get('token');

    if (!token) redirect('/login');

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }


    const updatePassword = async (e) => {
        e.preventDefault();

        if (loading || !token) return;

        if (user.password !== user.confirmPassword)
            return toast.error('Password does not matched.')


        try {
            setLoading(true);
            const res = await fetch('/api/resetPassword', {
                method: 'PUT',
                body: JSON.stringify({ token, password: user.password })
            })

            const data = await res.json();

            if (res.status === 200) {
                router.push("/login");
            };

            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }



    return (
        <section className='container-70 text-lg' >
            <div className="mt-16">
                <BottomGlitter text={'Set a Password'} />

                <form method='POST' onSubmit={updatePassword} className='flex flex-col gap-4 w-11/12 mx-auto'>
                    <div className="flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                        <StyledInput
                            id="password"
                            value={user.password}
                            onChange={handleChange}
                            name="password"
                            label="Create a new Password"
                            required
                            className="w-full"
                            type="password"
                        />
                        <StyledInput
                            id="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            label="Re-enter Password"
                            required
                            className="w-full"
                            type="password"
                        />

                    </div>
                    {/* <p className='text-base'>Already a member ? <Link href="/login" className='text-accent hover:underline'>Login</Link></p> */}
                    <Button type="submit" className="flex rounded-full ml-auto" loading={loading}>
                        Set Password
                    </Button>
                </form>
            </div>
        </section >
    )
}

export default SignupPage