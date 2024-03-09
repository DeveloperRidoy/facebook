import Link from "next/link";

import NextImage from "../NextImage";

const StoryItem = ({
  storyPhoto,
  userPhoto,
  userName,
  className,
  link = "/",
}) => {
  return (
    <Link legacyBehavior href={link}>
      <a
        href={link}
        className={`${className} flex-1 rounded-lg overflow-hidden group relative bg-blue-300 flex items-end relative hover:brightness-90 transition`}
      >
        <div className="absolute top-3 left-3  rounded-full border-4 border-blue-500 overflow-hidden">
          <NextImage className="h-8 w-8" photo={userPhoto} />
        </div>
        <div className="capitalize text-white p-2">{userName}</div>
      </a>
    </Link>
  );
};

export default StoryItem;
