
export const metadata = {
    title: 'ZERO ONE | Profile',
    description: 'Zero-one Coding Club of Motihari College of Engineering, Motihari',
}

const ProfileLayout = ({ children }) => {
    return (

        <div className="container-70 flex flex-col items-center">
            {
                children
            }
        </div>
    )
}


export default ProfileLayout