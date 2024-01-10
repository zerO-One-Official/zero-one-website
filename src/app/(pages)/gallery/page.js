"use client"
import AnimatedScrollButton from '@/components/AnimatedScrollButton'
import BottomGlitter from '@/components/StyledText/BottomGlitter'
import Styles from './gallery.module.css'
import Image from 'next/image'
import useSWR from 'swr'
import Spinner from '@/components/loader/Spinner'
import toast from 'react-hot-toast'

const GalleryPage = () => {

    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading } = useSWR('/api/gallery', fetcher);

    if (error) toast.error(error.message);

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
                            <div className="mt-8">
                                <Spinner />
                            </div>
                            :
                            data &&
                            <div className={`relative mt-8 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-2 p-4 min-h-screen ${Styles.gallery}`}>
                                {
                                    data.gallery.map((e, i) => {
                                        return (
                                            <div className="border border-white/15" key={i}>
                                                <Image src="/logo.png" width={200} height={200} quality={80} className='w-full h-full object-cover object-center' alt="logo" />
                                            </div>
                                        )
                                    })
                                }
                                <div className="fixed"></div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GalleryPage;


