import { useEffect, useRef, useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { COMMENT, REPLY } from '../../../../utils/global/variables';
import {usePostContext} from '../../Post'
import CommentBody from './CommentBody';
import ReplyBody from './ReplyBody';

const Comment = ({ comment }) => {
  const [postState] = usePostContext();

  const replies =
    postState.post?.comments.filter(
      (item) =>
        item.type === REPLY &&
        item.replyCommentId === comment._id &&
        item.replyTo?._id === comment.user?._id
    ) || [];

    return (
      <div className="dark:text-gray-400 mb-5 relative">
        <CommentBody type={COMMENT} comment={comment} post={postState.post} />
        {replies.map((reply) => (
          <ReplyBody reply={reply} key={reply?._id} />
        ))}
      </div>
    );
}

export default Comment

