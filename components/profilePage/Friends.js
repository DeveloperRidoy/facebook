import Link from "next/link";
import { useGlobalContext } from "../../context/GlobalContext";

const Friends = () => {
  const [state] = useGlobalContext();
  return (
    <div className="dark:bg-dark p-2 rounded-lg">
      <div className="flex justify-between items-center">
        <Link href={`/${state.user?.firstName}/photos`}>
          <a
            href={`/${state.user?.firstName}/photos`}
            className="text-lg font-semibold hover:underline"
          >
            Freinds
          </a>
        </Link>
        <button className="p-2 capitalize hover:bg-dark-400 transition rounded-md">
          see all friends
        </button>
      </div>
      <span className="dark:text-gray-300">248 friends</span>
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


const Friend = ({ link = "#", name = "user", img = "default/user.jpeg" }) => (
  <Link href={link}>
    <a href={link} className="col-span-">
      <img src={`/img/users/${img}`} alt={name} className="w-full object-cover rounded-lg" />
      <p>{name}</p>
    </a>
  </Link>
);