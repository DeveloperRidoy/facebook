import { FaCamera } from "react-icons/fa";
import { createRef, useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import catchAsync from "../../../utils/client/functions/catchAsync";
import Button from '../../Buttons/Button';
import axios from 'axios';

const CoverPhotoButton = () => {
    const [state, setState] = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const fileRef = createRef();

    const updateCoverPhoto = (e) =>
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
          formData.append("coverPhotoFile", e.target.files[0]);
          const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API || "api"}/v1/users`,
            formData,
            { withCredentials: true }
          );
          setState((state) => ({
            ...state,
            user: res.data.data?.user,
            alert: { show: true, text: "Cover photo updated" },
          }));
          setLoading(false);
        },
        setState,
        () => setLoading(false)
      ); 
  return (
    <Button loading={loading} className="py-1.5 px-2.5 capitalize bg-white text-black font-semibold rounded-lg flex items-center gap-x-2 ml-auto mr-3 active:scale-95 transition" onClick={() => fileRef.current.click()}>
      <FaCamera />
      <span className="hidden sm:block">{state.user?.coverPhoto ? 'update': 'add'} cover photo</span>
      <input type="file" ref={fileRef} onChange={updateCoverPhoto} className="h-0 w-0"/>
    </Button>
  );
};

export default CoverPhotoButton;
