"use client";

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; 
import { useGlobalContext } from "./GlobalContext";
import handleFriendEvent from "../utils/client/socketEvents/handleFriendEvent";
import handleMessageEvent from "../utils/client/socketEvents/handleMessageEvent";
import { ChatsContainerRef } from "../components/ChatsContainer/ChatBox/ChatBox";
import { useChatContext } from "./ChatContext";
import catchAsync from "../utils/client/catchAsync";

const Context = createContext();

export const useSocketContext = () => useContext(Context);

const SocketContext = ({ children }) => {
  const [state, setState] = useGlobalContext();
  const [socket, setSocket] = useState(null);
  const [, setChat] = useChatContext();

  const socketInitializer = () => {
    catchAsync(async () => {
      const userId = state.user?._id;

      // only keep socket connection if the user is logged in
      if (!socket?.connected && userId) {
        const newSocket = io(window.location.origin, {
          query: { id: userId },
          path: "/api/socket_io", 
          transports: [   
            "polling",
            "websocket",
            "flashsocket",
            "htmlfile",
            "xhr-polling",
            "jsonp-polling",
          ],
        }); 

        // handle socket events
        handleFriendEvent(newSocket, state, setState, "friend_event_received");
        handleFriendEvent(
          newSocket,
          state,
          setState,
          "reverse_friend_event_received"
        );
        handleMessageEvent(
          newSocket,
          state,
          setState,
          setChat,
          ChatsContainerRef,
          "message_received"
        );

        setSocket(newSocket);
      } else if (socket?.connected && !userId) {
        socket.disconnect();
        setSocket(null);
      }
    }, setState);

    // cleanup
    return () => {
      if (socket?.connected) {
        socket.disconnect(); 
        setSocket(null); 
      }
    };
  };
  useEffect(socketInitializer, [state.user?.id]);

  return <Context.Provider value={socket}>{children}</Context.Provider>;
};

export default SocketContext;
