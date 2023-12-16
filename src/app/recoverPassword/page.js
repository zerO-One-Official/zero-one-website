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

    const [loading, setLoading] = useState(false);

    const [emailOrRoll, setEmailOrRoll] = useState('')



    const sendPasswordResetLink = async (e) => {
        e.preventDefault();

        if (emailOrRoll === '') return toast.error('please enter your roll or email');

        try {
            setLoading(true);
            const res = await fetch('/api/resetPassword', {
                method: 'POST',
                body: JSON.stringify({ emailOrRoll })
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
                <BottomGlitter text={'Forgot Password'} />

                <form method='POST' onSubmit={sendPasswordResetLink} className='flex flex-col gap-4 w-11/12 mx-auto'>
                    <div className="flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                        <StyledInput
                            id="emailOrRoll"
                            value={emailOrRoll}
                            onChange={(e) => { setEmailOrRoll(e.target.value) }}
                            name="emailOrRoll"
                            label="Email or Roll"
                            required
                            className="w-full"
                            type="text"
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
                                    "Send Reset Link"
                            }
                        </Button>
                    </button>
                </form>
            </div>
        </section >
    )
}

export default SignupPage