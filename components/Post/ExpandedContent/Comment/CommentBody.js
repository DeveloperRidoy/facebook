import { FaCircle, FaEllipsisH, FaThumbsUp } from "react-icons/fa";

import moment from "moment-shortformat";
import catchAsync from "../../../../utils/client/functions/catchAsync";
import { useGlobalContext } from "../../../../context/GlobalContext";
import Axios from "../../../../utils/client/axios";
import Button from "../../../Buttons/Button";
import { useState } from "react";
import WriteComment from "../WriteComment";
import Link from "next/link";
import NextImage from "../../../NextImage";

// vairables
const REPLY = "REPLY";
const REPLY_TO_REPLY = "REPLY_TO_REPLY";

const CommentBody = ({ type, comment, post }) => {
  const [state, setState] = useGlobalContext();
  const alreadyLiked = comment.likes.find(
    (item) => item.user?._id === state.user?._id
  );
  const [loading, setLoading] = useState(false);
  const [expand, setExpand] = useState(false);

  const likeComment = () =>
    catchAsync(
      async () => {
        setLoading(true);
        const res = !alreadyLiked
          ? await Axios.post(`posts/${post._id}/comments/${comment._id}/like`)
          : await Axios.delete(
              `posts/${post._id}/comments/${comment._id}/like`
            );

        setState((state) => ({
          ...state,
          user: {
            ...state.user,
            posts: state.user?.posts?.map((item) =>
              item._id === post?._id ? res.data.data?.post : post
            ),
          },
          posts: state.posts.map((item) =>
            item._id === post._id ? res.data.data?.post : item
          ),
        }));
        setLoading(false);
      },
      setState,
      () => setLoading(false)
    );

  return (
    <div
      className={`mb-2 ${
        type === REPLY ? "ml-12" : type === REPLY_TO_REPLY && "ml-24"
      }`}
    >
      <div className="flex gap-2">
        <NextImage className="h-8 w-8 rounded-full" photo={comment?.user?.photo} />
        <div className="dark:text-gray-300">
          <div className="bg-secondary dark:bg-dark-400 shadow px-3 py-2 rounded-2xl leading-5 max-w-max relative">
            <Link href={`/users/${comment?.user?.slug}`}>
              <a
                href={`/users/${comment?.user?.slug}`}
                className="font-semibold hover:underline"
              >
                {comment?.user?.firstName}
              </a>
            </Link>
            <p>
              {type === REPLY_TO_REPLY && (
                <Link href={`/users/${comment?.mension?.slug}`}>
                  <a
                    href={`/users/${comment?.mension?.slug}`}
                    className="font-semibold hover:underline"
                  >
                    {comment?.mension?.firstName}
                  </a>
                </Link>
              )}{" "}
              <span>{comment.text}</span>
            </p>
            {comment.likes?.length > 0 && (
              <div className="absolute -right-5 bottom-1 text-xs dark:bg-dark-400 px-1 rounded-lg flex items-center gap-1 shadow-lg dark:border-gray-700 brightness-90 border-[1px]">
                <FaThumbsUp className="text-blue-500" />
                <span>{comment.likes.length}</span>
              </div>
            )}
            <button className="hidden group-hover:block absolute top-2 -right-8 p-1 rounded-full transition hover:bg-gray-300 dark:hover:bg-dark-400 text-sm">
              <FaEllipsisH />
            </button>
          </div>
          <div className="flex items-center gap-x-1 text-xs ml-3">
            <Button
              loading={loading}
              className={`transition w-5 ${
                alreadyLiked ? "text-blue-500" : "hover:underline"
              }`}
              onClick={likeComment}
            >
              {!loading && "like"}
            </Button>

            <FaCircle className="text-[4px] mt-1" />
            <button
              className="hover:underline"
              onClick={() => setExpand((expand) => !expand)}
            >
              reply
            </button>

            <FaCircle className="text-[4px] mt-1" />
            <span>{moment(comment.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
      {expand && (
        <div className="ml-12">
          <WriteComment
            hidePic
            type={REPLY}
            replyTo={type === REPLY_TO_REPLY ? comment.replyTo : comment.user}
            mension={type === REPLY_TO_REPLY ? comment.user : ""}
            replyCommentId={
              type === REPLY_TO_REPLY ? comment.replyCommentId : comment._id
            }
          />
        </div>
      )}
    </div>
  );
};

export default CommentBody;
