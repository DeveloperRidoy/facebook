import { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import RequestBtn from './RequestBtn';
import { BsPersonPlusFill } from "react-icons/bs";
import { FaUserFriends, FaUserPlus, FaUserTimes } from 'react-icons/fa';
import { ADD_FRIEND, FRIENDS, PENDING, REQUESTED } from '../../utils/global/variables';

// variables 
const add_friend = 'add friend';
const request_pending = 'request pending';
const request_sent = 'request sent';
const friends = 'friends';

const AddFriendBtn = ({user}) => {
  const [state] = useGlobalContext();
  const [showOptions, setShowOptions] = useState(false);

  const friend = state.user?.friends?.find(
    (friend) => friend.recepient?._id === user?._id
  );

  const status = friend
    ? friend.status === ADD_FRIEND
      ? add_friend
      : friend.status === REQUESTED
      ? request_sent
      : friend.status === PENDING
      ? request_pending
      : friend.status === FRIENDS && friends
    : add_friend;

  return (
    <div className="flex-1 relative">
      {status === add_friend ? (
        <RequestBtn
          className="dark:bg-dark-400 active:scale-95 transition h-[35px] hover:bg-dark-300"
          friend={friend}
          setShowOptions={setShowOptions}
          text="add friend"
          request={{
            type: "post",
            url: `friends/${user._id}`,
          }}
          emitEvent="friend_request_sent"
        >
          <BsPersonPlusFill className="text-xl" />
        </RequestBtn>
      ) : (
        <button
          className="w-full rounded-md flex gap-x-1 items-center justify-center bg-dark-400 py-1.5 px-2.5 active:scale-95 transition hover:bg-dark-300 capitalize cursor-pointer"
          onClick={() => setShowOptions((bool) => !bool)}
        >
          {status === friends ? (
            <FaUserFriends className="text-xl" />
          ) : (
            <FaUserPlus className="text-xl" />
          )}
          {status}
        </button>
      )}
      {showOptions && (
        <div className="absolute dark:bg-dark-400 dark:border-[1px] dark:border-gray-600 p-2 rounded top-[calc(100%+5px)] right-0 min-w-full flex flex-col gap-2 shadow-lg">
          {status === friends && (
            <RequestBtn
              className="dark:bg-dark-300 dark:hover:bg-dark-500 h-10"
              friend={friend}
              setShowOptions={setShowOptions}
              text="unfriend"
              request={{
                type: "post",
                url: `friends/unfriend/${friend?.recepient?._id}`,
              }}
              emitEvent="friend_unfriended"
            >
              {" "}
              <FaUserTimes className="text-xl" />
            </RequestBtn>
          )}
          {status === request_sent && (
            <RequestBtn
              className="dark:bg-dark-300 dark:hover:bg-dark-500 h-10"
              friend={friend}
              setShowOptions={setShowOptions}
              text="cancel request"
              request={{
                type: "delete",
                url: `friends/${friend?.recepient?._id}`,
              }}
              emitEvent="friend_request_cancelled"
            >
              <FaUserTimes className="text-xl" />
            </RequestBtn>
          )}
          {status === request_pending && (
            <>
              <RequestBtn
                className="dark:bg-dark-300 dark:hover:bg-dark-500 h-10"
                friend={friend}
                setShowOptions={setShowOptions}
                text="accept friend request"
                userAsRequester={false}
                request={{
                  type: "patch",
                  url: `friends/${friend?.recepient?._id}`,
                }}
                emitEvent="friend_request_accepted"
              >
                <FaUserPlus className="text-xl" />
              </RequestBtn>
              <RequestBtn
                className="dark:bg-dark-300 dark:hover:bg-dark-500 h-10"
                friend={friend}
                setShowOptions={setShowOptions}
                text="decline friend request"
                userAsRequester={false}
                request={{
                  type: "post",
                  url: `friends/decline/${friend?.recepient?._id}`,
                }}
              >
                <FaUserTimes className="text-xl" />
              </RequestBtn>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AddFriendBtn


