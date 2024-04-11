import React from 'react'
import { BiLoader } from 'react-icons/bi'

const Spinner = () => {
    return (
        <div className='h-full flex items-center justify-center w-full pointer-events-none'>
            <BiLoader className='animate-spin' size={50} />
        </div>
    )
}

export default Spinner