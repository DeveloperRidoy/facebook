import Image from "next/image";
import { BsX } from "react-icons/bs";
import {
  FaChevronDown,
  FaMinus,
  FaPhoneAlt,
  FaVideo,
} from "react-icons/fa";

const ChatHeader = ({ otherUser, setChat, chatId }) => {

  const minimizeChat = () => {
    setChat((chat) => ({
      ...chat,
      chatBox: { ...chat.chatBox, show: false },
      minimizedChats: chat.minimizedChats?.find(
        (item) => item.chatId === chatId
      )
        ? chat.minimizedChats
        : [chat.chatBox?.chats[0], ...chat.minimizedChats],
    }));
  }


  return (
      <div className="px-2 py-1.5 flex items-center justify-between gap-2 dark:border-b-[1px] dark:border-gray-700">
        <button className="flex items-center gap-1 transition dark:hover:bg-dark-300 p-1 rounded-md overflow-hidden">
          <div className="relative h-8 w-8 max-w-9 flex-shrink-0 rounded-full">
            <Image
              src={`/img/users/${otherUser?.photo || "default/user.jpg"}`}
              alt="user"
              layout="fill"
              className="object-cover rounded-full"
              placeholder="blur"
              blurDataURL="/img/users/default/user.jpg"
            />
          </div>
          <p className="font-semibold truncate">{otherUser?.fullName}</p>
          <FaChevronDown className="text-xs mt-1" />
        </button>
        <div className=" flex items-center gap-2">
          <button className="text-blue-500 rounded-full transition dark:hover:bg-dark-300 p-1 active:scale-95">
            <FaVideo />
          </button>
          <button className="text-blue-500 rounded-full transition dark:hover:bg-dark-300 p-1 active:scale-95">
            <FaPhoneAlt />
          </button>
          <button className="text-blue-500 rounded-full transition dark:hover:bg-dark-300 p-1 active:scale-95" onClick={minimizeChat}>
            <FaMinus />
          </button>
          <button
            className="text-blue-500 rounded-full transition dark:hover:bg-dark-300 p-1 text-2xl active:scale-95"
            onClick={() =>
              setChat((chat) => ({
                ...chat,
                chatBox: { ...chat.chatBox, show: false },
              }))
            }
          >
            <BsX />
          </button>
        </div>
      </div>
    );
}

export default ChatHeader
