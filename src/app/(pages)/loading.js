import React from 'react'

const loading = () => {
    return (
        <>
            <div className='absolute top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>

            <section className='relative h-[81vh] bg-container-70 flex items-center justify-center' >
                {/* <div className={styles.content}>
                    <Heading text="Create." link={'create'} />
                    <Heading text="Code." link={'code'} />
                    <Heading text="Conquer." link={'conquer'} />
                </div> */}
            </section>
        </>
    )
}

export default loading