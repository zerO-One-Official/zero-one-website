"use client"
import Button from '@/components/button/Button';
import StyledInput from '@/components/input/StyledInput';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { LuSend } from 'react-icons/lu'
import toast from 'react-hot-toast'
function ThankYou({ show }) {
    const router = useRouter();

    return (
        <div
            style={{ transition: 'all 400ms ease-in-out' }}
            className={`mt-28 mb-12 pt-10 pb-8 sm:mt-20 sm:mb-10 absolute ${show ? 'visible relative' : 'invisible'
                }`}
        >
            <h1 className="text-7xl sm:text-5xl">
                Thank You!
                <br />
                We&apos;ll be in touch shortly.
            </h1>
            <p className="mt-20 w-3/5 text-lg xl:w-3/5 sm:w-3/4 sm:text-base">
                Feel free to explore some interesting topics on our{' '}
                <span>
                    <a className="text-blue" href="#">
                        blog
                    </a>
                </span>{' '}
                and roam around the{' '}
                <span>
                    <a className="text-blue" href="/">
                        website
                    </a>
                </span>
            </p>
            <div className="mt-16">
                <Button
                    onClick={() => router.push('/')}
                >
                    Back to home
                </Button>
            </div>
        </div>
    );
}

const ContactPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useRef();

    const sendEmail = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (!name || !email || !message || !roll) {
            toast.error('Please fill all fields.')
        }

        try {
            const res = await fetch('/api/contactUs', {
                method: "POST",
                body: JSON.stringify({ name, email, message, roll })
            });
            const data = await res.json();

            if (data.success) {
                window.scrollTo(0, 0);
                setShow(true);
            }
            toast[data.type](data.message);
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section className="container-70 overflow-hidden">
            <ThankYou show={show} />
            <div className={`${show ? 'invisible hidden' : 'visible'} z-10`}>
                <div className="mt-28 mb-12 pt-10 pb-8 sm:mt-20 sm:mb-10">
                    <h1 className="text-7xl sm:text-5xl">
                        Interested?
                        <br />
                        Let&apos;s talk!
                    </h1>
                    <p className="mt-20 w-2/5 text-lg xl:w-3/5 sm:w-3/4 sm:text-base">
                        Just fill this simple form in and we will contact you promptly.
                        Hate forms? Drop us a line at{' '}
                        <span>
                            <a
                                className="text-blue"
                                href="mailto:zerooneofficial.mce@gmail.com"
                            >
                                zerooneofficial.mce@gmail.com
                            </a>
                        </span>
                    </p>
                </div>
                <div className="mt-16">
                    <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center gap-2 flex-wrap xl:flex-col xl:justify-start xl:items-start">
                            <StyledInput
                                id="nameInput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                                label="Your name"
                                required
                                className="w-3/5"
                            />
                            <StyledInput
                                value={roll}
                                onChange={(e) => setRoll(e.target.value)}
                                name="roll"
                                type="number"
                                label="Your Roll no."
                                required
                                className="w-3/5"
                            />
                        </div>
                        <StyledInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            label="Your email"
                            required
                            className="w-4/5"
                        />
                        <StyledInput
                            type="desc"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            label="Your message"
                            required
                            className="w-4/5"
                        />
                        <Button varrient={'filled'} type="submit" className={'ml-auto mt-16 flex rounded-full'} loading={loading}>
                            Submit
                            <LuSend className='stroke-inherit' />
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactPage