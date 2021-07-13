import { FaCamera, FaPen, FaPlusCircle } from "react-icons/fa";
import { useGlobalContext } from "../../context/GlobalContext";

const Profile = () => {
    const [state] = useGlobalContext();
  return (
    <div>
      <div className="rounded-b-xl relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-6">
          <img
            src={`/img/users/${state.user?.photo || "cover/cover.jpg"}`}
            className="h-full w-full object-cover"
          ></img>
        </div>
        <div className="absolute bottom-0 inset-x-0 py-5 bg-gradient-to-t from-darker rounded-lg">
          <button className="py-1.5 px-2.5 capitalize bg-white text-black font-semibold rounded-lg flex items-center gap-x-2 ml-auto mr-3 active:scale-95 transition">
            <FaCamera />
            <span className="hidden sm:block">add cover photo</span>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-3 py-5 px-3 md:px-10 items-end justify-center md:justify-between -mt-24">
        <button className="active:scale-95 transition hover:brightness-75 rounded-full border-blue-500 border-10 relative">
          <img
            src={`/img/users/${state.user?.photo || "default/user.jpeg"}`}
            alt={state.user?.fullName}
            className="h-40 w-40 rounded-full"
          />
          <div className="absolute text-gray-300 bg-dark-400 shadow-lg p-1.5 rounded-full text-xl top-[70%] right-1">
            <FaCamera />
          </div>
        </button>
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
