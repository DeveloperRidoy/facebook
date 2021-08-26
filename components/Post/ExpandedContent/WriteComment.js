import catchAsync from "../../../utils/client/functions/catchAsync";
import { useEffect, useRef, useState } from "react";
import Axios from "../../../utils/client/axios";
import { useGlobalContext } from "../../../context/GlobalContext";
import { usePostContext } from "../Post";
import { COMMENT, DARK, QA } from "../../../utils/global/variables";
import "emoji-mart/css/emoji-mart.css";
import { RiSendPlaneFill } from "react-icons/ri";
import EmojiBtn from "../../EmojiBtn";
import NextImage from "../../NextImage";

const WriteComment = ({
  hidePic,
  type = COMMENT,
  replyTo = "",
  replyCommentId = "",
  mension = "",
}) => {
  const [postState] = usePostContext();
  const post = postState.post;
  const [state, setState] = useGlobalContext();
  const [data, setData] = useState({
    text: "",
    type,
    replyTo,
    replyCommentId,
    mension,
  });

  const commentBoxRef = useRef();

  // add comment
  const addComment = (e) =>
    catchAsync(async () => {
      e.preventDefault();

      // send request
      const res = await Axios.patch(`posts/${post._id}/comments`, data);

      // clear and focus textarea
      commentBoxRef.current?.focus();
      setData((data) => ({ ...data, text: "" }));

      // update state
      setState((state) => ({
        ...state,
        user: {
          ...state.user,
          posts: state.user?.posts?.map((post) =>
            post._id === postState.post?._id ? res.data.data?.post : post
          ),
        },
        posts: state.posts.map((item) =>
          item._id === post._id ? res.data.data?.post : item
        ),
      }));
    }, setState);

  useEffect(() => {
    if (
      postState.focusCommentBox &&
      type === COMMENT &&
      commentBoxRef?.current
    ) {
      commentBoxRef.current.focus();
    }
  }, [postState.focusCommentBoxClicked]);

  const inputChange = (e) => {
    // resize textarea height
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    setData({ ...data, text: e.target.value });
  };

  return (
    <div className="flex items-center gap-x-2 mb-2 relative">
      {!hidePic && <NextImage className="h-9 w-9 rounded-full" photo={state.user?.photo} />}
      <div className="flex flex-wrap flex-1 rounded-lg bg-secondary shadow dark:bg-dark-400 pr-2 py-1">
        <form onSubmit={addComment} className="flex-1 flex items-center">
          {type === COMMENT ? (
            <textarea
              ref={commentBoxRef}
              className="w-full h-6 px-2 bg-transparent focus:outline-none overflow-hidden resize-none dark:text-white"
              placeholder={`${
                post.type === QA && type == COMMENT
                  ? "Give an answer"
                  : "Write a comment"
              }`}
              value={data.text}
              onChange={inputChange}
              required
            ></textarea>
          ) : (
            <textarea
              className="w-full h-6 px-2 bg-transparent focus:outline-none overflow-hidden resize-none dark:text-white"
              placeholder={`${
                post.type === QA && type == COMMENT
                  ? "Give an answer"
                  : "Write a comment"
              }`}
              value={data.text}
              onChange={inputChange}
              required
            ></textarea>
          )}
          <div className="text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-auto ml-auto">
            <EmojiBtn
              className="text-blue-500"
              onSelect={(e) =>
                setData((data) => ({
                  ...data,
                  text: `${data.text} ${e.native}`,
                }))
              }
            />
            <button
              type="submit"
              className="rounded-full transition text-blue-500 text-2xl hover:bg-dark-300 p-1"
            >
              <RiSendPlaneFill className="rotate-[45deg] text-[17px]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteComment;
