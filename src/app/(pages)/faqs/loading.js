import Skeleton from '@/components/skeleton/skeleton'

const loading = () => {
    return (
        <>

            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>


            <section className='grid gap-4 sm:gap-2' >
                <Skeleton className={`mx-auto w-5/6 h-28 mt-6 mb-20`} />
                <Skeleton className={`w-full h-20`} />
                <Skeleton className={`w-full h-20`} />
                <Skeleton className={`w-full h-20`} />
                <Skeleton className={`w-full h-20`} />
            </section>
        </>
    )
}

export default loading