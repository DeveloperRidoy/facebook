import { createRef, useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import catchAsync from "../../../utils/client/functions/catchAsync";
import { FaCamera } from "react-icons/fa";
import Spinner from "../../Spinners/Spinner/Spinner";
import axios from "axios";
import Image from 'next/image';

const ProfilePic = () => {
    const fileRef = createRef();
    const [state, setState] = useGlobalContext();
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState({photo:'', file: ''})
  
  const updatePhoto = () => catchAsync(async () => {
    fileRef.current.click();
      setLoading(!loading)
    const formData = new FormData();
    formData.append(photo, data.photo);
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API || 'api'}/v1/users`, formData, { withCredentials: true });

    }, setState, () => setLoading(false)); 
  
    return (
      <button
        className="active:scale-95 transition hover:brightness-75 rounded-full border-blue-500 border-10 relative h-40 w-40 dark:bg-dark-400"
        onClick={updatePhoto}
      >
        {loading ? (
          <Spinner className="absolute inset-1/2" />
        ) : (
          <>
            <Image
              src={`/img/users/${state.user?.photo || "default/user.jpeg"}`}
                alt={state.user?.fullName}
                layout="fill"
              className="object-cover rounded-full"
            />
            <div className="absolute text-gray-300 bg-dark-400 shadow-lg p-1.5 rounded-full text-xl top-[70%] right-1">
              <FaCamera />
            </div>
          </>
        )}
        <input type="file" className="h-0 w-0" ref={fileRef} onChange={e => setData({photo: e.target.files[0]})}/>
      </button>
    );
}

export default ProfilePic
