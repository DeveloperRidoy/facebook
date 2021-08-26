import Link from "next/link";
import { BsPlus } from "react-icons/bs";

import { useGlobalContext } from "../../context/GlobalContext";
import NextImage from "../NextImage";

const CreateStory = ({ className }) => {
  const [state] = useGlobalContext();
  return (
    <Link href="/">
      <a
        href="/"
        className={`${className} flex-1 flex flex-col justify-between overflow-hidden rounded-lg relative transition group shadow bg-white dark:bg-dark pb-2 group hover:brightness-90`}
      >
        <NextImage
          className="h-36 w-full relative group-hover:scale-[102%] transition"
          photo={state.user?.photo}
        />
        <div className="absolute bg-blue-500 border-2 border-white h-8 w-8 rounded-full top-32 inset-x-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <BsPlus className="text-white text-4xl" />
        </div>
        <p className="text-center capitalize font-semibold">create story</p>
      </a>
    </Link>
  );
};

export default CreateStory;
