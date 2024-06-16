import Skeleton from '@/components/skeleton/skeleton'

const loading = () => {
    return (
        <>

            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>
            <div className="container-70 flex flex-col gap-4 min-h-[calc(100vh-88px)] pt-16">
                <section className="flex flex-col gap-6 border border-white/5 shadow-cus shadow-black p-6 rounded-3xl relative">
                    <div className="flex w-full md:gap-6 gap-10 items-center sm:flex-col">
                        <div className="p-2 shrink-0">
                            <Skeleton className={`w-40 h-40 rounded-full`} />
                        </div>
                        <div className="p-4 space-y-2 ">
                            <Skeleton className="w-80 h-10" />
                            <Skeleton className="w-96 h-6" />
                            <Skeleton className="w-28 h-6" />
                        </div>
                    </div>

                    <div className="flex gap-6 xl:flex-col w-full">
                        <Skeleton className={'flex-1 h-28'} />
                        <Skeleton className={'flex-1 h-28'} />
                        <Skeleton className={'flex-1 h-28'} />
                    </div>

                    <Skeleton className={`w-80 h-10`} />
                    <div className="gap-2 grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
                        <Skeleton className={'h-56'} />
                        <Skeleton className={'h-56'} />
                        <Skeleton className={'h-56'} />
                    </div>

                </section>
            </div>
        </>
    )
}

export default loading