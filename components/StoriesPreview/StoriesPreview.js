import Link from 'next/link';
import CreateStory from './CreateStory';
import StoryItem from './StoryItem';
import { BsArrowRight } from 'react-icons/bs';



const StoriesPreview = () => {
    return (
      <div className="w-full max-w-[550px] xl:max-w-full mx-auto flex justify-center gap-x-2.5 h-48 xl:px-3">
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
      className={`${className} absolute top-1/2 transform -translate-y-1/2 right-0 sm:-right-6 bg-white z-10 rounded-full h-12 w-12 shadow border hover:bg-secondary transition focus:bg-gray-200 focus:scale-95`}
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