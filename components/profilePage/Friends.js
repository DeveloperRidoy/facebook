import Link from "next/link";
import { useGlobalContext } from "../../context/GlobalContext";

import NextImage from "../NextImage";

const Friends = ({ user, ownProfile }) => {
  const [state] = useGlobalContext();
  return (
    <div className="dark:bg-dark p-2 rounded-lg">
      <div className="flex justify-between items-center">
        <Link
          legacyBehavior
          href={`/${ownProfile ? state.user?.slug : user?.slug}/photos`}
        >
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
      <div className="grid grid-cols-3 items-center gap-4 justify-between mt-3 max-h-52 overflow-auto">
        {ownProfile
          ? state.user?.friends.map((friend) => (
              <Friend key={friend._id} friend={friend} state={state} />
            ))
          : user?.friends?.map((friend) => (
              <Friend key={friend._id} friend={friend} state={state} />
            ))}
      </div>
    </div>
  );
};

export default Friends;

const Friend = ({ friend, state }) => {
  const otherFriend =
    friend.requester._id === state.user?._id
      ? friend.recepient
      : friend.requester;
  return (
    <Link legacyBehavior href={otherFriend?.slug || "/"}>
      <a href={otherFriend?.slug || "/"} className="">
        <NextImage className="w-full h-20" photo={otherFriend.photo} />
        <p>{otherFriend.name}</p>
      </a>
    </Link>
  );
};
