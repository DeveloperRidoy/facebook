import { set } from 'lodash';
import { createRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa'
import toggleScrollButtons from '../../utils/client/functions/toggleScrollButtons';
import UserItem from './UserItem';

// variables 
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const CreateRoom = () => {

  const users = [];
  for (let i = 0; i <= 50; i++) users.push(i);

  const scrollableDiv = createRef();

  const [state, setState] = useState({allowScrollLeft: false, allowScrollRight: true })

  const scroll = (direction) => {
    const target = scrollableDiv.current;
    target.style.scrollBehavior = 'smooth';

    // scroll left/right
    if (direction === LEFT) {
      target.scrollLeft -= target.offsetWidth;
    } else {
      target.scrollLeft += target.offsetWidth;
    }
  }

    return (
      <div className="rounded-xl shadow bg-white dark:bg-dark my-3 relative overflow-hidden">
        <button
          className={`absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white border-gray-400 border dark:border-0 dark:bg-dark-400 rounded-full text-xl dark:hover:bg-dark-300 transition active:outline-none ${
            state.allowScrollLeft ? "focus:scale-95" : "scale-0"
          }`}
          onClick={() => scroll(LEFT)}
        >
          <BsChevronLeft />
        </button>
        <button
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white border-gray-400 border dark:border-0 dark:bg-dark-400 rounded-full text-xl dark:hover:bg-dark-300 transition active:outline-none ${
            state.allowScrollRight ? "focus:scale-95" : "scale-0"
          }`}
          onClick={() => scroll(RIGHT)}
        >
          <BsChevronRight />
        </button>
        <div
          ref={scrollableDiv}
          className="grid grid-flow-col max-w-[calc(100vw-25px)] gap-x-3 py-3 pl-3 items-center overflow-hidden"
          onScroll={(e) => toggleScrollButtons(e, state, setState)}
        >
          <button className="dark:border-blue-500 border transition hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 rounded-full py-2 px-3 dark:text-blue-500 whitespace-nowrap font-semibold flex items-center gap-x-2 min-h-0 min-w-max">
            <FaVideo className="text-pink-500" />
            <p>Create Room</p>
          </button>
          {users.map((user) => (
            <UserItem key={user} />
          ))}
        </div>
      </div>
    );
}



export default CreateRoom
