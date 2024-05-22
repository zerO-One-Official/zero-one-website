import Skeleton from "@/components/skeleton/skeleton"

const loading = () => {
    return (
        <>
            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>

            <div className="mt-10 mb-8 sm:my-8">
                <div className="flex flex-col justify-between h-[calc(100vh-100px-3rem)] items-center sm:h-[calc(90vh-100px-1rem)]">
                    <Skeleton className={'w-72 h-16'} />
                    <Skeleton className="w-14 h-24" />
                </div>
            </div>
        </>
    )
}

export default loading