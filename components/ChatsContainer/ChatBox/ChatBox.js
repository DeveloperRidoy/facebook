import { motion } from "framer-motion";
import { cloneDeep } from "lodash";
import { createRef, useEffect } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import Axios from "../../../utils/client/axios";
import catchAsync from "../../../utils/client/catchAsync";
import { FRIENDS } from "../../../utils/client/variables";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ChatIntro from "./ChatIntro";
import ChatMessages from "./ChatMessages";

export const ChatsContainerRef = createRef();
const ChatBox = ({ className }) => {
  const [chat, setChat] = useChatContext();
  const [state, setState] = useGlobalContext();
  const chats = chat.chatBox.chats;
  const chatId = chats && chats[0]?.chatId;
  const otherUser =
    chats && state.user?._id === chats[0]?.sender?._id
      ? chats && chats[0]?.participants[0]
      : chats && chats[0]?.sender;

  useEffect(
    () =>
      catchAsync(async () => {
        // scroll to the bottom message
        ChatsContainerRef.current.scrollTop =
          ChatsContainerRef.current.scrollHeight;

        // make all unseen messages as seen
        const unseenMessageIds = chat.chatBox.chats
          .filter(
            (item) =>
              item.sender._id !== state.user._id &&
              !item.readBy?.find((user) => user === state.user._id) &&
              !item.newChat
          )
          .map((item) => item._id);

        if (unseenMessageIds && unseenMessageIds?.length > 0) {
          const res = await Axios.patch("chats/seen", {
            ids: unseenMessageIds,
          });

          setChat((chat) => {
            const updatedChats = cloneDeep(chat.chats);
            const updatedFilteredChats = cloneDeep(chat.filteredChats);
            const updatedMinimizedChats = cloneDeep(chat.minimizedChats);

            res.data.data?.chats?.forEach((item) => {
              updatedChats.forEach((chatItem) => {
                const docIndex = chatItem.docs.findIndex(
                  (doc) => doc._id === item._id
                );
                if (docIndex !== -1) chatItem.docs[docIndex] = item;
              });

              updatedFilteredChats.forEach((chatItem) => {
                const docIndex = chatItem.docs.findIndex(
                  (doc) => doc._id === item._id
                );
                if (docIndex !== -1) chatItem.docs[docIndex] = item;
              });

              updatedMinimizedChats.forEach((chatItem) => {
                if (chatItem._id === item._id) chatItem = item;
              });
            });

            return {
              ...chat,
              chats: updatedChats,
              filteredChats: updatedFilteredChats,
              unreadMessages:
                chat.unreadMessages - res.data.data?.chats?.length || 0,
              minimizedChats: updatedMinimizedChats,
            };
          });
        }
        // cleanup
        return () => {};
      }, setState),
    []
  );

  const isFriend = state.user?.friends.find(
    (item) => item.recepient?._id === otherUser?._id && item.status === FRIENDS
  );

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`sm:h-[400px] sm:w-[320px] flex flex-col justify-between shadow-2xl dark:bg-dark sm:rounded-t-xl ${className}`}
    >
      <ChatHeader otherUser={otherUser} setChat={setChat} chatId={chatId} />
      <div
        className="h-full overflow-y-auto overflow-x-hidden p-2"
        ref={ChatsContainerRef}
      >
        <ChatIntro otherUser={otherUser} isFriend={isFriend} />
        <ChatMessages chats={chats} />
      </div>
      <ChatFooter
        otherUser={otherUser}
        isGroupMessage={chats && chats[0].is_group_message}
      />
    </motion.div>
  );
};

export default ChatBox;
