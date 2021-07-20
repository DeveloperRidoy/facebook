import Link from 'next/link';
import Image from 'next/image';

const StoryItem = ({ storyPhoto, userPhoto, userName, className, link="/" }) => {
    return (
      <Link href={link}>
        <a
          href={link}
          className={`${className} flex-1 rounded-lg overflow-hidden group relative bg-blue-300 flex items-end relative hover:brightness-90 transition`}
        >
          <div className="absolute top-3 left-3  rounded-full border-4 border-blue-500 overflow-hidden">
            <div className="h-8 w-8 relative">
              <Image
                layout="fill"
                src="/img/users/default/user.jpeg"
                alt="user"
                className=" rounded-full"
              />
            </div>
          </div>
          <div className="capitalize text-white p-2">{userName}</div>
        </a>
      </Link>
    );
}

export default StoryItem
