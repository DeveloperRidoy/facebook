import { FaCamera, FaPen, FaPlusCircle } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";
import ProfilePicButton from "./ProfilePic";
import Image from 'next/image';
import CoverPhotoButton from "./CoverPhotoButton";

const Profile = () => {
  const [state] = useGlobalContext();
  
  
  return (
    <div>
      <div className="rounded-b-xl relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-6">
          <Image
            src={`/img/users/${state.user?.coverPhoto || "default/cover.jpg"}`}
            className=" object-cover"
            layout="fill"
          ></Image>
        </div>
        <div className="absolute bottom-0 inset-x-0 py-5 bg-gradient-to-t from-darker rounded-lg">
          <CoverPhotoButton/>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-3 py-5 px-3 md:px-10 items-end justify-center md:justify-between -mt-24">
        <ProfilePicButton/>
        <div className="flex flex-wrap gap-y-5 items-center mb-5 gap-x-10 ">
          <p className="text-3xl capitalize mx-auto font-semibold">
            {state.user?.fullName}
          </p>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
