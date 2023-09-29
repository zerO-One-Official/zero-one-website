"use client"
import Button from '@/components/button/Button'
import StyledInput from '@/components/input/StyledInput'
import Link from 'next/link'
import React, { useState } from 'react'
// import toast from 'react-hot-toast'

const SignupPage = () => {

    const [signupForm, setSignupForm] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        // toast('hi')
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
                    <div className="flex gap-4 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                        <StyledInput
                            id="first-name"
                            value={signupForm.fName}
                            onChange={handleChange}
                            name="fName"
                            label="First name"
                            required
                            className="w-full"
                        />
                        <StyledInput
                            id="last-name"
                            value={signupForm.lName}
                            onChange={handleChange}
                            name="lName"
                            label="Last name"
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
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
                            id="phone"
                            value={signupForm.phone}
                            onChange={handleChange}
                            name="phone"
                            label="Mobile no."
                            required
                            className="w-full"
                        />
                    </div>
                    <StyledInput
                        id="roll"
                        value={signupForm.roll}
                        onChange={handleChange}
                        name="roll"
                        label="Roll Number"
                        required
                        className="w-full"
                        type="number"
                    />
                    <div className="flex gap-4 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
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
                            id="confirm-password"
                            value={signupForm.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            label="Re-enter Password"
                            required
                            className="w-full"
                            type="password"
                        />
                    </div>
                    <p className='text-base'>Already a member ? <Link href="/login" className='text-accent hover:underline'>Login</Link></p>
                    <button type="submit" className="flex rounded-full">
                        <Button
                            style={{ border: 'none' }}
                            className="bg-primary-light text-primary hover:text-primary-light ml-auto sm:w-full "
                        >
                            <span
                                style={{
                                    color: 'inherit',
                                    transition: 'all 300ms ease-in-out',
                                }}
                                className="z-10"
                            >
                                Create Account
                            </span>
                        </Button>
                    </button>
                </form>
            </div>
        </section>
    )
}

export default SignupPage