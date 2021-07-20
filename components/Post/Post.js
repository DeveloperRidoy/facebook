
import { createContext, useContext, useEffect, useState } from "react";
import ExpandedContent from "./ExpandedContent/ExpandedContent";
import PostContent from "./PostContent";

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

const Post = ({post}) => {
  const [state, setState] = useState({ focusCommentBox: false, expand: false, post });

  useEffect(() => {
    setState(state => ({...state, post}))
  }, [post])

  console.log('rerendering')
    return (
      <PostContext.Provider value={[state, setState]}>
        <div className="shadow bg-white dark:bg-dark py-3 rounded-lg mb-5">
          <PostContent/>
          {state.expand && <ExpandedContent/>}
        </div>
      </PostContext.Provider>
    );
}

export default Post
