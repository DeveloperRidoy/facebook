import Link from "next/link";
import { useGlobalContext } from "../../context/GlobalContext";

import NextImage from "../NextImage";

const Friends = ({ user, ownProfile }) => {
  const [state] = useGlobalContext();
  return (
    <div className="dark:bg-dark p-2 rounded-lg">
      <div className="flex justify-between items-center">
        <Link href={`/${ownProfile ? state.user?.slug : user?.slug}/photos`}>
          <a
            href={`/${ownProfile ? state.user?.slug : user?.slug}/photos`}
            className="text-lg font-semibold hover:underline"
          >
            Freinds
          </a>
        </Link>
        <button className="p-2 capitalize hover:bg-dark-400 transition rounded-md">
          see all friends
        </button>
      </div>
      <span className="dark:text-gray-300">
        {ownProfile ? state.user?.friends?.length : user?.friends?.length}{" "}
        friends
      </span>
      <div className="grid grid-cols-3 items-center gap-4 justify-between mt-3">
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </div>
    </div>
  );
};

export default Friends;

const Friend = ({ link = "#", name = "user", photo }) => (
  <Link href={link}>
    <a href={link} className="">
      <NextImage className="w-full h-20" photo={photo} />
      <p>{name}</p>
    </a>
  </Link>
);
