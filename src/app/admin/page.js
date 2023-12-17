import Link from 'next/link'
import { IoPersonAddOutline, IoPersonOutline } from "react-icons/io5";


const AdminPage = () => {
    return (
        <div className='container-70 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full p-4 items-center justify-center  h-96 '>
            <Link href={'admin/invite'} className=' flex flex-col items-center justify-center gap-1 hover:bg-primary-light hover:text-primary hover:stroke-primary stroke-primary-light bg-white/5 p-4 py-10 rounded-lg border border-white/25'>
                <IoPersonAddOutline size={35} stroke='inherit' />
                Invite
            </Link>
            <Link href={'admin/users'} className=' flex flex-col items-center justify-center gap-1 hover:bg-primary-light hover:text-primary hover:stroke-primary stroke-primary-light bg-white/5 p-4 py-10 rounded-lg border border-white/25'>
                <IoPersonOutline size={35} stroke='inherit' />

                Users
            </Link>
        </div>
    )
}

export default AdminPage