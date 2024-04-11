import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'ZERO ONE | Contest',
    description: 'Zero-one Coding Club of Motihari College of Engineering, Motihari',
}


const layout = async ({ children }) => {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/login?callbackUrl=/')
    }
    else
        return (
            children
        )
}
export default layout