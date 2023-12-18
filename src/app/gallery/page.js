"use client"
import AnimatedScrollButton from '@/components/AnimatedScrollButton'
import BottomGlitter from '@/components/StyledText/BottomGlitter'
import React from 'react'

const GalleryPage = () => {
    return (
        <div>
            <div className="text-center mt-10 mb-8 sm:my-8">
                <div className="flex flex-col justify-between h-[calc(100vh-100px-3rem)] items-center sm:h-[calc(90vh-100px-1rem)]">
                    <BottomGlitter text="Our Gallery" />
                    <AnimatedScrollButton
                    // onClick={() =>
                    //     document.getElementById('scrolled-to').scrollIntoView()
                    // }
                    />
                </div>
            </div>
        </div>
    )
}

export default GalleryPage