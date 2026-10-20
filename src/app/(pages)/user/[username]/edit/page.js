import { getUser } from "@/action/user";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfilePhotoUpload from "@/components/Profile/ProfilePhotoUpload";
import { capitalizeFirstLetter } from "@/utils/helper";
import { IoSchool } from "react-icons/io5";
export async function generateMetadata({ params }) {
  // read route params
  const { username } = await params;
  const user = await getUser(username);
  const name = user
    ? capitalizeFirstLetter(`${user.firstName} ${user.lastName}`)
    : "User not Found";

  return {
    title: `Edit ${name}`,
    description: `Update ${name}'s ZERO ONE Coding Club profile.`,
  };
}
const EditProfile = async ({ params }) => {
  const { username } = await params;
  const user = await getUser(username);
  console.log(user);
  const { email, phone, profilePic, gitHub, otherLinks, linkedIn, bio, designations, roll, registrationNumber } = user;

  return (
    <main className="container-70 flex flex-col gap-6 py-12">
      <section className="w-full flex flex-col items-center gap-6 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 shadow-cus p-6 rounded-3xl relative">
        <div className="flex w-full flex-col sm:flex-row md:gap-6 gap-10 items-center">
          <div className="p-2 border-4 md:border-2 border-accent rounded-full shrink-0">
            <ProfilePhotoUpload
              profilePic={profilePic}
              className="md:w-20 md:h-20 lg:w-32 lg:h-32 w-36 h-36 object-cover rounded-full shadow"
            />
          </div>
          <div className="p-4 ">
            <h1 className="capitalize text-3xl sm:text-4xl font-semibold text-center sm:text-left">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-white/60 capitalize text-lg sm:text-xl text-center sm:text-left font-semibold">
              {user.branch}
            </p>

            <p className="text-white/60 flex items-center sm:justify-start nowrap justify-center">
              <IoSchool className="stroke-white/60 md:w-4 md:h-4 w-6 h-6 mr-2" />
              {user.roll}
            </p>
          </div>
        </div>
      </section>
      <ProfileForm
        user={{
          username,
          email,
          phone,
          gitHub,
          otherLinks,
          linkedIn,
          bio,
          designations,
          roll,
          registrationNumber,
        }}
      />
    </main>
  );
};

export default EditProfile;
