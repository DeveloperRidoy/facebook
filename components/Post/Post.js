
import { useState } from "react";
import ExpandedContent from "./ExpandedContent/ExpandedContent";
import PostContent from "./PostContent";


const Post = (post) => {
    
  const [expand, setExpand] = useState(false);

    return (
      <div className="shadow bg-white dark:bg-dark py-3 rounded-lg mb-5">
        <PostContent post={post} setExpand={setExpand} />
        {expand && <ExpandedContent/>}
      </div>
    );
}

export default Post
