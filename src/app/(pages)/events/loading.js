import Skeleton from "@/components/skeleton/skeleton"

const loading = () => {
    return (
        <>
            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>

            <div className="container-70">
                <section className={`flex xl:flex-col flex-auto my-40 sm:my-20`}>
                    <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
                        <Skeleton className={'w-72 h-16'} />
                    </div>
                    <div
                        className={`text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0`}
                    >
                        <Skeleton className={'w-full h-72'} />
                    </div>
                </section>
                <section className={`flex xl:flex-col flex-auto my-40 sm:my-20`}>
                    <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
                        <Skeleton className={'w-72 h-16'} />
                    </div>
                    <div
                        className={`text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0`}
                    >
                        <Skeleton className={'w-full h-72'} />
                    </div>
                </section>
            </div>
        </>
    )
}

export default loading