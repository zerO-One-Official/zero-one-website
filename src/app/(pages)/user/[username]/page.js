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
import { getUser } from "@/action/user";
import BottomGlitter from "@/components/StyledText/BottomGlitter";
import { getUserCertificates } from "@/action/certificate";
import FilledCertificate from "@/components/certificates/FilledCertificate";

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

    const loggedInUser = session?.user.username;

    const username = params.username

    const user = await getUser(username);

    const certificates = await getUserCertificates(user?._id);


    return (
        user ?
            <div className="container-70 flex flex-col gap-4 min-h-[calc(100vh-88px)] pt-16">


                <section className="flex flex-col items-center gap-6 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 shadow-cus  p-6 rounded-3xl relative">
                    <div className="flex w-full md:gap-6 gap-10 items-center sm:flex-col">
                        <div className="p-2 border-4 md:border-2 border-accent rounded-full shrink-0">
                            <Image src={user?.profilePic} width={160} height={160} alt={user?.firstName} className="md:w-20 md:h-20 lg:w-32 lg:h-32 w-36 h-36 object-cover rounded-full shadow" />
                        </div>
                        <div className="p-4 ">
                            <h1 className="capitalize text-4xl md:text-3xl font-semibold sm:text-center">{user.firstName} {user.lastName}</h1>
                            <p className="text-zinc-500 capitalize text-xl sm:text-lg sm:text-center font-semibold">{user.branch}</p>
                            <p className="text-zinc-500 text-lg font-bold flex items-center sm:justify-center">
                                <MdAlternateEmail className="fill-white/40 md:w-4 md:h-4 w-6 h-6 mr-1" />
                                {user.username}
                            </p>
                        </div>
                        {
                            username === loggedInUser ?

                                <Link href={`/user/${loggedInUser}/edit`} className="block rounded-full absolute top-4 right-4 p-4 shadow-btn border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 "
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
                                        <p className="text-zinc-500 flex items-center" title={user.bio}>
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
                            <p className="text-zinc-500 flex items-center">
                                <PiGenderIntersexBold className='stroke-ztext-zinc-500 md:w-4 md:h-4 w-6 h-6 mr-2' />
                                {user.gender}
                            </p>
                            <p className="text-zinc-500 flex items-center">
                                <IoSchool className='stroke-ztext-zinc-500 md:w-4 md:h-4 w-6 h-6 mr-2' />
                                {user.roll}
                            </p>
                        </div>

                        <div className="xl:w-full xl:h-[2px] w-[2px] h-inherit bg-white/10 rounded-md" />

                        <div className="flex-1 p-4 space-y-2">
                            <div className="flex items-center">
                                <HiEnvelope className='stroke-ztext-zinc-500  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0' />
                                <a href={`mailto:${user.email}`} className="text-zinc-500  overflow-hidden text-ellipsis">{user.email}</a>
                            </div>
                            {user.gitHub ?
                                <div className="flex items-center">
                                    <IoLogoGithub className='stroke-ztext-zinc-500  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0' />
                                    <a href={user.gitHub} className="text-zinc-500 overflow-hidden text-ellipsis">{user.gitHub}</a>
                                </div>
                                :
                                null
                            }
                            {user.linkedIn ?
                                <div className="flex items-center">
                                    <BiLogoLinkedinSquare className='stroke-ztext-zinc-500  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0' />
                                    <a href={user.linkedIn} className="text-zinc-500 overflow-hidden text-ellipsis">{user.linkedIn}</a>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </section>
                <BottomGlitter text={'Certificates'} className={'max-w-fit'} />
                <div className="gap-2 grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
                    {
                        certificates.length > 0 ? certificates.map((certificate, index) => (
                            <div className="card p-4" key={index} >
                                <FilledCertificate certificate={JSON.stringify(certificate)} />
                                <h3 className="text-lg pt-2 font-semibold ">{certificate.template.eventName}</h3>
                            </div>
                        ))
                            :
                            <h2 className="text-xl">No Certificates Found</h2>
                    }
                </div>


            </div>
            :
            <section className="container-70">
                <div className="mt-16 flex flex-col items-center gap-6 border border-white/5 shadow-cus  p-6 rounded-3xl relative">
                    <h2 className="text-xl">User Not Found</h2>
                </div>
            </section>
    )
}

export default UserPage
