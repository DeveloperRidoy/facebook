import { FaFacebookMessenger, FaPen, FaPlusCircle } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";
import ProfilePicButton from "./ProfilePic";
import Image from 'next/image';
import CoverPhotoButton from "./CoverPhotoButton";
import AddFriendBtn from "../../Buttons/AddFriendBtn";

const Profile = ({user}) => {
  const [state] = useGlobalContext();

  const ownProfile = user?._id === state.user?._id;
  
  return (
    <div>
      <div className="rounded-b-xl relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-6">
          <Image
            src={`/img/users/${
              ownProfile
                ? state.user?.coverPhoto || "default/cover.jpeg"
                : user?.coverPhoto || "default/cover.jpeg"
            }`}
            className="object-cover"
            layout="fill"
            placeholder="blur" blurDataURL="/img/users/default/user.jpg"
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 py-5 bg-gradient-to-t from-darker rounded-lg">
          {ownProfile && <CoverPhotoButton />}
        </div>
      </div>
      <div
        className={`flex flex-wrap gap-y-3 py-5 px-3 md:px-10 items-end justify-center -mt-24 `}
      >
        {ownProfile ? (
          <ProfilePicButton />
        ) : (
          <div className="h-40 w-40 relative transition hover:brightness-75 border-dark-500 border-4 dark:bg-dark-400 rounded-full">
            <Image
              src={`/img/users/${user?.photo || "default/user.jpg"}`}
              alt={ownProfile ? state.user?.fullName : user?.fullName}
              layout="fill"
              className="object-cover rounded-full"
              placeholder="blur" blurDataURL="/img/users/default/user.jpg"
            />
          </div>
        )}

        <div className="flex xl:flex-1 flex-wrap sm:flex-nowrap gap-y-5 items-center justify-center mb-5 gap-x-10 ">
          <p className="text-xl lg:text-3xl capitalize font-semibold ml-2">
            {user?.fullName}
          </p>

          <div className="flex items-center gap-x-3 font-semibold w-full md:w-auto whitespace-nowrap">
            {ownProfile ? (
              <>
                <button className="flex-1 rounded-md flex gap-x-1 items-center justify-center bg-blue-600 py-1.5 px-2.5 active:scale-95 transition hover:bg-blue-500 capitalize">
                  <FaPlusCircle />
                  <span>Add to Story</span>
                </button>
                <button className="flex-1 rounded-md flex gap-x-1 items-center justify-center bg-dark-400 py-1.5 px-2.5 active:scale-95 transition hover:bg-dark-300 capitalize">
                  <FaPen />
                  <span>Edit Profile</span>
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 rounded flex gap-x-1 items-center justify-center bg-blue-600 py-1.5 px-2.5 active:scale-95 transition hover:bg-blue-500 capitalize">
                  <FaFacebookMessenger />
                  <span>message</span>
                </button>
                <AddFriendBtn user={user} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
