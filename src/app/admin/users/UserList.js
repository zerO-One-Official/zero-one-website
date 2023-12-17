"use client"
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx'
import Image from 'next/image'
import { useState } from 'react'
import StyledInput from '@/components/input/StyledInput'
import { RiBaseStationLine } from "react-icons/ri";
import Link from 'next/link'

const UserList = ({ users }) => {

    const [userList, setUserList] = useState(users);
    const [filter, setFilter] = useState({
        active: '',
        batch: '',
        search: ''
    });

    return (
        <>
            <div className="container-70 py-10 sticky top-16 bg-primary ">

                <div className="">
                    <StyledInput value={filter.search} label={'search'} name='search' onChange={(e) => setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                </div>
                <div className="flex gap-2">
                    <div className="">
                        <input type="radio" name="active" id="active" checked={filter.active} onChange={(e) => { setFilter(prev => ({ ...prev, active: true })) }} />
                        <label htmlFor="active">Active</label>
                    </div>
                    <div className="">
                        <input type="radio" name="active" id="inactive" checked={filter.active === false} onChange={(e) => { setFilter(prev => ({ ...prev, active: false })) }} />
                        <label htmlFor="inactive">Inactive</label>
                    </div>
                    <div className="">
                        <input type="radio" name="active" id="all" checked={filter.active === ''} onChange={(e) => { setFilter(prev => ({ ...prev, active: '' })) }} />
                        <label htmlFor="all">All</label>
                    </div>

                    <div className="">
                        <input type="radio" name="batch" id="2020" checked={filter.batch === 20} onChange={(e) => { setFilter(prev => ({ ...prev, batch: e.target.checked ? parseInt(20) : '' })) }} />
                        <label htmlFor="2020">2020</label>
                    </div>
                    <div className="">
                        <input type="radio" name="batch" id="2021" checked={filter.batch === 21} onChange={(e) => { setFilter(prev => ({ ...prev, batch: e.target.checked ? parseInt(21) : '' })) }} />
                        <label htmlFor="2021">2021</label>
                    </div>
                    <div className="">
                        <input type="radio" name="batch" id="2022" checked={filter.batch === 22} onChange={(e) => { setFilter(prev => ({ ...prev, batch: e.target.checked ? parseInt(22) : '' })) }} />
                        <label htmlFor="2022">2022</label>
                    </div>
                    <div className="">
                        <input type="radio" name="batch" id="2023" checked={filter.batch === 23} onChange={(e) => { setFilter(prev => ({ ...prev, batch: e.target.checked ? parseInt(23) : '' })) }} />
                        <label htmlFor="2023">2023</label>
                    </div>
                    <div className="">
                        <button onClick={() =>
                            setFilter({
                                active: '',
                                batch: '',
                                search: ''
                            })
                        }>Clear Filter</button>
                    </div>
                </div>
            </div>

            <div className='container-70 pb-10 flex-col gap-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>

                {
                    userList.filter(user => {
                        const condition1 = filter.active === '' || user.active === filter.active;
                        const condition2 = filter.batch === '' || Math.floor(user.roll / 1000) === filter.batch;
                        const condition3 = filter.search === '' || user.firstName.includes(filter.search);

                        if (condition1 && condition2 && condition3) {
                            return true;
                        }
                        return false;

                    }).map(user => {
                        return (
                            <Link href={`/user/${user._id}`} key={user._id}
                                className={`flex gap-2 items-center justify-between bg-slate-50/5 p-3 rounded-lg border ${user.role === 'admin' ? 'border-yellow-300' : 'border-white/25'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div >
                                        <Image width={50} height={50} src={user.profilePic} alt={user.firstName} className='w-10 h-10 object-center object-cover rounded-full' />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className='capitalize flex gap-1 font-semibold' >
                                            <h1>{user.firstName}</h1>
                                            <h1>{user.lastName}</h1>
                                        </div>
                                        <h2>(2K{Math.floor(user.roll / 1000)})</h2>
                                    </div>
                                </div>
                                {
                                    user.active ?
                                        <button className='bg-green-500 rounded-full p-1'>
                                            <IoIosCheckmarkCircleOutline size={20} />
                                        </button>
                                        :
                                        <button className='bg-red-500 rounded-full p-1'>
                                            <RxCrossCircled size={20} />
                                        </button>
                                }
                            </Link>
                        )
                    })
                }
                {
                    userList.filter(user => {
                        const condition1 = filter.active === '' || user.active === filter.active;
                        const condition2 = filter.batch === '' || Math.floor(user.roll / 1000) === filter.batch;
                        const condition3 = filter.search === '' || user.firstName.includes(filter.search);

                        if (condition1 && condition2 && condition3) {
                            return true;
                        }
                        return false;

                    }).length === 0 ?
                        <h2>No Result Found</h2>
                        :
                        null
                }
            </div>
        </>
    )
}

export default UserList