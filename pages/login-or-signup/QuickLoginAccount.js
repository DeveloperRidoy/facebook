import { useState } from "react";
import { BsX } from "react-icons/bs";
import Spinner from "../../components/Spinners/Spinner/Spinner";
import { useGlobalContext } from "../../context/GlobalContext";
import catchAsync from "../../utils/client/catchAsync";

import NextImage from "../../components/NextImage";
import Axios from "../../utils/client/axios";

const QuickLoginAccount = ({ login, setModel }) => {
  const [state, setState] = useGlobalContext();
  const [loading, setLoading] = useState(false);

  // quick login
  const quickLogin = () =>
    catchAsync(
      async () => {
        setLoading(true);
        const res = await Axios.get(
          `users/auth/quick-login/${login.user._id}`,
          { withCredentials: true }
        );
        setState({
          ...state,
          user: res.data.data?.user,
          alert: { show: true, text: res.data.message, type: "success" },
        });
        setLoading(false);
        setState;
      },
      setState,
      () => setLoading(false)
    );

  // remove quick login
  const removeQuickLogin = () =>
    catchAsync(
      async () => {
        setLoading(true);
        await Axios.delete(`users/auth/quick-login/${login.user._id}`, {
          withCredentials: true,
        });

        setState({
          ...state,
          quickLogins: null,
        });
      },
      setState,
      () => setLoading(false)
    );

  return (
    <div className="relative">
      <div
        className="absolute top-2 left-1 z-10 cursor-pointer"
        onClick={removeQuickLogin}
      >
        <div className=" rounded-full bg-gray-500 h-5 w-5 flex items-center justify-center group-hover:bg-white transition transform group-hover:scale-125 text-white group-hover:text-black relative">
          <BsX />
        </div>
      </div>
      <button
        className="w-32 h-44 rounded-lg border bg-white relative group transition hover:shadow-lg"
        onClick={() => {
          login.rememberPassword
            ? quickLogin()
            : setModel({ show: true, user: login.user });
        }}
      >
        {loading ? (
          <Spinner className="border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <div className="h-full">
            <div className="flex h-full flex-col justify-stretch">
              <NextImage
                className=" w-full h-[130px] rounded-t-lg"
                photo={login?.user.photo}
              />
              <div className="flex-1 flex text-gray-700 justify-center items-center capitalize">
                {login.user?.firstName?.split(" ")?.[0]}
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default QuickLoginAccount;
