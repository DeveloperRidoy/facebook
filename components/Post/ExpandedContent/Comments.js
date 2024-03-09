import { useState } from 'react';
import { COMMENT } from '../../../utils/global/variables';
import { usePostContext } from '../Post';
import Comment from './Comment/Comment';

const showLimit = 10;
const Comments = () => {
    
    const [postState, setPostState] = usePostContext();
  const comments = postState.post.comments.filter(comment => comment.type === COMMENT && comment.user);

    const [state, setState] = useState({
      showCount: showLimit,
      leftToShow: comments.length - showLimit,
    });

    return (
      <div>
        {comments
          .slice(0)
          .reverse()
          .map(
            (comment, i) =>
              i < state.showCount && comment.user && (
                <Comment comment={comment} key={comment._id} />
              )
          )}
        {state.leftToShow > 0 && (
          <button
            className="hover:underline"
            onClick={() => {
              setState((state) => ({
                showCount: state.showCount + showLimit,
                leftToShow: comments.length - (state.showCount + showLimit),
              }));
            }}
          >
            show {state.leftToShow < 5 ? `${state.leftToShow}` : ""} more{" "}
            {state.leftToShow === 1 ? "comment" : "comments"}
          </button>
        )}
        {comments.length > 10 && (
          <button
            className="mt-2 block hover:underline"
            onClick={() =>
              setPostState((state) => ({
                ...state,
                focusCommentBox: true,
                focusCommentBoxClicked: state.focusCommentBoxClicked + 1,
              }))
            }
          >
            write a comment
          </button>
        )}
      </div>
    );
}

export default Comments
