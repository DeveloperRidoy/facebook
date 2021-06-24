import Link from 'next/link';
import { BsPlus } from "react-icons/bs";

const CreateStory = ({className}) => {
    return (
      <Link href="/stories/create">
        <a
          href="/stories/create"
          className={`${className} flex-1 flex flex-col justify-between overflow-hidden rounded-lg relative transition group shadow bg-white pb-2`}
        >
          <div className="absolute inset-0 bg-black z-10 transition bg-opacity-0 group-hover:bg-opacity-10"></div>
          <img src="img/users/default/user.jpeg" alt="user" className="h-36 w-full object-cover"/>
          <div className="absolute bg-blue-500 border-2 border-white h-8 w-8 rounded-full top-32 inset-x-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <BsPlus className="text-white text-4xl" />
          </div>
          <p className="text-center capitalize font-semibold">
            create story
          </p>
        </a>
      </Link>
    );
}

export default CreateStory
