
import { FaRegSmile } from 'react-icons/fa';
import { BsCamera } from 'react-icons/bs';


const WriteComment = () => {
    
    // resize textarea height
    const resize = e => {
        e.target.style.height = '1px';
        e.target.style.height = e.target.scrollHeight + "px";
    }

    return (
      <div className="flex items-center gap-x-2 mb-2">
        <img
          src="img/users/default/user.jpeg"
          alt="user"
          className="h-9 w-9 rounded-full"
        />
        <div className="flex flex-wrap flex-1 rounded-lg bg-secondary shadow dark:bg-dark-400 pr-2 py-1">
            <textarea
              className="flex-1 h-7 px-2 bg-transparent focus:outline-none overflow-hidden resize-none"
              placeholder="Write a comment"
              onChange={resize}
            ></textarea>
          <div className="text-gray-600 dark:text-gray-400 items-center mt-auto ml-auto mb-[1px]">
            <button className="mx-1 p-1 rounded-full transition hover:bg-dark-300">
              <FaRegSmile/>
            </button>
            <button className="mx-1 p-1 rounded-full transition hover:bg-dark-300">
              <BsCamera/>
            </button>
          </div>
        </div>
      </div>
    );
}

export default WriteComment
