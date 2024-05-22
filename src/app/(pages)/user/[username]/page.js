import Image from "next/image";
import { BiEdit, BiLogoLinkedinSquare } from "react-icons/bi";
import { HiEnvelope } from "react-icons/hi2";
import { IoLogoGithub, IoSchool } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { PiGenderIntersexBold } from "react-icons/pi";
import { DiCodeigniter } from "react-icons/di";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { getUser, getUsername } from "@/action/user";
import Skeleton from "@/components/skeleton/skeleton";

function capitalizeFirstChar(str) {
    if (str.length === 0) return str; // Handle empty string case
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function generateMetadata({ params }) {
    // read route params
    const username = params.username;
    const user = await getUser(username);
    const name = user ? `${capitalizeFirstChar(user.firstName)} ${capitalizeFirstChar(user.lastName)}` : 'User not Found'

    return {
        title: name,
    };
}

const UserPage = async ({ params }) => {


    const session = await getServerSession(options)

    const loggedInUser = session?.user.username

    const username = params.username

    const user = await getUser(username);


    return (
        user ?
            <div className="container-70 flex flex-col gap-4 min-h-[calc(100vh-88px)] pt-16">


                <section className="flex flex-col items-center gap-6 border border-white/5 shadow-cus shadow-black p-6 rounded-3xl relative">
                    <div className="flex w-full md:gap-6 gap-10 items-center sm:flex-col">
                        <div className="p-2 border-4 md:border-2 border-accent rounded-full shrink-0">
                            <Image src={user?.profilePic} width={160} height={160} alt={user?.firstName} className="md:w-20 md:h-20 lg:w-32 lg:h-32 w-36 h-36 object-cover rounded-full shadow" />
                        </div>
                        <div className="p-4 ">
                            <h1 className="capitalize text-4xl md:text-3xl font-semibold sm:text-center">{user.firstName} {user.lastName}</h1>
                            <p className="text-white/60 capitalize text-xl sm:text-lg sm:text-center font-semibold">{user.branch}</p>
                            <p className="text-white/40 text-lg font-bold flex items-center sm:justify-center">
                                <MdAlternateEmail className="fill-white/40 md:w-4 md:h-4 w-6 h-6 mr-1" />
                                {user.username}
                            </p>
                        </div>
                        {
                            username === loggedInUser ?

                                <Link href={`/user/${loggedInUser}/edit`} className="block rounded-full absolute top-4 right-4 p-4 shadow-md shadow-black"
                                >
                                    <BiEdit className="w-4 h-4" />
                                </Link>
                                :
                                null
                        }
                    </div>
                    <div className="flex gap-6 xl:flex-col w-full">
                        {
                            user?.bio ?
                                <>
                                    <div className="flex-1 p-4 space-y-2">
                                        <p className="flex items-baseline font-semibold">
                                            <DiCodeigniter className="w-4 h-4 mr-2" />
                                            Bio
                                        </p>
                                        <p className="text-white/60 flex items-center" title={user.bio}>
                                            {user.bio.slice(0, 100)}
                                            {user.bio.length > 100 ? '...' : ''}
                                        </p>
                                    </div>

                                    <div className="xl:w-full xl:h-[2px] w-[2px] h-inherit bg-white/10 rounded-md" />
                                </>
                                :
                                null
                        }

                        <div className="flex-1 p-4 space-y-2">
                            <p className="text-white/60 flex items-center">
                                <PiGenderIntersexBold className='stroke-white/60 md:w-4 md:h-4 w-6 h-6 mr-2' />
                                {user.gender}
                            </p>
                            <p className="text-white/60 flex items-center">
                                <IoSchool className='stroke-white/60 md:w-4 md:h-4 w-6 h-6 mr-2' />
                                {user.roll}
                            </p>
                        </div>

                        <div className="xl:w-full xl:h-[2px] w-[2px] h-inherit bg-white/10 rounded-md" />

                        <div className="flex-1 p-4 space-y-2">
                            <div className="flex items-center">
                                <HiEnvelope className='stroke-white/60  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0' />
                                <a href={`mailto:${user.email}`} className="text-white/60  overflow-hidden text-ellipsis">{user.email}</a>
                            </div>
                            {user.gitHub ?
                                <div className="flex items-center">
                                    <IoLogoGithub className='stroke-white/60  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0' />
                                    <a href={user.gitHub} className="text-white/60 overflow-hidden text-ellipsis">{user.gitHub}</a>
                                </div>
                                :
                                null
                            }
                            {user.linkedIn ?
                                <div className="flex items-center">
                                    <BiLogoLinkedinSquare className='stroke-white/60  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0' />
                                    <a href={user.linkedIn} className="text-white/60 overflow-hidden text-ellipsis">{user.linkedIn}</a>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </section>

            </div>
            :
            <section className="container-70">
                <div className="mt-16 flex flex-col items-center gap-6 border border-white/5 shadow-cus shadow-black p-6 rounded-3xl relative">
                    <h2 className="text-xl">User Not Found</h2>
                </div>
            </section>
    )
}

export default UserPage
