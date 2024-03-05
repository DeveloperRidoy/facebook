import { FaCaretDown, FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

const Navigator = () => {
  const Router = useRouter();

  return (
    <div className="w-full flex items-center justify-between py-1">
      <div className="flex gap-x-4 font-semibold">
        <NavItem
          text="posts"
          link={`/users/${Router.query.slug}`}
          router={Router}
        />
        <NavItem
          text="about"
          link={`/users/${Router.query.slug}/about`}
          router={Router}
        />
        <NavItem
          text="friends"
          link={`/users/${Router.query.slug}/friends`}
          router={Router}
        />
        <NavItem
          text="photos"
          className="hidden sm:flex"
          link={`/users/${Router.query.slug}/photos`}
          router={Router}
        />
        <NavItem
          text="story archives"
          className="hidden sm:flex"
          link={`/users/${Router.query.slug}/story-archives`}
          router={Router}
        />
        <NavItem
          text="videos"
          className="hidden md:flex"
          link={`/users/${Router.query.slug}/videos`}
          router={Router}
        />
        <button className="flex items-center px-2 py-4">
          <span>more</span>
          <FaCaretDown className="mt-[2px]" />
        </button>
      </div>
      <button className="bg-dark-400 transition hover:brightness-125 py-2 px-3 rounded-lg">
        <FaEllipsisH />
      </button>
    </div>
  );
};

export default Navigator;

const NavItem = ({
  link = "#",
  text = "item",
  children,
  className,
  router,
}) => {
  return (
    <Link legacyBehavior href={link}>
      <a
        href={link}
        className={`whitespace-nowrap capitalize border-b-4 px-2 py-2 flex items-center justify-center transition ${className} ${
          link === router.asPath
            ? "text-blue-500 border-blue-500"
            : "text-gray-300 border-white/0 hover:bg-dark-400 rounded-md"
        }`}
      >
        {text}
        {children}
      </a>
    </Link>
  );
};
