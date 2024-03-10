"use client"
import { useUploadThing, utapi } from "@/utils/uploadthing";
import toast from 'react-hot-toast'
import ProfilePhoto from "@/components/ProfilePhoto";
import { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import StyledInput from "@/components/input/StyledInput";
import { BiEdit } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import BottomGlitter from '@/components/StyledText/BottomGlitter';
import useSWR from 'swr';
import Spinner from "@/components/loader/Spinner";

export default function ProfileForm() {

    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading, mutate } = useSWR('/api/profile', fetcher);
    const [loading, setLoading] = useState(false);

    const [userProfile, setUserProfile] = useState(data);

    const [password, setPassword] = useState({
        oldPass: '',
        newPass: '',
        confirmPass: '',
        loading: false
    });

    useEffect(() => {
        if (data && data.user) {
            setUserProfile(data.user);
        }
    }, [data])

    if (error) {
        toast.error(error.message);
        setLoading(false);
    }

    const [image, setImage] = useState([]);
    const [edit, setEdit] = useState(false);



    const { startUpload, permittedFileInfo } = useUploadThing(
        "profilePicUploader",
        {
            onClientUploadComplete: async (res) => {
                setLoading(false);

                const profilePic = res[0].url;

                try {
                    const { email, phone, gitHub, linkedIn, username } = userProfile;
                    setLoading(true);
                    const resp = await fetch('/api/profile', {
                        method: "PUT",
                        body: JSON.stringify({ email, phone, profilePic, gitHub, linkedIn, username })
                    })

                    const respData = await resp.json();

                    if (respData.success) {
                        mutate({ ...data, ...respData.profile });
                    }
                    else mutate({ ...data })

                    if (respData.status === 409) {
                        setUserProfile(prev => ({ ...prev, username: data.username }));
                    }

                    toast[respData.type](respData.message);

                } catch (error) {
                    // console.log(error);
                    toast.error(error.message);
                }
                finally {
                    setLoading(false);
                    setEdit(false);
                }

            },
            onUploadError: (error) => {
                setLoading(false);
                toast.error(error.message)
            },
            onUploadBegin: () => {

                const { email, phone, profilePic, linkedIn, gitHub, username } = userProfile;

                if (data.user.email === email &&
                    data.user.phone === phone &&
                    data.user.linkedIn === linkedIn &&
                    data.user.gitHub === gitHub &&
                    data.user.profilePic === profilePic &&
                    data.user.username === username) return;

                setLoading(true);
            },
        },
    );

    const submitForm = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (image.length) {
            await startUpload(image);
        }
        else
            try {

                setLoading(true);
                const { email, phone, username, gitHub, linkedIn } = userProfile;
                const resp = await fetch('/api/profile', {
                    method: "PUT",
                    body: JSON.stringify({ email, phone, username, gitHub, linkedIn })
                })

                const respData = await resp.json();

                if (respData.success) {
                    mutate({ ...data, ...respData.profile });
                }
                else mutate({ ...data })

                if (respData.status === 409) {
                    setUserProfile(prev => ({ ...prev, username: data.username }));
                }

                toast[respData.type](respData.message);

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
            finally {
                setLoading(false);
                setEdit(false);
            }

    }

    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            setPassword(prev => ({ ...prev, loading: true }))
            const { oldPass, newPass, confirmPass } = password;

            if (newPass !== confirmPass) return toast.error('Passwords not Matched.')

            const res = await fetch('/api/profile/updatePassword', {
                method: "PUT",
                body: JSON.stringify({ oldPass, newPass, })
            })

            const data = await res.json();
            if (data.success) {
                setPassword({ oldPass: '', newPass: '', confirmPass: '' })
            }

            toast[data.type](data.message);

        } catch (error) {
            // console.log(error);
            toast.error(error.message);
        }
        finally {
            setPassword(prev => ({ ...prev, loading: false }))
        }
    }

    const handleChange = (e) => {
        setUserProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    }


    return (
        (isLoading || !userProfile)
            ?
            <Spinner />

            :
            <div className='w-full flex flex-col'>
                <form onSubmit={submitForm} className='flex flex-col'>
                    <div className="flex items-center justify-center mb-12">
                        <ProfilePhoto permittedFileInfo={permittedFileInfo} setImage={setImage} disabled={!edit} profilePic={userProfile.profilePic} startUpload={startUpload} loading={loading} />
                    </div>
                    <div className="flex flex-col">
                        <button type='button' className='ml-auto p-1 hover:bg-white fill-white hover:fill-primary rounded-md'
                            title='Edit Profile'
                            onClick={() => { setEdit(prev => !prev) }}
                        >
                            <BiEdit size={20} fill='inherit' />
                        </button>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <StyledInput value={userProfile?.username} name='username' label='Username' onChange={handleChange} disabled={!edit} />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <StyledInput value={userProfile?.firstName} name='firstName' label='First Name' className='capitalize' onChange={handleChange} disabled={true} />
                            <StyledInput value={userProfile?.lastName} name='lastName' label='Last Name' className='capitalize' onChange={handleChange} disabled={true} />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <StyledInput type="email" value={userProfile?.email} name='email' label='Email' onChange={handleChange} disabled={!edit} />
                            <StyledInput type="number" value={userProfile?.phone} name='phone' label='Phone' onChange={handleChange} disabled={!edit} />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <StyledInput value={userProfile?.branch} name='branch' label='Branch' onChange={handleChange} disabled={true} />
                            <StyledInput value={userProfile?.roll} name='roll' label='Roll no.' onChange={handleChange} disabled={true} />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <StyledInput value={userProfile?.gitHub} name='gitHub' label='GitHub Link' onChange={handleChange} disabled={!edit} />
                            <StyledInput value={userProfile?.linkedIn} name='linkedIn' label='LinkedIn Link' onChange={handleChange} disabled={!edit} />
                        </div>
                        {
                            (data?.user?.email !== userProfile?.email || data?.user?.phone !== userProfile?.phone || data?.user?.gitHub !== userProfile?.gitHub || data?.user?.linkedIn !== userProfile?.linkedIn || data?.user?.username !== userProfile?.username)
                                ?
                                <Button type="submit" className='ml-auto' loading={loading}>
                                    Update Profile

                                </Button>
                                :
                                null
                        }
                    </div>
                </form>
                <form className="mt-12 flex flex-col" onSubmit={updatePassword}>
                    <BottomGlitter text="Update Password" />
                    <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full mt-10">
                        <StyledInput type="password" value={password?.oldPass} name='oldPass' label='Old Password' onChange={(e) => { setPassword(prev => ({ ...prev, [e.target.name]: e.target.value })) }} />
                    </div>
                    <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                        <StyledInput type="password" value={password?.newPass} name='newPass' label='Set Password' onChange={(e) => { setPassword(prev => ({ ...prev, [e.target.name]: e.target.value })) }} />
                        <StyledInput type="password" value={password?.confirmPass} name='confirmPass' label='Confirm Password' onChange={(e) => { setPassword(prev => ({ ...prev, [e.target.name]: e.target.value })) }} />
                    </div>
                    {
                        (password.oldPass && password.newPass && password.confirmPass)
                            ?
                            <Button type="submit" className='ml-auto' loading={password.loading}>
                                Update Password
                            </Button>
                            :
                            null
                    }
                </form>
            </div>
    );
}
