import { BsPlus, BsSearch } from "react-icons/bs";
import { FaVideo } from "react-icons/fa"
import DotButton from "../../Buttons/DotButton";
import Link from 'next/link';

const Homecontent = () => {
    return (
      <div className="py-3">
        <div className="flex items-center font-semibold text-gray-600">
          <p className="capitalize text-lg">contacts</p>
          <div className="ml-16 flex items-center">
            <button
              className="flex justify-center items-center h-8 w-8 hover:bg-gray-200 active:bg-gray-300 transition active:outline-none rounded-full"
              tooltip="new room"
            >
              <div className="relative">
                <FaVideo />
                <BsPlus className="absolute top-0 -left-px text-white text-sm font-bold" />
              </div>
            </button>
            <button
              className="flex justify-center items-center h-8 w-8 hover:bg-gray-200 active:bg-gray-300 transition active:outline-none rounded-full"
              tooltipright="search by name/group"
            >
              <BsSearch />
            </button>
            <DotButton tooltipright="options" />
          </div>
        </div>
        <div className="mt-3 px-1">
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
        </div>
      </div>
    );
}

export default Homecontent

const Contact = ({
  link = "/user",
  name = "user",
  photo = "img/users/default/user.jpeg",
}) => (
  <Link href={link}>
    <a
      href={link}
      className="flex flex-nowrap gap-x-2 items-center p-2 relative hover:bg-gray-200 active:bg-gray-300 active:outline-none transition rounded w-full"
    >
      <div className="rounded-full overflow-hidden relative">
        <img src={photo} alt={name} className="h-7 w-7" />
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
      </div>
      <p className="font-semibold capitalize text-gray-400">{name}</p>
    </a>
  </Link>
);