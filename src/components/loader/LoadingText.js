import React from 'react'
import { BiLoader } from 'react-icons/bi'

const LoadingText = () => {
    return (
        <span className='flex gap-1 items-center text-inherit fill-primary hover:fill-inherit group-hover:fill-primary-light'>
            <BiLoader className='animate-spin fill-inherit' size={20} />
            Please wait...
        </span>
    )
}

export default LoadingText