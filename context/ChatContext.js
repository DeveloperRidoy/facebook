import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/client/axios";
import catchAsync from "../utils/client/functions/catchAsync";
import { useGlobalContext } from "./GlobalContext";
import handleFriendEvent from "../utils/client/functions/socketEvents/handleFriendEvent";
import handleMessageEvent from "../utils/client/functions/socketEvents/handleMessageEvent";
import { ChatsContainerRef } from "../components/ChatsContainer/ChatBox/ChatBox";
import { useSocketContext } from "./SocketContext";

const Context = createContext();

export const useChatContext = () => useContext(Context);

const ChatContext = ({ children }) => {
  const [state, setState] = useGlobalContext()
  const socket = useSocketContext();
  const [chat, setChat] = useState({
    chats: [],
    loading: true,
    filtered: false,
    filteredChats: [],
    unreadMessages: 0,
    chatBox: { show: false, newChat: false, chats: [] },
    showNewMessageBox: false,
    minimizedChats: [],
  });

  // get chats on first render
  useEffect(
    () =>
      catchAsync(
        async () => {
          const res = await Axios.get("chats/my-chats");
          let unreadMessages = 0;
          res.data.data?.chats?.forEach((item) => {
            item.docs.forEach((doc) => {
               if (doc.participants.find(user => user._id === state.user._id) && !doc.readBy.find((user) => user === state.user._id))
                 unreadMessages += 1;
            });
          });
          setChat((chat) => ({
            ...chat,
            loading: false,
            chats: res.data.data?.chats,
            unreadMessages,
          }));
        },
        setState,
        () => setChat((chat) => ({ ...chat, loading: false }))
      ),
    []
  );
  
   useEffect(() => {
    if (!socket) return;
    handleFriendEvent(socket, state, setState, "friend_event_received");
    handleFriendEvent(socket, state, setState, "reverse_friend_event_received");
    handleMessageEvent(socket, state, setState, setChat, ChatsContainerRef, "message_received");
    }, [socket])

  return (
    <Context.Provider value={[chat, setChat]}>{children}</Context.Provider>
  );
};

export default ChatContext;
