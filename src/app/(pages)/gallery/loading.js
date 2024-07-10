import Skeleton from "@/components/skeleton/skeleton"

const loading = () => {
    return (
        <>
            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>
            <div className="mt-10 mb-8 sm:my-8 px-20 2xl:px-10 xl:px-8 sm:px-6 xs:px-3">
                <div className="flex gap-10 flex-col h-[calc(100vh-100px-3rem)] items-center sm:h-[calc(90vh-100px-1rem)]">
                    <Skeleton className={'w-72 h-16'} />
                    <div className="mt-10 w-full flex flex-col gap-4">
                        <Skeleton className={'w-72 h-16'} />
                        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
                            <Skeleton className={'h-48'} />
                            <Skeleton className={'h-48'} />
                            <Skeleton className={'h-48'} />
                            <Skeleton className={'h-48'} />
                        </div>
                    </div>
                    <div className="mt-10 w-full flex flex-col gap-4">
                        <Skeleton className={'w-72 h-16'} />
                        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                            <Skeleton className={'h-48'} />
                            <Skeleton className={'h-48'} />
                            <Skeleton className={'h-48'} />
                            <Skeleton className={'h-48'} />
                            <Skeleton className={'h-48'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default loading