"use client"
import { useEffect, useState } from "react";
import UserList from "./UserList";

// const page = async () => {
//     try {
//         const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
//         const data = await res.json();

//         if (data && data.users) return <UserList users={data.users} />;

//         // Show different message based on response status
//         if (res.status === 404) {
//             return <p>No users found.</p>;
//         } else {
//             return <p>Something went wrong. Please try again later.</p>;
//         }
//     } catch (error) {
//         console.error(error);
//         return <p>An unexpected error occurred. Please try again later.</p>;
//     }
// };

import useSWR from 'swr';
import toast from 'react-hot-toast'

const Page = () => {

    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading } = useSWR('/api/users', fetcher);

    if (isLoading) return <h1>Loading</h1>
    if (error) toast.error(error.message);
    if (data)
        return (
            <UserList users={data.users} />
        )

}
export default Page;
