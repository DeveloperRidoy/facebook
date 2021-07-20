
import { FaCaretRight, FaRegSmile } from 'react-icons/fa';
import { BsCamera } from 'react-icons/bs';
import Image from 'next/image';
import catchAsync from '../../../utils/client/functions/catchAsync';
import { createRef, useEffect, useRef, useState } from 'react';
import Axios from '../../../utils/client/axios';
import { useGlobalContext } from '../../../context/GlobalContext'
import { usePostContext } from '../Post';



const WriteComment = () => {
  const [postState, setPostState] = usePostContext();
  const post = postState.post;
  const [state, setState] = useGlobalContext();
  const [data, setData] = useState({ text: '' });
  
  const commentBoxRef = useRef();

  // add comment 
  const addComment = (e) => catchAsync(async () => {
    e.preventDefault();
    
    // send request
    const res = await Axios.post(`posts/${post._id}/comment`, data);
   
    // clear and focus textarea
    commentBoxRef.current.focus();
    setData(data => ({...data, text: ''}))
    
    // update state
    setState((state) => ({
      ...state,
      posts: state.posts.map((item) =>
        item._id === post._id ? res.data.data?.post : item
      ),
    })); 

  }, setState)

  useEffect(() => {
    if (postState.focusCommentBox) {
      commentBoxRef.current.focus();
    }
  }, [postState])

  const inputChange = e => {
    // resize textarea height
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    setData({ ...data, text: e.target.value });
  }

    return (
      <div className="flex items-center gap-x-2 mb-2">
        <div className="h-9 w-9 relative">
          <Image
            src={`/img/users/${state.user?.photo || 'default/user.jpeg'}`}
            alt="user"
            layout="fill"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-wrap flex-1 rounded-lg bg-secondary shadow dark:bg-dark-400 pr-2 py-1">
          <form onSubmit={addComment} className="flex-1 flex items-center">
            <textarea
              ref={commentBoxRef}
              className="w-full h-7 px-2 bg-transparent focus:outline-none overflow-hidden resize-none"
              placeholder="Write a comment"
              value={data.text}
              onChange={inputChange}
              required
            ></textarea>
            <div className="text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-auto ml-auto">
              <button
                type="button"
                className="p-1 rounded-full transition hover:bg-dark-300"
              >
                <FaRegSmile />
              </button>
              <button
                type="button"
                className="p-1 rounded-full transition hover:bg-dark-300"
              >
                <BsCamera />
              </button>
              <button type="submit" className="rounded-full transition text-blue-500 text-2xl hover:bg-dark-300">
                <FaCaretRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default WriteComment
