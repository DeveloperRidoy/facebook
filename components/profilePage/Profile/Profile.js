import { FaCamera, FaPen, FaPlusCircle } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";
import ProfilePicButton from "./ProfilePic";
import Image from 'next/image';
import CoverPhotoButton from "./CoverPhotoButton";

const Profile = ({user}) => {
  const [state] = useGlobalContext();

  const ownProfile = user?._id === state.user?._id;
  
  return (
    <div>
      <div className="rounded-b-xl relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-6">
          <Image
            src={`/img/users/${ownProfile ? state.user?.coverPhoto || 'default/cover.jpeg' : user?.coverPhoto || "default/cover.jpeg"}`}
            className="object-cover"
            layout="fill"
          ></Image>
        </div>
        <div className="absolute bottom-0 inset-x-0 py-5 bg-gradient-to-t from-darker rounded-lg">
          {ownProfile && <CoverPhotoButton />}
        </div>
      </div>
      <div
        className={`flex flex-wrap gap-y-3 py-5 px-3 md:px-10 items-end justify-center -mt-24 ${
          ownProfile ? "md:justify-between" : "md:justify-start"
        }`}
      >
        {ownProfile ? (
          <ProfilePicButton />
        ) : (
          <div className="h-40 w-40 relative transition hover:brightness-75 border-dark-500 border-4 dark:bg-dark-400 rounded-full">
            <Image
              src={`/img/users/${user?.photo || "default/user.jpg"}`}
              alt={user?.fullName}
              layout="fill"
              className="object-cover rounded-full"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-y-5 items-center mb-5 gap-x-10 ">
          <p className="text-3xl capitalize mx-auto font-semibold ml-2">
            {user?.fullName}
          </p>
          {ownProfile && (
            <div className="flex items-center gap-x-3 font-semibold w-full md:w-auto whitespace-nowrap">
              <button className="flex-1 rounded-md flex gap-x-1 items-center justify-center bg-blue-600 py-1.5 px-2.5 active:scale-95 transition hover:bg-blue-500">
                <FaPlusCircle />
                <span>Add to Story</span>
              </button>
              <button className="flex-1 rounded-md flex gap-x-1 items-center justify-center bg-dark-400 py-1.5 px-2.5 active:scale-95 transition hover:bg-dark-300">
                <FaPen />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
