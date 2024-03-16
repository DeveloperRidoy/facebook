import Link from "next/link";
import { FaImage, FaRegGrinAlt, FaVideo } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext";
import { CREATE_POST } from "../utils/client/variables";
import Spacer from "./Spacer";

import NextImage from "./NextImage";

const CreatePost = () => {
  const [state, setState] = useGlobalContext();

  return (
    <div className="bg-white dark:bg-dark rounded-xl shadow p-3">
      <div className="flex items-center gap-x-3 ">
        <Link legacyBehavior href={`/users/${state.user?.slug}`}>
          <a href={`/users/${state.user?.slug}`} className="h-10 w-10 relative">
            <NextImage
              className="h-full w-full rounded-full"
              photo={state.user?.photo}
            />
          </a>
        </Link>
        <button
          className="bg-secondary dark:bg-dark-400 dark:hover:bg-dark-300 flex-1 rounded-full py-2 px-3 text-left hover:bg-gray-200 focus:bg-gray-300 transition text-lg text-gray-500 dark:text-gray-300 active:outline-none"
          onClick={() =>
            setState({ ...state, model: { show: true, type: CREATE_POST } })
          }
        >
          What's on your mind, <span className="capitalize">{state.user?.firstName}</span>?
        </button>
      </div>
      <Spacer className="mt-3" />
      <div className="flex flex-wrap whitespace-nowrap justify-around pt-3 text-gray-600 dark:text-gray-300 font-semibold">
        <Link legacyBehavior href="/">
          <a
            href="/"
            className="flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-400  transition"
          >
            <FaVideo className="text-2xl mr-1 text-red-500" />
            <span className="capitalize">live video</span>
          </a>
        </Link>
        <Link legacyBehavior href="/">
          <a
            href="/"
            className="flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-400  transition"
          >
            <FaImage className="text-2xl mr-1 text-emerald-500 transform -rotate-12" />
            <span className="capitalize">photo/video</span>
          </a>
        </Link>
        <Link legacyBehavior href="/">
          <a
            href="/"
            className="flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-400  transition"
          >
            <FaRegGrinAlt className="text-2xl mr-1 text-yellow-500" />
            <span className="capitalize">feeling/activity</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CreatePost;
