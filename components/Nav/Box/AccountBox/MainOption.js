import Link from "next/link";
import {
  FaCog,
  FaCommentDots,
  FaDoorOpen,
  FaMoon,
  FaQuestionCircle,
} from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import Spacer from "../../../Spacer";
import {
  DISPLAY_ACCESSIBILITY,
  HELP_SUPPORT,
  SETTINGS_PRIVACY,
} from "./AccountBox";
import {  signOut } from 'next-auth/client'
import { useRouter } from "next/router";


const MainOption = ({ setMode }) => {
  const Router = useRouter();
  const logOut = async () => {
    try {
      await signOut({ redirect: false });
      Router.push('/login-or-signup');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`w-full transition`}>
      <Link href="/account">
        <a
          href="/account"
          className="flex gap-x-3 items-center p-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-400 transition"
        >
          <img
            src="img/users/default/user.jpeg"
            alt="user"
            className="h-16 w-16 rounded-full"
          />
          <div className="leading-5">
            <p className="font-semibold text-lg capitalize">
              mubarak hussain ridoy
            </p>
            <p className="text-gray-500 dark:text-gray-300">See your profile</p>
          </div>
        </a>
      </Link>
      <Spacer />
      <Link href="/feedback">
        <a
          href="/feedback"
          className="flex gap-x-3 items-center p-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-400 transition group"
        >
          <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
            <FaCommentDots />
          </div>
          <div className="leading-5">
            <p className="font-semibold capitalize">give feedback</p>
            <p className="text-gray-500 text-sm dark:text-gray-300">
              Help us improve the new Facebook
            </p>
          </div>
        </a>
      </Link>
      <Spacer />
      <button
        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary dark:hover:bg-dark-400 transition group active:outline-none"
        onClick={() => setMode(SETTINGS_PRIVACY)}
      >
        <div className="flex gap-x-3 items-center">
          <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
            <FaCog />
          </div>
          <p className="font-semibold capitalize">settings & privacy</p>
        </div>
        <BsChevronRight className="text-2xl" />
      </button>
      <button
        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary dark:hover:bg-dark-400 transition group active:outline-none"
        onClick={() => setMode(HELP_SUPPORT)}
      >
        <div className="flex gap-x-3 items-center">
          <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
            <FaQuestionCircle />
          </div>
          <p className="font-semibold capitalize">help & support</p>
        </div>
        <BsChevronRight className="text-2xl" />
      </button>
      <button
        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary dark:hover:bg-dark-400 transition group active:outline-none"
        onClick={() => setMode(DISPLAY_ACCESSIBILITY)}
      >
        <div className="flex gap-x-3 items-center">
          <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
            <FaMoon />
          </div>
          <p className="font-semibold capitalize">display & accessibility</p>
        </div>
        <BsChevronRight className="text-2xl" />
      </button>
      <button
        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary dark:hover:bg-dark-400 transition group active:outline-none"
        onClick={logOut}
      >
        <div className="flex gap-x-3 items-center">
          <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
            <FaDoorOpen />
          </div>
          <p className="font-semibold capitalize">log out</p>
        </div>
      </button>
    </div>
  );
};

export default MainOption;
