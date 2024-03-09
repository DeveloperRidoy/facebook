import Link from "next/link";
import {
  FaAd,
  FaBusinessTime,
  FaCalendarAlt,
  FaClock,
  FaCreditCard,
  FaFacebookMessenger,
  FaFlag,
  FaGratipay,
  FaPaperPlane,
  FaPlaystation,
  FaRibbon,
  FaSignal,
  FaStoreAlt,
  FaTint,
  FaUserAlt,
  FaUserAltSlash,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { IoTv } from "react-icons/io5";
import Image from "next/image";
import { useGlobalContext } from "../../../context/GlobalContext";
import NextImage from "../../NextImage";

const HomeContent = () => {
  const [state] = useGlobalContext();

  const Item = ({ children, link = "/" }) => {
    return (
      <Link legacyBehavior href={link}>
        <a
          href={link}
          className="p-2 transition hover:bg-gray-200 dark:hover:bg-dark-400 active:bg-gray-300 dark:active:bg-dark-300 flex items-center rounded-md"
        >
          {children}
        </a>
      </Link>
    );
  };

  return (
    <div className="grid gap-y-1  font-semibold capitalize">
      <Item link={`/users/${state.user?.slug}`}>
        <NextImage className="h-7 w-7 rounded-full" photo={state.user?.photo} />
        <p className="ml-2">{state.user?.fullName}</p>
      </Item>
      <Item link="#">
        <FaGratipay className="text-red-500 text-2xl" />
        <p className="ml-2">covid-19 information center</p>
      </Item>
      <Item link="#">
        <FaUserFriends className="text-cyan-500 text-2xl" />
        <p className="ml-2">Friends</p>
      </Item>
      <Item link="#">
        <FaFlag className="text-cyan-500 text-2xl" />
        <p className="ml-2">pages</p>
      </Item>
      <Item link="#">
        <FaUsers className="text-cyan-500 text-2xl" />
        <p className="ml-2">groups</p>
      </Item>
      <Item link="#">
        <FaStoreAlt className="text-cyan-500 text-2xl" />
        <p className="ml-2">marketplace</p>
      </Item>
      <Item link="#">
        <FaFacebookMessenger className="text-blue-600 text-2xl" />
        <p className="ml-2">messenger</p>
      </Item>
      <Item link="#">
        <IoTv className="text-cyan-500 text-2xl" />
        <p className="ml-2">watch</p>
      </Item>
      <Item link="#">
        <FaClock className="text-cyan-500 text-2xl" />
        <p className="ml-2">memories</p>
      </Item>
      <Item link="#">
        <FaRibbon className="text-violet-600 text-2xl" />
        <p className="ml-2">saved</p>
      </Item>
      <Item link="#">
        <FaAd className="text-cyan-500 text-2xl" />
        <p className="ml-2">ad center</p>
      </Item>
      <Item link="#">
        <FaSignal className="text-cyan-500 text-2xl" />
        <p className="ml-2">ads manager</p>
      </Item>
      <Item link="#">
        <FaTint className="text-red-500 text-2xl" />
        <p className="ml-2">blood donations</p>
      </Item>
      <Item link="#">
        <FaBusinessTime className="text-cyan-500 text-2xl" />
        <p className="ml-2">business manager</p>
      </Item>
      <Item link="#">
        <FaPaperPlane className="text-cyan-500 text-2xl" />
        <p className="ml-2">campus</p>
      </Item>
      <Item link="#">
        <FaPlaystation className="text-cyan-500 text-2xl" />
        <p className="ml-2">play games</p>
      </Item>
      <Item link="#">
        <FaCreditCard className="text-gray-700 text-2xl transform -rotate-12" />
        <p className="ml-2">facebook pay</p>
      </Item>
      <Item link="#">
        <FaCalendarAlt className="text-cyan-500 text-2xl" />
        <p className="ml-2">events</p>
      </Item>
      <Item link="#">
        <FaUserAlt className="text-blue-500 text-2xl" />
        <p className="ml-2">friend lists</p>
      </Item>
    </div>
  );
};

export default HomeContent;
