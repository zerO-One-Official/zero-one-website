"use client"


import useSWR from 'swr'
import { useUploadThing } from "@/utils/uploadthing";
import toast from 'react-hot-toast'
import ProfilePhoto from "@/components/ProfilePhoto";
import { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import LoadingText from "@/components/loader/LoadingText";
import StyledInput from "@/components/input/StyledInput";
import { BiEdit, BiLoader } from 'react-icons/bi';

export default function ProfileForm() {

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error, isLoading } = useSWR('/api/profile', fetcher);

    const [userProfile, setUserProfile] = useState(null);

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
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);



    const { startUpload, permittedFileInfo } = useUploadThing(
        "profilePicUploader",
        {
            onClientUploadComplete: () => {
                setLoading(false);
                toast.success("Photo uploaded successfully!");
            },
            onUploadError: (error) => {
                setLoading(false);
                toast.error(error.message)
            },
            onUploadBegin: () => {
                setLoading(true);
            },
        },
    );

    const submitForm = async (e) => {
        e.preventDefault();
        toast('Comming Soon...')
        // if (data.user.email === userProfile.email &&
        //     data.user.phone === userProfile.phone &&
        //     data.user.profilePic === userProfile.profilePic) return;

        // if (image.length) {
        //     await startUpload(image);
        // }

    }

    const handleChange = (e) => {
        setUserProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    return (
        (isLoading || !userProfile)
            ?
            <div>
                <BiLoader className='animate-spin' />
            </div>

            :

            <form onSubmit={submitForm} className='w-full flex flex-col'>
                <div className="flex items-center justify-center mb-12">
                    <ProfilePhoto permittedFileInfo={permittedFileInfo} setImage={setImage} disabled={edit} profilePic={userProfile.profilePic} />
                </div>
                <div className="flex flex-col">
                    <button type='button' className='ml-auto p-1 hover:bg-white fill-white hover:fill-primary rounded-md'
                        title='Edit Profile'
                        // onClick={() => { setEdit(prev => !prev) }}
                        onClick={() => { toast('Comming Soon...') }}
                    >
                        <BiEdit size={20} fill='inherit' />
                    </button>
                    <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                        <StyledInput value={userProfile?.firstName} name='firstName' label='First Name' className='capitalize' onChange={handleChange} disabled={true} />
                        <StyledInput value={userProfile?.lastName} name='lastName' label='Last Name' className='capitalize' onChange={handleChange} disabled={true} />
                    </div>
                    <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                        <StyledInput type="email" value={userProfile?.email} name='email' label='Email' onChange={handleChange} disabled={edit} />
                        <StyledInput type="number" value={userProfile?.phone} name='phone' label='Phone' onChange={handleChange} disabled={edit} />
                    </div>
                    <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                        <StyledInput value={userProfile?.branch} name='branch' label='Branch' onChange={handleChange} disabled={true} />
                        <StyledInput value={userProfile?.roll} name='roll' label='Roll no.' onChange={handleChange} disabled={true} />
                    </div>
                    {
                        (data.user.email !== userProfile.email || data.user.phone !== userProfile.phone)
                            ?


                            <button type="submit" className='ml-auto'>
                                <Button>
                                    {
                                        loading ?
                                            <LoadingText />
                                            :
                                            "Update"
                                    }
                                </Button>
                            </button>
                            :
                            null
                    }
                </div>
            </form>
    );
}
