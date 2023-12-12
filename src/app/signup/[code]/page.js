"use client"
import Button from '@/components/button/Button'
import StyledInput from '@/components/input/StyledInput'
import StyledRadio from '@/components/input/StyledRadio'
import StyledSelect from '@/components/input/StyledSelect'
import LoadingText from '@/components/loader/LoadingText'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoFemale, IoMale } from "react-icons/io5";

const SignupPage = ({ params }) => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [signupForm, setSignupForm] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        roll: '',
        branch: '',
        phone: '',
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
        const { code } = params;

        if (loading || !code) return;

        try {
            setLoading(true)
            const res = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({ ...signupForm, code })
            })

            const data = await res.json();

            if (res.status === 409) router.push('/login');
            if (res.status === 200) {

                signIn('credentials', {
                    emailOrRoll: signupForm.roll,
                    password: signupForm.password,
                    redirect: false
                })
                    .then(({ ok, error }) => {
                        if (ok) {
                            router.push("/");
                        } else {
                            toast.error(error);
                        };
                    })
            };

            toast(data.message);

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    const branchOption = [
        {
            value: 'Computer Science & Engineering',
            label: 'Computer Science & Engineering'
        },
        {
            value: 'Electrical & Electronics Engineering',
            label: ' Electrical & Electronics Engineering'
        },
        {
            value: 'Mechanical Engineering',
            label: 'Mechanical Engineering'
        },
        {
            value: 'Civil Engineering',
            label: 'Civil Engineering'
        },
        {
            value: 'Artificial Intelligence',
            label: 'Artificial Intelligence'
        },
        {
            value: 'Civil with Computer Applications',
            label: 'Civil with Computer Applications'
        },
    ]


    return (
        <section className='container-70 text-lg' >
            <div className="mt-16">
                <form method='POST' onSubmit={signup} className='flex flex-col gap-4 w-11/12 mx-auto'>
                    <div className="flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                        <StyledInput
                            id="firstName"
                            value={signupForm.firstName}
                            onChange={handleChange}
                            name="firstName"
                            label="First name"
                            required
                            className="w-full"
                        />
                        <StyledInput
                            id="lastName"
                            value={signupForm.lastName}
                            onChange={handleChange}
                            name="lastName"
                            label="Last name"
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                        <StyledRadio
                            label={'Gender'}
                            name={'gender'}
                            required
                            onChange={handleChange}
                            radioGroup={[
                                {
                                    id: "male",
                                    label: "Male",
                                    icon: <IoMale className='fill-inherit' />
                                },
                                {
                                    id: "female",
                                    label: "Female",
                                    icon: <IoFemale className='fill-inherit' />
                                }
                            ]}
                        />
                    </div>
                    <div className="flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                        <StyledInput
                            id="email"
                            type="email"
                            value={signupForm.email}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                            required
                            className="w-full"
                        />
                        <StyledInput
                            id="phone"
                            type="number"
                            value={signupForm.phone}
                            onChange={handleChange}
                            name="phone"
                            label="Mobile no."
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">

                        <StyledSelect
                            id="branch"
                            name="branch"
                            required
                            label="Select Branch"
                            options={branchOption}
                            onChange={handleChange}
                        />

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
                    </div>
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
                    <p className='text-base'>Already a member ? <Link href="/login" className='text-accent hover:underline'>Login</Link></p>
                    <button type="submit" className="flex rounded-full hover:fill-primary-light" onClick={() => console.log('clicked')}>
                        <Button
                            style={{ border: 'none' }}
                            className="bg-primary-light text-primary hover:text-primary-light ml-auto sm:w-full "
                        >
                            {
                                loading ?
                                    <LoadingText />
                                    :
                                    <span
                                        style={{
                                            color: 'inherit',
                                            transition: 'all 300ms ease-in-out',
                                        }}
                                        className="z-10"
                                    >
                                        Create Account
                                    </span>
                            }
                        </Button>
                    </button>
                </form>
            </div>
        </section >
    )
}

export default SignupPage