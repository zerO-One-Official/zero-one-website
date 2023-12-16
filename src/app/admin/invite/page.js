"use client"
import BottomGlitter from '@/components/StyledText/BottomGlitter';
import Button from '@/components/button/Button';
import StyledInput from '@/components/input/StyledInput';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import LoadingText from '@/components/loader/LoadingText';
import { useSession } from 'next-auth/react';
import StyledSelect from '@/components/input/StyledSelect';
import { IoFemale, IoMale } from 'react-icons/io5';
import StyledRadio from '@/components/input/StyledRadio';
import { branchOption } from '@/utils/helper';
import ProfilePhoto from '@/components/ProfilePhoto';
import { useUploadThing } from "@/utils/uploadthing";

const Invite = () => {

    const { data: session } = useSession();


    const [link, setLink] = useState('')
    const [user, setUser] = useState({
        profilePic: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        branch: '',
        roll: '',
    })
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState([]);


    const { startUpload, permittedFileInfo } = useUploadThing(
        "profilePicUploader",
        {
            onClientUploadComplete: async (res) => {
                toast.success("Photo uploaded successfully!");
                try {
                    setLoading(true);

                    const resp = await fetch('/api/signup', {
                        method: "POST",
                        body: JSON.stringify({ ...user, profilePic: res[0]?.url })
                    })

                    const data = await resp.json();
                    if (data.success) {
                        setUser({
                            profilePic: '',
                            firstName: '',
                            lastName: '',
                            gender: '',
                            email: '',
                            phone: '',
                            branch: '',
                            roll: '',
                        })
                    }
                    toast[data.type](data.message);
                } catch (error) {

                    toast.error(error.message);
                }
                finally {

                    setLoading(false);
                }


            },
            onUploadError: (error) => {
                setLoading(false);
                toast.error(error.message);
            },
            onUploadBegin: () => {
                setLoading(true);
            },
        },
    );


    const generateLink = async (e) => {
        e.preventDefault();

        if (loading || !session?.user || session?.user?.role !== 'admin') return;

        try {
            setLoading(true);

            await startUpload(image);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }


    return (
        <div className='container-70 py-12 flex items-center justify-center gap-8 flex-col mt-8'>

            <BottomGlitter text={'Create a Joining Link'} />

            <form onSubmit={generateLink} className='flex flex-col items-center fill-white w-full'>

                <div className="flex items-center justify-center mb-12">
                    <ProfilePhoto permittedFileInfo={permittedFileInfo} setImage={setImage} />
                </div>

                <div className="w-full flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                    <StyledInput
                        id="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        name="firstName"
                        label="First name"
                        required
                        className="w-full"
                    />
                    <StyledInput
                        id="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        name="lastName"
                        label="Last name"
                        required
                        className="w-full"
                    />
                </div>
                <div className="w-full flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
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
                <div className="w-full flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
                    <StyledInput
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                        label="Email"
                        required
                        className="w-full"
                    />
                    <StyledInput
                        id="phone"
                        type="number"
                        value={user.phone}
                        onChange={handleChange}
                        name="phone"
                        label="Mobile no."
                        required
                        className="w-full"
                    />
                </div>
                <div className="w-full flex gap-4 md:gap-2 justify-between items-center flex-wrap xl:flex-col xl:justify-start xl:items-start">
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
                        value={user.roll}
                        onChange={handleChange}
                        name="roll"
                        label="Roll Number"
                        required
                        className="w-full"
                        type="number"
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

export default Invite