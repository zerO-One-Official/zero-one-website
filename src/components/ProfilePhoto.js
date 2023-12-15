"use client"

import Image from 'next/image'
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useCallback, useState } from "react";
import { BiCamera } from 'react-icons/bi';
import toast from 'react-hot-toast'

const ProfilePhoto = ({ permittedFileInfo, setImage, disabled, profilePic }) => {

    const [imageUrl, setImageUrl] = useState(profilePic);

    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles);
    }, [setImage]);

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getInputProps, getRootProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    const handleImageSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        else if (file.size > 1024 * 512) {
            return toast.error('Image must be less than 256KB')
        }
        setImage([file]);
        const blob = new Blob([file], { type: file.type });
        const objectURL = URL.createObjectURL(blob);
        setImageUrl(objectURL);
    }

    return (
        <div
            className="bg-transparent w-32 h-32 rounded-full overflow-hidden border border-white/25 relative cursor-pointer"
            {...getRootProps()}
        >
            {
                !imageUrl ?
                    <span className='bg-white/10 absolute w-full h-full left-0 top-0 flex items-center justify-center pointer-events-none'>
                        <BiCamera size={30} opacity={.25} />
                    </span>
                    :
                    null
            }

            <input
                {...getInputProps()}
                type="file"
                onChange={handleImageSelect}
                disabled={disabled}
            />

            {
                imageUrl ?
                    <Image className="w-full h-full object-cover rounded-full"
                        width={150}
                        height={150}
                        src={imageUrl}
                        alt={'profilePic'}
                    />
                    :
                    null
            }
        </div>
    )
}

export default ProfilePhoto