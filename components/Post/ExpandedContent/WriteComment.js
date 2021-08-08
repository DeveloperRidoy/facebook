import { FaCaretRight, FaRegSmile } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";
import Image from "next/image";
import catchAsync from "../../../utils/client/functions/catchAsync";
import { useEffect, useRef, useState } from "react";
import Axios from "../../../utils/client/axios";
import { useGlobalContext } from "../../../context/GlobalContext";
import { usePostContext } from "../Post";
import { COMMENT, DARK } from "../../../utils/global/variables";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

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
  const [emojis, setEmojis] = useState({ show: false, positionOnTop: true });
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
        posts: state.posts.map((item) =>
          item._id === post._id ? res.data.data?.post : item
        ),
      }));

      //  close emoji menu if open
      if (emojis.show) setEmojis((state) => ({ ...state, show: false }));
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

  // function to toggle emojis
  const toggleEmojis = (e) =>
    setEmojis((state) => ({
      show: !state.show,
      positionOnTop:
        e.target.getBoundingClientRect().top / window.innerHeight > 0.5,
    }));
  return (
    <div className="flex items-center gap-x-2 mb-2 relative">
      {!hidePic && (
        <div className="h-9 w-9 relative">
          <Image
            src={`/img/users/${state.user?.photo || "default/user.jpg"}`}
            alt="user"
            layout="fill"
            className="object-cover rounded-full"
          />
        </div>
      )}
      <div className="flex flex-wrap flex-1 rounded-lg bg-secondary shadow dark:bg-dark-400 pr-2 py-1">
        <form onSubmit={addComment} className="flex-1 flex items-center">
          {type === COMMENT ? (
            <textarea
              ref={commentBoxRef}
              className="w-full h-6 px-2 bg-transparent focus:outline-none overflow-hidden resize-none dark:text-white"
              placeholder="Write a comment"
              value={data.text}
              onChange={inputChange}
              required
            ></textarea>
          ) : (
            <textarea
              className="w-full h-6 px-2 bg-transparent focus:outline-none overflow-hidden resize-none dark:text-white"
              placeholder="Write a comment"
              value={data.text}
              onChange={inputChange}
              required
            ></textarea>
          )}
          <div className="text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-auto ml-auto">
            <div>
              <button
                type="button"
                className={`p-1 rounded-full transition  ${
                  emojis.show ? "bg-dark-300" : "hover:bg-dark-300"
                }`}
                onClick={toggleEmojis}
              >
                <FaRegSmile />
              </button>
              {emojis.show && (
                <div
                  className={`absolute right-0 z-10 ${
                    emojis.positionOnTop ? "bottom-full" : ""
                  }`}
                >
                  <Picker
                    set="facebook"
                    enableFrequentEmojiSort={true}
                    theme={state.theme === DARK ? "dark" : "light"}
                    emojiTooltip={true}
                    title="select emojis"
                    onSelect={(e) =>
                      setData((data) => ({
                        ...data,
                        text: `${data.text} ${e.native}`,
                      }))
                    }
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="rounded-full transition text-blue-500 text-2xl hover:bg-dark-300"
            >
              <FaCaretRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteComment;
