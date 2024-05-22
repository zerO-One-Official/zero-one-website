import Skeleton from '@/components/skeleton/skeleton'
import React from 'react'

const loading = () => {
    return (
        <>
            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>

            <div className="container-70 mb-8 sm:my-8 flex">
                <div className="flex flex-col mt-10 mx-auto justify-between items-center w-full">
                    <Skeleton className={'w-72 h-16'} />
                    <div className=" md:mt-10 mt-20 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 w-full">
                        <Skeleton className={'w-full h-72'} />
                        <Skeleton className={'w-full h-72'} />
                        <Skeleton className={'w-full h-72'} />
                        <Skeleton className={'w-full h-72'} />
                        <Skeleton className={'w-full h-72'} />
                        <Skeleton className={'w-full h-72'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default loading