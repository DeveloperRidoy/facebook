import Link from 'next/link';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FaImage, FaRegGrinAlt, FaVideo } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';


const CreatePost = () => {

  const [state, setState] = useGlobalContext();

    return (
      <div className="bg-white rounded-xl shadow p-3">
        <div className="flex items-center gap-x-3 border-b pb-3">
          <Link href="/user">
            <a href="/user">
              <img
                src="img/users/default/user.jpeg"
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </a>
          </Link>
          <button
            className="bg-secondary flex-1 rounded-full p-2 text-left hover:bg-gray-100 focus:bg-gray-200 transition text-lg text-gray-500 active:outline-none"
            onClick={() => setState({ ...state, showCreatePostModel: true })}
          >
            What's on your mind, <span className="capitalize">mubarak</span>?
          </button>
        </div>
        <div className="flex justify-around pt-3 text-gray-600 font-semibold">
          <Link href="/">
            <a
              href="/"
              className="flex-1 flex items-center justify-center py-2 hover:bg-secondary transition"
            >
              <div className="relative">
                <FaVideo className="text-2xl mr-1 text-red-500" />
                <BsEyeFill className="text-white text-xs absolute top-[5px] left-[2px]" />
              </div>
              <span className="capitalize">live video</span>
            </a>
          </Link>
          <Link href="/">
            <a
              href="/"
              className="flex-1 flex items-center justify-center py-2 hover:bg-secondary transition"
            >
              <FaImage className="text-2xl mr-1 text-emerald-500 transform -rotate-12" />
              <span className="capitalize">photo/video</span>
            </a>
          </Link>
          <Link href="/">
            <a
              href="/"
              className="flex-1 flex items-center justify-center py-2 hover:bg-secondary transition"
            >
              <FaRegGrinAlt className="text-2xl mr-1 text-yellow-500" />
              <span className="capitalize">feeling/activity</span>
            </a>
          </Link>
        </div>
      </div>
    );
}

export default CreatePost
