import { FaCircle, FaEllipsisH } from 'react-icons/fa';

// vairables 
const MAIN = 'MAIN';
const REPLY = 'REPLY';



const Comment = () => {
    return (
      <div className="text-gray-400 mb-5">
        <CommentBody type={MAIN} comment="this is a comment"/>
        {[1, 2].map((_, i) => <CommentBody type={REPLY} key={i} i={i} comment="this is a reply"/>)}
      </div>
    );
}

export default Comment

const CommentBody = ({ type, comment, i }) => (
  <div
    className={`flex items-start gap-x-4 group mb-2 relative ${
      type === REPLY ? "ml-12" : ""
    }`}
  >
    {type === REPLY && (
      <div
        className={`absolute left-[-35px] ${
          i > 0 ? "top-[calc(-100%+10px)]" : "top-[calc(-100%+36px)]"
        } bottom-[45px] rounded-bl-xl border-l-2 border-b-2 dark:border-gray-500 w-8`}
      ></div>
    )}  
    <img
      src="img/users/default/user.jpeg"
      alt="user"
      className="h-8 w-8 rounded-full mt-2"
    />
    <div className="text-gray-300">
      <div className="bg-dark-400 px-3 py-2 rounded-2xl leading-5">
        <p className="font-semibold">User</p>
        <p>{comment}</p>
      </div>
      <div className="flex items-center gap-x-1 text-xs ml-3">
        <button className="hover:underline">Like</button>
        <FaCircle className="text-[4px] mt-1" />
        <button className="hover:underline">Reply</button>
        <FaCircle className="text-[4px] mt-1" />
        <span>2h</span>
      </div>
    </div>
    <button className="hidden group-hover:block p-1 rounded-full transition dark:hover:bg-dark-400 mt-3 ml-[-10px] text-sm">
      <FaEllipsisH />
    </button>
  </div>
);