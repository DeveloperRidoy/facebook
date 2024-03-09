import { BsThreeDots } from "react-icons/bs";
import {
  FaCircle,
  FaCommentDots,
  FaThumbsUp,
  FaGlobeEurope,
} from "react-icons/fa";
import Spacer from "../../Spacer";

import moment from "moment-shortformat";
import { usePostContext } from "../Post";
import LikeButton from "./LikeButton";
import { CAROUSEL } from "../../../utils/client/variables";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useState } from "react";
import catchAsync from "../../../utils/client/catchAsync";
import Axios from "../../../utils/client/axios";
import { POST, QA } from "../../../utils/global/variables";
import Link from "next/link";
import NextImage from "../../NextImage";
import { bytesToBase64 } from "byte-base64";

const PostContent = () => {
  const [globalState, setGlobalState] = useGlobalContext();
  const [state, setState] = usePostContext();
  const [showOptions, setShowOptions] = useState(false);
  const {
    _id,
    user,
    type,
    group,
    text,
    qaText,
    photos = [],
    audios,
    videos = [],
    likes,
    comments,
    postBackground,
    qaBackground,
    createdAt_ms,
  } = state.post;
  const medias = [];
  photos.forEach((photo) => medias.push({ type: "image", photo }));
  videos.forEach((video) =>
    medias.push({ type: "video", src: bytesToBase64(video.data.data) })
  );
  const [showMedias, setShowMedias] = useState(3);

  const filteredComments = comments.filter((comment) => comment.user);
 
  const deletePost = () =>
    catchAsync(async () => {
      await Axios.delete(`posts/${_id}`);
      setGlobalState((state) => ({
        ...state,
        user: {
          ...state.user,
          posts: state.user?.posts?.filter((post) => post._id !== _id),
        },
        posts: state.posts?.filter((post) => post._id !== _id),
        alert: { show: true, text: "post deleted" },
      }));
    }, setState);

  const showCarouselModel = (e, i) => {
    e.preventDefault();
    setGlobalState((state) => ({
      ...state,
      model: {
        show: true,
        type: CAROUSEL,
        data: {
          medias,
          startIndex: i,
        },
      },
    }));
  };

  return (
    <div>
      <div className="flex items-start justify-between px-3">
        <div className="flex gap-x-2">
          <Link legacyBehavior href={`/users/${user.slug}`}>
            <a href={`/users/${user.slug}`}>
              <NextImage
                className="h-10 w-10 rounded-full"
                photo={user?.photo}
              />
            </a>
          </Link>
          <div>
            <p className="mt-[-5px]">
              <Link legacyBehavior href={`/users/${user.slug}`}>
                <a
                  href={`/users/${user.slug}`}
                  className="capitalize font-semibold"
                >
                  {user?.firstName || "user"}{" "}
                </a>
              </Link>
              <span className="text-gray-400">
                {type === QA ? "asked a question " : "posted "}
              </span>
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
        <div className="relative">
          <button
            className="p-3 rounded-full shadow dark:bg-dark text-lg text-gray-400 transition dark:hover:bg-dark-400 dark:active:scale-95"
            onClick={() => setShowOptions((show) => !show)}
          >
            <BsThreeDots />
          </button>
          {showOptions && globalState.user?._id === user._id && (
            <div className="absolute p-2 dark:bg-dark min-w-max right-0 shadow-lg dark:border-[1px] dark:border-white/10 rounded z-10">
              <button onClick={deletePost}>delete post</button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-y-3 mt-2 ${
          type === POST ? postBackground : qaBackground
        }`}
      >
        <p className="px-3">{type === QA ? qaText : text}</p>
        <div className="grid grid-cols-2 gap-1">
          {medias?.length > 0 &&
            medias.map(
              (media, i) =>
                i < showMedias && (
                  <div key={i} tabIndex="0">
                    {media.type === "image" ? (
                      <NextImage
                        photo={media.photo}
                        className={`relative aspect-w-16 aspect-h-9 hover:cursor-pointer`}
                        onClick={(e) => showCarouselModel(e, i)}
                      />
                    ) : (
                      media.type === "video" && (
                        <video
                          src={`${media.src}`}
                          controls={true}
                          onClick={(e) => showCarouselModel(e, i)}
                        ></video>
                      )
                    )}
                  </div>
                )
            )}
          {medias?.length > showMedias && (
            <button
              className="col-span-1 dark:bg-dark transition dark:hover:bg-dark-400 active:scale-[98%]"
              onClick={() => setShowMedias(medias.length)}
            >
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
            <button className="ml-2 hover:underline">{likes.length}</button>
          </div>
          {filteredComments?.length > 0 && (
            <button
              className="hover:underline"
              onClick={() =>
                setState((state) => ({ ...state, expand: !state.expand }))
              }
            >
              {filteredComments.length === 1
                ? `1 ${type === QA ? "answer" : "comment"}`
                : `${comments.length} ${type === QA ? "answers" : "comments"}`}
            </button>
          )}
        </div>
        <Spacer />
        <div className="flex gap-x-1 dark:text-gray-400">
          <LikeButton />
          <button
            className="flex-1 flex justify-center p-1 rounded items-center gap-x-2 transition 
            hover:bg-gray-200 dark:hover:bg-dark-400"
            onClick={() =>
              setState((state) => ({
                ...state,
                expand: !state.expand,
                focusCommentBox: !state.expand,
              }))
            }
          >
            <FaCommentDots />
            <span className="capitalize">
              {type === QA ? "answer" : "comment"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
