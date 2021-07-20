import { BsThreeDots } from "react-icons/bs";
import {
  FaCircle,
  FaCommentDots,
  FaHeart,
  FaThumbsUp,
  FaGlobeEurope
} from "react-icons/fa";
import Spacer from "../../components/Spacer";
import Image from 'next/image';
import moment from "moment";
import { usePostContext } from "./Post";


const PostContent = () => {
 
  const [state, setState] = usePostContext();
  const {
    user,
    type,
    group,
    text,
    images,
    audios,
    videos,
    hearts,
    likes,
    comments,
    createdAt_ms,
  } = state.post;
  const showImages = 4;

  return (
    <div>
      <div className="flex items-start justify-between px-3">
        <div className="flex gap-x-2">
          <div className="h-10 w-10 relative">
            <Image
              src={`/img/users/${user?.photo || "default/user.jpeg"}`}
              alt={user?.name || "user"}
              layout="fill"
              className="h-10 w-10 rounded-full border-blue-500"
            />
          </div>
          <div>
            <p className="mt-[-5px]">
              <span className="capitalize font-semibold">
                {user?.name || "user"}{" "}
              </span>
              {/* <span className="text-gray-400">
                {type === "question" ? "asked a question " : "posted in "}
              </span>
              <span className="capitalize font-semibold">
                {group?.name || "this group"}
              </span> */}
            </p>
            <div className="flex items-center text-gray-400 text-sm gap-x-1">
              <span>{moment(createdAt_ms).fromNow()}</span>
              <span className="text-[5px]">
                <FaCircle />
              </span>
              <FaGlobeEurope className="bg-gray-400 text-gray-800 rounded-full" />
            </div>
          </div>
        </div>
        <button className="p-3 rounded-full shadow dark:bg-dark text-lg text-gray-400 transition dark:hover:bg-dark-400 dark:active:scale-95">
          <BsThreeDots />
        </button>
      </div>
      <div className="flex flex-col gap-y-3 mt-2">
        <p className="px-3">{text}</p>
        <div className="grid grid-cols-2">
          {images?.map(
            (img) =>
              img <= showImages && (
                <div className={`relative aspect-w-16 aspect-h-9 `} key={img}>
                  <Image
                    layout="fill"
                    src="/img/posts/default/picture.jpg"
                    alt="post"
                  />
                </div>
              )
          )}
          {images?.length > showImages && (
            <button className="col-span-1 dark:bg-dark transition dark:hover:bg-dark-400 active:scale-[98%]">
              show more
            </button>
          )}
        </div>
      </div>
      <div className="px-3 mt-2">
        <div className="flex justify-between items-center dark:text-gray-400">
          <div className="flex items-center gap-x-[2px]">
            <button>
              <FaThumbsUp className="text-xs text-white bg-blue-500 p-[2px] h-4 w-4 rounded-full" />
            </button>
            <button>
              <FaHeart className="text-xs text-white bg-red-500 p-[2px] h-4 w-4 rounded-full" />
            </button>
            <button className="ml-2 hover:underline">5</button>
          </div>
          {comments?.length > 0 && (
            <button
              className="hover:underline"
              onClick={() => setState(state => ({...state, expand: !state.expand}))}
            >
              {comments.length === 1 ? '1 comment': `${comments.length} comments`}
            </button>
          )}
        </div>
        <Spacer />
        <div className="flex items-center gap-x-1 dark:text-gray-400">
          <button
            className="flex-1 flex justify-center p-1 rounded items-center gap-x-2 transition 
          hover:bg-gray-200 dark:hover:bg-dark-400"
          >
            <FaThumbsUp />
            <span>Like</span>
          </button>
          <button
            className="flex-1 flex justify-center p-1 rounded items-center gap-x-2 transition 
            hover:bg-gray-200 dark:hover:bg-dark-400"
            onClick={() => setState({...state, expand: true, focusCommentBox: true})}
          >
            <FaCommentDots />
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
