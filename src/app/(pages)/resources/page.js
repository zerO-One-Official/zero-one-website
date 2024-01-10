'use client'
import BottomGlitter from "@/components/StyledText/BottomGlitter"
import Spinner from "@/components/loader/Spinner"
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import useSWR from 'swr';

const ResourcesPage = () => {

    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading } = useSWR(`/api/resources`, fetcher);
    if (error) toast.error(error.message);

    return (
        <div className="container-70 mb-8 sm:my-8 flex">
            <div className="flex flex-col mt-10 mx-auto justify-between items-center w-full">
                <BottomGlitter text={'Club Resources'} />
                <div className=" md:mt-10 mt-20 grid grid-cols-[repeat(auto-fit,minmax(168px,1fr))] gap-5 w-full">
                    {
                        (isLoading || !data) ?
                            <Spinner />
                            :
                            data?.resources?.length === 0 ?
                                <div className="flex w-full justify-center p-2 text-2xl text-red-600">
                                    No Resources Found
                                </div>
                                :
                                data?.resources?.map(resource => {
                                    return (
                                        <Link href={`resources/${resource.domain}`} className="flex flex-col items-center bg-primary hover:scale-110 transition-all ease-in-out duration-300" key={resource._id}
                                        >
                                            <div className="p-5 py-10">
                                                <Image src={resource.image} width={200} height={200} alt={resource.domain} className="w-32 h-auto transition-all"
                                                />
                                            </div>
                                            <div className="text-center p-2">
                                                <h2 className="text-lg font-semibold transition-all">{resource.domain}</h2>
                                                <p className="font-medium text-primary-light/60 transition-all">{resource.totalResources} Resources</p>
                                            </div>
                                        </Link>
                                    )
                                })
                    }
                </div>
            </div>
        </div>
    )
}
export default ResourcesPage