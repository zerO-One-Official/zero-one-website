import { getProfile } from '@/action/user'
import ProfileForm from '@/components/Profile/ProfileForm'
import ProfilePhotoUpload from '@/components/Profile/ProfilePhotoUpload'
import Skeleton from '@/components/skeleton/skeleton'
import { IoSchool } from 'react-icons/io5'

const EditProfile = async () => {

  const profileData = await getProfile()
  const { username, email, phone, profilePic, gitHub, otherLinks, linkedIn, bio } = profileData

  return (
    <>
      <section className="w-full mt-16 flex flex-col items-center gap-6 border border-white/5 shadow-cus  p-6 rounded-3xl relative">
        <div className="flex w-full md:gap-6 gap-10 items-center sm:flex-col">
          <div className="p-2 border-4 md:border-2 border-accent rounded-full shrink-0">
            <ProfilePhotoUpload profilePic={profilePic} className="md:w-20 md:h-20 lg:w-32 lg:h-32 w-36 h-36 object-cover rounded-full shadow" />
          </div>
          <div className="p-4 ">
            <h1 className="capitalize text-4xl md:text-3xl font-semibold sm:text-center">{profileData.firstName} {profileData.lastName}</h1>
            <p className="text-white/60 capitalize text-xl sm:text-lg sm:text-center font-semibold">{profileData.branch}</p>

            <p className="text-white/60 flex items-center sm:justify-center">
              <IoSchool className='stroke-white/60 md:w-4 md:h-4 w-6 h-6 mr-2' />
              {profileData.roll}
            </p>
          </div>
        </div>
      </section>
      <ProfileForm profileData={{ username, email, phone, gitHub, otherLinks, linkedIn, bio }} />
    </>
  )
}

export default EditProfile
