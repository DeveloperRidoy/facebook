import Link from 'next/link';

const StoryItem = ({ storyPhoto, userPhoto, userName, className, link="/" }) => {
    return (
      <Link href={link}>
        <a
          href={link}
          className={`${className} flex-1 rounded-lg overflow-hidden group relative bg-blue-300 flex items-end relative`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition z-10"></div>
          <div className="absolute top-3 left-3  rounded-full border-4 border-blue-500 overflow-hidden">
            <img src="img/users/default/user.jpeg" alt="user" className="h-8 w-8 rounded-full"/>
          </div>
          <div className="capitalize text-white p-2">{userName}</div>
        </a>
      </Link>
    );
}

export default StoryItem
