"use client"
import Button from '@/components/button/Button'
import StyledInput from '@/components/input/StyledInput'
import LoadingText from '@/components/loader/LoadingText'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import BottomGlitter from '@/components/StyledText/BottomGlitter'

const LoginPage = () => {


    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const [loginForm, setLoginForm] = useState({
        emailOrRoll: '',
        password: '',
    })

    const handleChange = (e) => {
        setLoginForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const logIn = (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            signIn('credentials', {
                ...loginForm,
                redirect: false
            })
                .then(({ ok, error }) => {
                    if (ok) {
                        router.push("/");
                    } else {
                        toast.error(error);
                    };
                })

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <section className='container-70 text-lg'>
            <div className="mt-16">
                <BottomGlitter text={'Login'} />
                <form method='POST' onSubmit={logIn} className='flex flex-col gap-4 mt-8' autoComplete='false'>
                    <StyledInput
                        id="emailOrRoll"
                        value={loginForm.emailOrRoll}
                        onChange={handleChange}
                        name="emailOrRoll"
                        label="Email or Roll no."
                        required
                        className="w-full"
                    />
                    <StyledInput
                        id="password"
                        value={loginForm.password}
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        required
                        className="w-full"
                        type="password"
                    />
                    <Link href="/recoverPassword" className='text-accent hover:underline ml-auto'>forgot password?</Link>
                    {/* <div className="flex gap-2 items-center">
                        <input type="checkbox" name="rememberMe" id="remember-me" className='w-4 h-4' />
                        <label htmlFor="remember-me">Remember me</label>
                    </div> */}
                    {/* <p className='text-base'>Not a registered member ? <Link href="/signup" className='text-accent hover:underline'>Create Account</Link></p> */}
                    <button type="submit" className="flex rounded-full">
                        <Button
                            style={{ border: 'none' }}
                            className="bg-primary-light text-primary hover:text-primary-light sm:w-full ml-auto "
                        > {
                                loading ?
                                    <LoadingText />
                                    :
                                    'Login'
                            }
                        </Button>
                    </button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage