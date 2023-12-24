"use client"
import Spinner from '@/components/loader/Spinner';
import { getMonthName, getTime } from '@/utils/helper';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast'
import useSWR from 'swr'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { TbCircleDashedNumber1, TbCircleDashedNumber2, TbCircleDashedNumber3 } from 'react-icons/tb';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';

const EventPage = ({ params }) => {

    const { eventName } = params

    const activeTab = useSearchParams().get('tab');

    const router = useRouter();

    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading } = useSWR(`/api/events/${eventName}`, fetcher);

    if (error) return toast.error(error.message);


    const eventStartDate = new Date(data?.event?.date);
    const eventEndDate = new Date(eventStartDate.getTime() + data?.event?.duration * 60 * 60 * 1000);


    return (
        isLoading ?
            <Spinner />
            :
            data && data.event ?

                <div className='container-70 min-h-screen pt-10 flex flex-col'>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between mb-6 gap-2">
                            <button onClick={() => { router.push(`${eventName}?tab=info`) }} className={`flex items-center justify-center gap-2 xs:p-2 p-4 flex-1 text-xl ${activeTab === 'info' ? 'bg-primary-light text-primary  fill-primary' : 'fill-primary-light'} rounded-sm`} title='Informations'>
                                <AiOutlineInfoCircle className='fill-inherit' size={25} />
                                <label className='text-inherit font-medium sm:hidden pointer-events-none'>Info</label>
                            </button>
                            <button onClick={() => { router.push(`${eventName}?tab=problems`) }} className={`flex items-center justify-center gap-2 sm:p-2 p-4 flex-1 text-xl ${activeTab === 'problems' ? 'bg-primary-light text-primary  fill-primary' : 'fill-primary-light'} rounded-sm`} title='Problems'>
                                <AiOutlineQuestionCircle className=' fill-inherit' size={25} />
                                <label className='text-inherit font-medium sm:hidden pointer-events-none'>Problems</label>
                            </button>
                            <button onClick={() => { router.push(`${eventName}?tab=participants`) }} className={`flex items-center justify-center gap-2 sm:p-2 p-4 flex-1 text-xl ${activeTab === 'participants' ? 'bg-primary-light text-primary stroke-primary ' : 'stroke-primary-light'} rounded-sm`} title='Informations'>
                                <HiOutlineUserGroup className='stroke-inherit' size={25} />
                                <label className='text-inherit font-medium sm:hidden pointer-events-none'>Participants</label>
                            </button>
                        </div>
                        {
                            activeTab === 'info' ?

                                <InfoTab event={data.event} />

                                :

                                activeTab === 'problems' ?
                                    <div className="flex flex-col w-full gap-4">
                                        {
                                            data?.event?.questions.map(question => {
                                                return (
                                                    <Question key={question._id} question={question} eventEndDate={eventEndDate} />
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    activeTab === 'participants' ?
                                        <ol className="flex flex-col w-full gap-4 list-decimal">

                                            {
                                                data?.event?.participants
                                                    .sort((a, b) => {
                                                        // Check if both participants have a rank
                                                        if (a.rank !== undefined && b.rank !== undefined) {
                                                            return a.rank - b.rank; // Sort by rank if both have ranks
                                                        } else if (a.rank === undefined && b.rank !== undefined) {
                                                            return 1; // Put participants without a rank at the end
                                                        } else if (a.rank !== undefined && b.rank === undefined) {
                                                            return -1; // Put participants without a rank at the end
                                                        } else {
                                                            return 0; // Both participants have no rank, maintain the order
                                                        }
                                                    })
                                                    .map(participant => {
                                                        return (
                                                            <Participant participant={participant.user} rank={participant.rank} key={participant._id} />
                                                        )
                                                    })
                                            }
                                        </ol>
                                        :
                                        notFound()

                        }
                    </div>
                </div>

                :

                <div className="">
                    <h1>No Event Found</h1>
                </div>

    )
}

const InfoTab = ({ event }) => {
    console.log(event);

    const date = new Date(event?.date);
    const day = date.getDate();
    const month = getMonthName(date);
    const year = date.getFullYear();
    const time = getTime(date);

    return (
        <div className="flex flex-col w-full gap-4">
            <a href={event.link} className='hover:underline text-accent'>
                <h1 className='text-4xl font-semibold text-center w-full text-accent'>{event.name}</h1>
            </a>
            <div className="flex gap-4 justify-center text-xl">
                <span>
                    {`${day} ${month} ${year}`}
                </span>
                <span>
                    {`${time}`}
                </span>
            </div>
            {
                event.gallery.length ?

                    <div className="flex flex-col gap-4">
                        <h2>Memories</h2>
                        <div className="grid grid-cols-[repeat(auto-fit,300px,1fr)]">
                            {
                                event.gallery.map((img, index) => {
                                    return <Image key={index} src={img} width={300} height={300} quality={100} alt={`${eventName}`} />
                                })
                            }
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

const Question = ({ question, eventEndDate }) => {

    const currentDate = new Date();
    const [activeQuestion, setActiveQuestion] = useState('');

    const questionRef = useRef();

    useEffect(() => {
        const handleOutClick = (e) => {
            if (!questionRef.current.contains(e.target)) {
                setActiveQuestion('');
            }
        }

        document.addEventListener('click', handleOutClick);
        return () => document.removeEventListener('click', handleOutClick);
    })

    const toggleQuestion = () => {
        if (activeQuestion === '')
            setActiveQuestion(question._id);
        else setActiveQuestion('');
    }

    const difficultyColor = () => {
        switch (question.difficulty) {
            case 'easy':
                return 'text-green-500';
            case 'medium':
                return 'text-orange-500';
            default:
                return 'text-red-600';
        }
    }


    return (
        <div ref={questionRef} className={`flex flex-col ${activeQuestion === question._id ? 'gap-4 bg-white/10 rounded' : 'gap-0'} p-4 `}>
            <button className="flex justify-between items-center w-full transition-all" onClick={toggleQuestion}>
                <h3 className='text-xl font-medium'>{question.name}</h3>
                <IoChevronDownOutline className={`${activeQuestion === question._id ? '-rotate-180' : ''} transition-all`} />
            </button>

            <div className={`${activeQuestion === question._id ? 'h-auto opacity-1 pointer-events-auto' : 'h-0 overflow-hidden opacity-0 pointer-events-none'} transition-all flex flex-col text-left gap-4 `}>

                <div className="flex gap-6 ml-auto">
                    <h4 className={`font-medium capitalize ${difficultyColor()} font-medium`}>{question.difficulty}</h4>
                    <p className='text-primary-light/80 font-medium'>{question.point} Point</p>
                </div>

                <div className="bg-white/5 p-2 rounded-sm">
                    <h4 className='font-medium'>Problem Statement:</h4>
                    <p className='text-primary-light/80'>{question.desc}</p>
                </div>
                <div className="bg-white/5 p-2 rounded-sm">
                    <h4 className='font-medium'>Input Format:</h4>
                    {question.inputFormat.split(',').map((ip, index) => {
                        return <p key={index} className='text-primary-light/80'>{ip}</p>;
                    })}
                </div>
                <div className="bg-white/5 p-2 rounded-sm">
                    <h4 className='font-medium'>Output Format:</h4>
                    {question.outputFormat.split(',').map((of, index) => {
                        return <p key={index} className='text-primary-light/80'>{of}</p>;
                    })}
                </div>
                <div className="bg-white/5 p-2 rounded-sm">
                    <h4 className='font-medium'>Constraints:</h4>
                    {question.constraints.split(',').map((cons, index) => {
                        return <p key={index} className='text-primary-light/80'>{cons}</p>;
                    })}
                </div>
                {
                    question.testCases.map((testCase, index) => {
                        return (
                            <div key={testCase._id} className={`bg-white/5 rounded-sm ${currentDate < eventEndDate ? 'h-8 overflow-hidden p-1 px-2' : 'p-4'}`}>
                                <div className="flex justify-between items-center">
                                    <h4 className='font-medium'>TestCase {index}:</h4>
                                    {testCase.isPublic ? null : <BsFillEyeSlashFill />}
                                </div>
                                <div className="font-medium text-primary-light/70 text-blue-300" >Input</div>
                                {testCase.input.split(',').map((inp, index) => {
                                    return <p key={index} className='text-primary-light/80'>{inp}</p>;
                                })}
                                <div className="font-medium text-primary-light/70 text-green-300">Output</div>
                                {testCase.output.split(',').map((op, index) => {
                                    return <p key={index} className='text-primary-light/80'>{op}</p>;
                                })}
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

const Participant = ({ participant, rank }) => {

    const rankIcon = () => {
        switch (rank) {
            case 1: return <TbCircleDashedNumber1 className='stroke-yellow-400 sm:scale-150 scale-[2]' />
            case 2: return <TbCircleDashedNumber2 className='stroke-slate-300 sm:scale-150 scale-[2]' />
            case 3: return <TbCircleDashedNumber3 className='stroke-amber-700 sm:scale-150 scale-[2]' />
            default: return;
        }
    }

    return (
        <li className="flex items-center gap-6 sm:gap-4 bg-white/10 p-4 rounded">
            <p className='text-2xl sm:text-lg font-bold scale-110 text-primary-light/30'>{rank}</p>
            <Image src={participant.profilePic} width={56} height={56} alt={participant.firstName} className='w-14 h-14 rounded-full object-cover' />
            <div className="">
                <h2 className='capitalize text-xl sm:text-base font-medium'>{participant.firstName} {participant.lastName}</h2>
                <p className='capitalize text-xl sm:text-base font-medium text-primary-light/50'>{participant.roll} </p>
            </div>
            <div className="ml-auto">
                {
                    rank <= 3 ?
                        rankIcon()
                        :
                        null
                }
            </div>
        </li>
    )
}

export default EventPage