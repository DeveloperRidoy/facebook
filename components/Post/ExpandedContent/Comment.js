import { FaCircle, FaEllipsisH } from 'react-icons/fa';
import Image from 'next/image';
import moment from 'moment';

// vairables 
const MAIN = 'MAIN';
const REPLY = 'REPLY';
const REPLY_TO_REPLY = 'REPLY_TO_REPLY';


const Comment = ({ comment }) => {
    return (
      <div className="dark:text-gray-400  mb-5">
        <CommentBody type={MAIN} comment={comment} />
        {comment.replies?.length > 0 &&
          comment.replies.map((reply, i) => (
            <CommentBody
              type={REPLY}
              key={reply._id}
              i={i}
              comment={reply}
            />
          ))}
        {comment.replies?.replies?.length > 0 &&
          comment.replies?.replies?.map((reply) => (
            <CommentBody
              key={reply._id}
              type={REPLY_TO_REPLY}
              comment={reply}
            />
          ))}
      </div>
    );
}

export default Comment

const CommentBody = ({ type, comment, i }) => {
  return (
    <div
      className={`flex items-start gap-x-4 group mb-2 relative ${
        type === REPLY ? "ml-12" : type === REPLY_TO_REPLY && "ml-24"
      }`}
    >
      {type !== MAIN && (
        <div
          className={`absolute left-[-35px] ${
            i > 0 ? "top-[calc(-100%)]" : "top-[calc(-100%+26px)]"
          } bottom-[54px] rounded-bl-xl border-l-2 border-b-2 dark:border-gray-500 w-9`}
        ></div>
      )}
      <div className="h-8 w-8 relative">
        <Image
          src={`/img/users/${comment.user?.photo || 'default/user.jpeg'}`}
          alt="user"
          layout="fill"
          className="rounded-full z-10"
        />
      </div>
      <div className="dark:text-gray-300">
        <div className="bg-secondary dark:bg-dark-400 shadow px-3 py-2 rounded-2xl leading-5">
          <p className="font-semibold">User</p>
          <p>{comment.text}</p>
        </div>
        <div className="flex items-center gap-x-1 text-xs ml-3">
          <button className="hover:underline">Like</button>
          <FaCircle className="text-[4px] mt-1" />
          <button className="hover:underline">Reply</button>
          <FaCircle className="text-[4px] mt-1" />
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
      </div>
      <button className="hidden group-hover:block p-1 rounded-full transition hover:bg-gray-300 dark:hover:bg-dark-400 mt-3 ml-[-10px] text-sm">
        <FaEllipsisH />
      </button>
    </div>
  );
}