import { forwardRef, useEffect, useRef, useState } from "react";
import { REPLY_TO_REPLY } from "../../../../utils/global/variables";
import { usePostContext } from "../../Post";
import CommentBody from "./CommentBody";

const REPLY = "REPLY";
const ReplyBody = ({reply, i}) => {
    
  const [postState] = usePostContext();

  const replies =
      postState.post?.comments.filter(
        (item) =>
          item.type === REPLY &&
          item.replyCommentId === reply._id &&
          item.replyTo?._id === reply.user?._id
        ) || [];
   
    return (
      <div>
        <div className="relative">
          <CommentBody
            type={REPLY}
            key={reply._id}
            i={i}
            comment={reply}
            post={postState.post}
          />
          {replies.length > 0 &&
            replies.map((reply, i) => (
              <div key={reply._id}>
                <CommentBody
                  i={i}
                  type={REPLY_TO_REPLY}
                  comment={reply}
                  post={postState.post}
                />
              </div>
            ))}
        </div>
      </div>
    );


}


export default ReplyBody;