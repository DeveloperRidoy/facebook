import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useGlobalContext } from "./GlobalContext";
import handleFriendEvent from "../utils/client/socketEvents/handleFriendEvent";
import handleMessageEvent from "../utils/client/socketEvents/handleMessageEvent";
import { ChatsContainerRef } from "../components/ChatsContainer/ChatBox/ChatBox";
import { useChatContext } from "./ChatContext";

const Context = createContext();

export const useSocketContext = () => useContext(Context);

const SocketContext = ({ children }) => {
  const [state, setState] = useGlobalContext();
  const [socket, setSocket] = useState(null);
  const [, setChat] = useChatContext();
  useEffect(() => {
    const newSocket = io(
      `${process.env.NEXT_PUBLIC_SITE || window.location.origin}/api/socket/io`,
      { query: { id: state.user?._id } }
    );
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;
    handleFriendEvent(socket, state, setState, "friend_event_received");
    handleFriendEvent(socket, state, setState, "reverse_friend_event_received");
    handleMessageEvent(
      socket,
      state,
      setState,
      setChat,
      ChatsContainerRef,
      "message_received"
    );
  }, [socket]);

  return <Context.Provider value={socket}>{children}</Context.Provider>;
};

export default SocketContext;
