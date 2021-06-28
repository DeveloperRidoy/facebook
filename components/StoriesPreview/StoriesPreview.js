import Link from 'next/link';
import CreateStory from './CreateStory';
import StoryItem from './StoryItem';
import { BsArrowRight } from 'react-icons/bs';



const StoriesPreview = () => {
    return (
      <div className="w-full max-w-[550px] xl:max-w-2xl mx-auto flex justify-center gap-x-2.5 h-48 ">
        <CreateStory />
        <StoryItem userName="tazwar" />
        <StoryItem userName="tazwar" />
        <div className="relative flex-1">
          <StoryItem userName="tazwar" className="h-full w-full" />
          <SeeAllStories className="xl:hidden" />
        </div>
        <div className="hidden xl:block relative flex-1">
          <StoryItem userName="tazwar" className="h-full w-full" />
          <SeeAllStories />
        </div>
      </div>
    );
}

export default StoriesPreview

const SeeAllStories = ({ className }) => (
  <Link href="/stories">
    <a
      href="/stories"
      className={`${className} absolute top-1/2 transform -translate-y-1/2 right-0 sm:-right-6 bg-white dark:bg-dark-400 rounded-full h-12 w-12 shadow border dark:border-0 hover:bg-secondary dark:hover:bg-dark-300 transition focus:bg-gray-200 focus:scale-95 z-10`}
    >
      <div
        tooltip="See all stories"
        className="h-full w-full flex items-center justify-center text-2xl"
      >
        <BsArrowRight />
      </div>
    </a>
  </Link>
);