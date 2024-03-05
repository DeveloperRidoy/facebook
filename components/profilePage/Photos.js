import Link from "next/link";
import { useGlobalContext } from "../../context/GlobalContext";

const Photos = () => {
  const [state] = useGlobalContext();
  return (
    <div className="dark:bg-dark p-2 rounded-lg">
      <div className="flex justify-between items-center">
        <Link legacyBehavior href={`/${state.user?.firstName}/photos`}>
          <a
            href={`/${state.user?.firstName}/photos`}
            className="text-lg font-semibold hover:underline"
          >
            Photos
          </a>
        </Link>
        <button className="p-2 capitalize hover:bg-dark-400 transition rounded-md">
          see all photos
        </button>
      </div>
    </div>
  );
};

export default Photos;
