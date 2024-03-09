import { BsSearch, BsThreeDots } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import Link from "next/link";
import NextImage from "../../NextImage";

const Homecontent = () => {
  return (
    <div className="">
      <div className="flex items-center font-semibold text-gray-500 dark:text-gray-300">
        <p className="capitalize text-lg">friends</p>
        <div className="ml-16 flex items-center z-10">
          <button
            className="flex justify-center items-center h-8 w-8 hover:bg-gray-200 dark:hover:bg-dark-400 active:bg-gray-300 dark:active:bg-dark-300 transition active:outline-none rounded-full"
            tooltipright="Search by name/group"
          >
            <FaVideo />
          </button>
          <button
            className="flex justify-center items-center h-8 w-8 hover:bg-gray-200 dark:hover:bg-dark-400 active:bg-gray-300 dark:active:bg-dark-300 transition active:outline-none rounded-full"
            tooltipright="Search by name/group"
          >
            <BsSearch />
          </button>
          <button
            className="flex justify-center items-center h-8 w-8 hover:bg-gray-200 dark:hover:bg-dark-400 active:bg-gray-300 dark:active:bg-dark-300 transition active:outline-none rounded-full"
            tooltipright="Search by name/group"
          >
            <BsThreeDots />
          </button>
        </div>
      </div>
      <div className="mt-3 px-1">
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </div>
    </div>
  );
};

export default Homecontent;

const Contact = ({ link = "/user", name = "user", photo }) => (
  <Link legacyBehavior href={link}>
    <a
      href={link}
      className="flex flex-nowrap gap-x-2 items-center p-2 relative hover:bg-gray-200 dark:hover:bg-dark-400 active:bg-gray-300 dark:active:bg-dark-300 active:outline-none transition rounded-md w-full"
    >
      <div className="rounded-full overflow-hidden relative">
        <NextImage className="h-7 w-7" photo={photo} />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      <p className="font-semibold capitalize text-gray-400 dark:text-gray-600">
        {name}
      </p>
    </a>
  </Link>
);
