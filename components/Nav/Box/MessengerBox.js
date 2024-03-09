import moment from "moment-shortformat";
import { FaCircle } from "react-icons/fa";
import { useChatContext } from "../../../context/ChatContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import { ThumbsUp } from "../../icons/ThumbsUp";
import MessengerSearchbar from "../../MessengerSearchbar";
import NextImage from "../../NextImage";
import Spinner from "../../Spinners/Spinner/Spinner";

const MessengerBox = ({ setBox }) => {
  const [chat, setChat] = useChatContext();
  const [state] = useGlobalContext();

  return (
    <div>
      {chat.loading ? (
        <Spinner className="mx-auto" />
      ) : (
        <div>
          <p className="capitalize font-semibold text-xl">messenger</p>
          {chat.chats?.length > 0 ? <MessengerSearchbar /> : <p>no chats</p>}
          <div className="mt-2 flex flex-col gap-1">
            {chat.filteredChats?.length > 0 && chat.filtered
              ? chat.filteredChats.map((chatItem) => (
                  <ChatItem
                    key={chatItem._id?.chatId}
                    chatItem={chatItem}
                    user={state.user}
                    setChat={setChat}
                    setBox={setBox}
                  />
                ))
              : chat.chats?.length > 0 &&
                !chat.filtered &&
                chat.chats.map((chatItem) => (
                  <ChatItem
                    key={chatItem._id?.chatId}
                    chatItem={chatItem}
                    user={state.user}
                    setChat={setChat}
                    setBox={setBox}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessengerBox;

const ChatItem = ({ chatItem, user, setChat, setBox }) => {
  const lastMessage = chatItem.docs[0];
  const otherUser =
    user?._id === lastMessage.sender?._id
      ? lastMessage.participants[0]
      : lastMessage.sender;

  const lastMessageNotRead =
    lastMessage.sender._id !== user._id
      ? lastMessage.readBy.find((item) => item === user._id)
        ? false
        : true
      : false;

  return (
    <button
      key={chatItem._id}
      className="flex-1 flex gap-2 items-center justify-start transition dark:hover:bg-dark-400 p-2 rounded-md relative"
      onClick={() => {
        setBox({ show: false, type: null });
        setChat((chat) => ({
          ...chat,
          chatBox: { show: true, chats: chatItem.docs },
          minimizedChats: chat.minimizedChats?.filter(
            (item) => item.chatId !== chatItem._id?.chatId
          ),
        }));
      }}
    >
      <NextImage className="h-12 w-12 rounded-full" photo={otherUser?.photo} />
      <div className="flex flex-col items-start">
        <p className="text-xl capitalize">{otherUser.fullName}</p>
        <div className="flex text-sm gap-1">
          <p
            className={`transition truncate ${
              lastMessageNotRead ? "text-blue-500" : "dark:text-gray-300"
            }`}
          >
            {chatItem.docs[0].message === "&#x1f44d;" ? (
              <ThumbsUp />
            ) : (
              chatItem.docs[0].message
            )}
          </p>
          <FaCircle className="text-[4px] self-center" />
          <span className="dark:text-gray-300">
            {moment(
              moment() -
                (36e5 * (Date.now() - chatItem.docs[0].createdAt_ms)) / 3600000
            ).short(true)}
          </span>
        </div>
      </div>
      <FaCircle
        className={`absolute top-1/2 -translate-y-1/2 right-2 text-blue-500 text-xs transition ${
          lastMessageNotRead ? "scale-1" : "scale-0"
        }`}
      />
    </button>
  );
};
