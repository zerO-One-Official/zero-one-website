"use client"
import BottomGlitter from '@/components/StyledText/BottomGlitter'
import Button from '@/components/button/Button'
import StyledInput from '@/components/input/StyledInput'
import LoadingText from '@/components/loader/LoadingText'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

const SignupPage = () => {

    const router = useRouter();
    const token = useSearchParams().get('token');


    if (!token) redirect('/login');

    const [loading, setLoading] = useState(false);

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error, isLoading } = useSWR(`/api/profile/${token}`, fetcher);

    if (error) {
        toast.error(error.message);
    }

    const [signupForm, setSignupForm] = useState({
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setSignupForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }


    const signup = async (e) => {
        e.preventDefault();

        if (loading || !token) return;

        if (signupForm.password !== signupForm.confirmPassword)
            return toast.error('Password does not matched.')


        try {
            setLoading(true);
            const res = await fetch('/api/signup', {
                method: 'PUT',
                body: JSON.stringify({ token, password: signupForm.password })
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
                {
                    isLoading ?
                        null
                        :
                        data?.user?.firstName ?

                            <BottomGlitter text={`hi, ${data?.user?.firstName} `} />
                            :
                            <BottomGlitter text={`Why are you here?`} />
                }
                {

                    data?.user?.firstName ?
                        <form method='POST' onSubmit={signup} className='flex flex-col gap-4 w-11/12 mx-auto'>
                            <div className="flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                                <StyledInput
                                    id="password"
                                    value={signupForm.password}
                                    onChange={handleChange}
                                    name="password"
                                    label="Create Password"
                                    required
                                    className="w-full"
                                    type="password"
                                />
                                <StyledInput
                                    id="confirmPassword"
                                    value={signupForm.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    label="Re-enter Password"
                                    required
                                    className="w-full"
                                    type="password"
                                />
                            </div>

                            {/* <p className='text-base'>Already a member ? <Link href="/login" className='text-accent hover:underline'>Login</Link></p> */}

                            <button type="submit" className="flex rounded-full">
                                <Button
                                    style={{ border: 'none' }}
                                    className="bg-primary-light text-primary hover:text-primary-light ml-auto sm:w-full "
                                >
                                    {
                                        loading ?
                                            <LoadingText />
                                            :
                                            "Activate Account"
                                    }
                                </Button>
                            </button>
                        </form>
                        :
                        null
                }

            </div>
        </section >
    )
}

export default SignupPage