import Link from 'next/link'


const AdminPage = () => {
    return (
        <div className='container-70 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full p-4 items-center justify-center  h-96 '>
            <Link href={'admin/invite'} className='hover:underline bg-white/5 p-4 py-10 grid place-items-center rounded-lg '>Invite</Link>
            <Link href={'admin/users'} className='hover:underline bg-white/5 p-4 py-10 grid place-items-center rounded-lg '>Users</Link>
        </div>
    )
}

export default AdminPage