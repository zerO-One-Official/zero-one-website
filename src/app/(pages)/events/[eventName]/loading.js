import Skeleton from "@/components/skeleton/skeleton"

const loading = () => {
    return (
        <>
            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>


            <div className="container-70 min-h-screen pt-10 flex flex-col">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-6 gap-2">
                        <Skeleton className={'w-full h-14'} />
                        <Skeleton className={'w-full h-14'} />
                        <Skeleton className={'w-full h-14'} />
                    </div>

                    <Skeleton className="w-full h-96"></Skeleton>
                </div>
            </div>
        </>
    )
}

export default loading