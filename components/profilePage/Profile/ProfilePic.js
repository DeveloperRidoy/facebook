import { createRef, useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import catchAsync from "../../../utils/client/catchAsync";
import { FaCamera } from "react-icons/fa";
import Spinner from "../../Spinners/Spinner/Spinner";
import Axios from "../../../utils/client/axios";
import NextImage from "../../NextImage";

const ProfilePic = () => {
  const [state, setState] = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const fileRef = createRef();

  const updatePhoto = (e) =>
    catchAsync(
      async () => {
        // check if file is an image
        if (!/^image/i.test(e.target.files[0].type))
          return setState((state) => ({
            ...state,
            alert: {
              show: true,
              type: "danger",
              text: "please upload an image",
            },
          }));

        setLoading(true);
        const formData = new FormData();
        formData.append("photoFile", e.target.files[0]);

        const res = await Axios.patch(`users`, formData);
        setState((state) => ({
          ...state,
          user: res.data.data?.user,
          alert: { show: true, text: "profile picture updated" },
        }));
        setLoading(false);

        // reset input
        e.target.value = "";
      },
      setState,
      () => {
        setLoading(false), (e.target.value = "");
      }
    );

  return (
    <button
      className="active:scale-95 active:border-blue-500 transition hover:brightness-75 rounded-full border-dark-500 border-4 relative h-40 w-40 dark:bg-dark-400"
      onClick={() => fileRef.current.click()}
    >
      {loading ? (
        <Spinner className="absolute inset-1/2" />
      ) : (
        <>
          <NextImage
            className="h-full w-full rounded-full"
            photo={state.user?.photo}
          />
          <div className="absolute text-gray-300 bg-dark-400 shadow-lg p-1.5 rounded-full text-xl top-[70%] right-1">
            <FaCamera />
          </div>
        </>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="h-0 w-0"
        onChange={updatePhoto}
      />
    </button>
  );
};

export default ProfilePic;
