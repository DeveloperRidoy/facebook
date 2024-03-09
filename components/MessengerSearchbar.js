import { BsSearch } from "react-icons/bs";
import { useChatContext } from "../context/ChatContext";
import { useGlobalContext } from "../context/GlobalContext";

const MessengerSearchbar = () => {
  const [state] = useGlobalContext();
  const [chat, setChat] = useChatContext();
  const searchMessenger = (e) => {
    const text = e.target.value.trim().toLowerCase();

    const filteredChats = text
      ? chat.chats.filter((item) => {
          const otherUser =
            state.user?._id === item.docs[0]?.sender?._id
              ? item.docs[0]?.participants[0]
              : item.docs[0]?.sender;
          return otherUser.fullName.trim().toLowerCase().includes(text);
        })
      : [];

    setChat((chat) => ({
      ...chat,
      filtered: text ? true : false,
      filteredChats,
    }));
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1.5 dark:bg-dark-400 mt-2 rounded-2xl">
      <BsSearch className="dark:text-gray-400" />
      <input
        type="text"
        placeholder="Search Messenger"
        className="bg-transparent focus:outline-none w-full"
        onChange={searchMessenger}
      />
    </div>
  );
};

export default MessengerSearchbar;
