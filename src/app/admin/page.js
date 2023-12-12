"use client"
import BottomGlitter from '@/components/StyledText/BottomGlitter';
import Button from '@/components/button/Button';
import StyledInput from '@/components/input/StyledInput';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import LoadingText from '@/components/loader/LoadingText';
import { useSession } from 'next-auth/react';

const AdminPage = () => {

    const { data: session } = useSession();


    const [link, setLink] = useState('')
    const [roll, setRoll] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)


    const generateLink = async (e) => {
        e.preventDefault();


        if (loading || !session?.user) return;

        try {
            setLoading(true);

            const res = await fetch('/api/genCode', {
                method: "POST",
                body: JSON.stringify({ roll, email, role: session.user.role })
            })

            const data = await res.json();

            if (res.status === 200) {
                const link = `${window.location.origin}/signup/${data.code}`;
                setLink(link);
            }
            else if (res.status === 409) {
                toast.error(data.message);
                const link = `${window.location.origin}/signup/${data.code}`;
                setLink(link);
            }
            else if (res.status === 401) {
                toast.error(data.message);
            }
            else toast(data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-70 py-12 flex items-center justify-center gap-8 flex-col mt-8'>

            <BottomGlitter text={'Create a Joining Link'} />

            <form onSubmit={generateLink} className='flex flex-col items-center fill-white w-full'>
                <div className="w-full">

                    <StyledInput
                        id="roll"
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        name="roll"
                        label="Roll Number"
                        required
                        className="w-full"
                        type="number"
                    />
                </div>
                <div className="w-full">
                    <StyledInput
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        label="Student Email"
                        required
                        className="w-full"
                        type="email"
                    />
                </div>
                <button >
                    <Button
                        className=" ml-auto sm:w-full "
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

                                    Send Joining Link
                                </span>
                        }

                    </Button>
                </button>
                <p>{link}</p>
            </form>
        </div>
    )
}

export default AdminPage