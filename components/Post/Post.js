
import { createContext, useContext, useEffect, useState } from "react";
import ExpandedContent from "./ExpandedContent/ExpandedContent";
import PostContent from "./PostContent/PostContent";

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

const Post = ({post}) => {
  const [state, setState] = useState({ focusCommentBox: false, focusCommentBoxClicked: 0, expand: false, post });

  useEffect(() => {
    setState(state => ({...state, post}))
  }, [post])

    return (
      <PostContext.Provider value={[state, setState]}>
        <div className="shadow bg-white dark:bg-dark py-3 rounded-lg mb-3">
          <PostContent/>
          {state.expand && <ExpandedContent/>}
        </div>
      </PostContext.Provider>
    );
}

export default Post
