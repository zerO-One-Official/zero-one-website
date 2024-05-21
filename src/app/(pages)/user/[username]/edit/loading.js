import Skeleton from '@/components/skeleton/skeleton'
const loading = () => {
    return (
        <>
            <div className='absolute top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>

            <div className="w-full flex flex-col">
                <div className="flex flex-col">
                    <div className="flex items-center justify-center mb-12">
                        <Skeleton
                            className={'w-32 h-32 rounded-full'}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                            <Skeleton className={'w-full h-12 rounded-lg'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default loading