import Skeleton from "@/components/skeleton/skeleton"

const loading = () => {
    return (
        <>
            <div className='fixed top-[80px] left-0 w-full h-1 z-[999] bg-gradient-to-r from-red-400 to-blue-400 animate-gradient animate-gradient'></div>

            <section className='container-70 grid place-items-center h-[calc(100vh-88px)] ' >
                <Skeleton className="w-4/5 md:w-ful h-[447px]" />
            </section>
        </>

    )
}

export default loading