"use client"
import Button from '@/components/button/Button'
import StyledInput from '@/components/input/StyledInput'
import Link from 'next/link'
import React, { useState } from 'react'

const LoginPage = () => {

    const [signupForm, setSignupForm] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setSignupForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const signup = (e) => {
        e.preventDefault();
    }

    return (
        <section className='container-70 text-lg'>
            <div className="mt-16">
                <form onSubmit={signup} className='flex flex-col gap-4' autoComplete='false'>
                    <StyledInput
                        id="email"
                        value={signupForm.email}
                        onChange={handleChange}
                        name="email"
                        label="Email"
                        required
                        className="w-full"
                    />
                    <StyledInput
                        id="password"
                        value={signupForm.password}
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        required
                        className="w-full"
                        type="password"
                    />
                    <Link href="/signup" className='text-accent hover:underline ml-auto '>forgot password</Link>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="rememberMe" id="remember-me" className='w-4 h-4' />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <p className='text-base'>Not a registered member ? <Link href="/signup" className='text-accent hover:underline'>Create Account</Link></p>
                    <button type="submit" className="flex rounded-full">
                        <Button
                            style={{ border: 'none' }}
                            className="bg-primary-light text-primary hover:text-primary-light sm:w-full ml-auto "
                        >
                            <span
                                style={{
                                    color: 'inherit',
                                    transition: 'all 300ms ease-in-out',
                                }}
                                className="z-10"
                            >
                                Login
                            </span>
                        </Button>
                    </button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage