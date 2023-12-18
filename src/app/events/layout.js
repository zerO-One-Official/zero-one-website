
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'ZERO ONE | Events',
    description: 'Zero-one Coding Club of Motihari College of Engineering, Motihari',
}


const layout = async ({ children }) => {
    const session = await getServerSession(options);
    console.log(session);

    if (!session) {
        redirect('/login?callbackUrl=/')
    }
    else
        return (children
        )
}
export default layout