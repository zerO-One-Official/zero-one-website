"use client"
import AnimatedScrollButton from '@/components/AnimatedScrollButton'
import BottomGlitter from '@/components/StyledText/BottomGlitter'
import Styles from './gallery.module.css'
import Image from 'next/image'
import useSWR from 'swr'
import Spinner from '@/components/loader/Spinner'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { BiLeftArrow, BiRightArrow, BiX } from 'react-icons/bi'

const GalleryPage = () => {

    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading } = useSWR('/api/gallery', fetcher);
    const [index, setIndex] = useState(null)

    if (error) {
        toast.error(error.message);
        console.log(error);
    }

    const inlarger = (i) => {
        setIndex(i);
        document.documentElement.classList.add('scroll-lock');
    }

    return (
        <div>
            <div className="text-center mt-10 mb-8 sm:my-8">
                <div className="flex flex-col justify-between h-[calc(100vh-100px-3rem)] items-center sm:h-[calc(90vh-100px-1rem)]">
                    <BottomGlitter text="Our Gallery" />
                    <AnimatedScrollButton
                        onClick={() =>
                            document.getElementById('scrolled-to').scrollIntoView()
                        }
                    />
                </div>
                <div id='scrolled-to'>
                    {
                        isLoading ?
                            <div className="mt-16 p-8">
                                <Spinner />
                            </div>
                            :
                            data &&
                            <div className={`relative mt-16 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-2 p-4 min-h-screen ${Styles.gallery}`}>
                                {
                                    data.gallery.map((gall, i) => {
                                        return (
                                            <div className="border border-white/15 cursor-pointer" key={i} onClick={() => { inlarger(i) }}>
                                                <Image src={gall.url} width={500} height={500} className='w-full h-full object-cover object-center' alt={gall.eventName} />
                                            </div>
                                        )
                                    })
                                }
                                <div className={`fixed w-screen h-screen flex items-center justify-center top-0 left-0 bg-black ${index !== null ? 'visible z-[1000]' : 'invisible z-0'}`}>
                                    {
                                        index !== null ? <>
                                            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-[1000]">
                                                <Spinner />
                                            </div>
                                            <Image src={data?.gallery[index].url} width={1024} height={768} className='w-full h-full object-contain object-center my-auto' alt={data?.gallery[index].eventName} />
                                        </>
                                            : null
                                    }
                                    <BiX className=' p-1 fixed right-4 top-4 w-10 h-10 z-[1000] cursor-pointer bg-red-600 rounded-sm' onClick={() => {
                                        setIndex(null);
                                        document.documentElement.classList.remove('scroll-lock');
                                    }} />
                                    {/* <BiRightArrow className=' p-1 fixed right-4 top-1/2 -translate-y-[20%] w-8 h-8 z-[1000] cursor-pointer bg-black rounded-sm' onClick={() => {
                                        setIndex(prev => {
                                            if (prev < data.gallery.length - 2) return prev + 1
                                        });
                                    }} />
                                    <BiLeftArrow className=' p-1 fixed left-4 top-1/2 -translate-y-[20%] w-8 h-8 z-[1000] cursor-pointer bg-black rounded-sm' onClick={() => {
                                        setIndex(prev => {
                                            if (prev > 0) return prev - 1;
                                        });
                                    }} /> */}
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GalleryPage;


