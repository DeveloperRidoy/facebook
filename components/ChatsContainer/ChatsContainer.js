import { AnimatePresence, motion } from "framer-motion";

import { FaCaretRight, FaEdit, FaTimes } from "react-icons/fa";
import { useChatContext } from "../../context/ChatContext";
import { useGlobalContext } from "../../context/GlobalContext";
import ChatBox from "./ChatBox/ChatBox";
import NewMessageBox from "./NewMessageBox";
import { ThumbsUp } from "../icons/ThumbsUp";
import NextImage from "../NextImage";

const ChatsContainer = ({ className }) => {
  const [chat, setChat] = useChatContext();
  const [state] = useGlobalContext();
  return (
    <div className={`flex items-end ${className}`}>
      <AnimatePresence>
        {chat.chatBox?.show && (
          <ChatBox
            key="chatBox"
            className="h-screen fixed sm:static left-0 right-0"
          />
        )}
        {chat.showNewMessageBox && <NewMessageBox key="newMessage" />}
      </AnimatePresence>
      <div className="flex flex-col items-center gap-2 mb-5 px-2">
        {chat.minimizedChats?.length > 0 &&
          chat.minimizedChats.map((item) => (
            <MinimizedItem
              key={item.chatId}
              item={item}
              setChat={setChat}
              state={state}
            />
          ))}
        <button
          className="dark:bg-dark-400 transition dark:hover:bg-dark-300 active:scale-95 p-4 text-xl rounded-full"
          onClick={() =>
            setChat((chat) => ({
              ...chat,
              showNewMessageBox: !chat.showNewMessageBox,
            }))
          }
        >
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default ChatsContainer;

const MinimizedItem = ({ item, setChat, state }) => {
  const notSeen = !item?.readBy?.find((user) => user === state.user._id);
  const maximizeChat = () => {
    setChat((chat) => ({
      ...chat,
      minimizedChats: chat.minimizedChats?.filter(
        (minimizedItem) => minimizedItem.chatId !== item.chatId
      ),
      chatBox: {
        show: true,
        newChat: chat.chats.find(
          (chatItem) => chatItem._id?.chatId === item.chatId
        )
          ? false
          : true,
        chats: chat.chats.find(
          (chatItem) => chatItem._id?.chatId === item.chatId
        )?.docs || [item],
      },
    }));
  };

  const fromUser = state.user?._id === item?.sender?._id;
  const removeMinimizedChat = () => {
    setChat((chat) => ({
      ...chat,
      minimizedChats: chat.minimizedChats?.filter(
        (chatItem) => chatItem.chatId !== item.chatId
      ),
    }));
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="rounded-full relative group"
    >
      <button onClick={maximizeChat}>
        <NextImage
          className="h-12 w-12 rounded-full"
          photo={fromUser ? item.participants[0]?.photo : item.sender?.photo}
        />
      </button>
      <button
        className="absolute -top-2 -right-1 dark:bg-dark-400  p-[1.5px] rounded-full text-white transition scale-0 group-hover:scale-100"
        onClick={removeMinimizedChat}
      >
        <FaTimes />
      </button>
      {item.message && (
        <div
          className={`transition ${
            notSeen
              ? "dark:bg-dark-400"
              : "scale-0 group-hover:scale-100 dark:bg-dark-400/50"
          }  absolute top-1/2 -translate-y-1/2 right-[calc(100%+10px)]  py-1 px-2 rounded-md`}
        >
          <span className="truncate">
            {item?.message ? (
              item.message === "&#x1f44d;" ? (
                <ThumbsUp />
              ) : (
                item.message
              )
            ) : item.photos?.length > 0 && item.videos.length > 0 ? (
              fromUser ? (
                "you sent some files"
              ) : (
                "you received some files"
              )
            ) : item.photos?.length > 0 ? (
              fromUser ? (
                "you sent a photo"
              ) : (
                "you received a photo"
              )
            ) : item.videos?.length > 0 ? (
              fromUser ? (
                "you sent a video"
              ) : (
                "you received a video"
              )
            ) : (
              ""
            )}
          </span>
          <FaCaretRight
            className={`absolute top-1/2 -translate-y-1/2 right-[-14px] z-50 text-2xl  ${
              notSeen ? "dark:text-dark-400" : "dark:text-dark-400/50"
            }`}
          />
        </div>
      )}
    </motion.div>
  );
};
