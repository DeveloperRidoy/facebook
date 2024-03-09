"use client";

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useGlobalContext } from "./GlobalContext";
import handleFriendEvent from "../utils/client/socketEvents/handleFriendEvent";
import handleMessageEvent from "../utils/client/socketEvents/handleMessageEvent";
import { ChatsContainerRef } from "../components/ChatsContainer/ChatBox/ChatBox";
import { useChatContext } from "./ChatContext";
import Axios from "../utils/client/axios";
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
      if (!socket && userId) {
        await Axios.get("socket_io");
        const newSocket = io(
          process.env.NEXT_PUBLIC_SITE || window.location.origin,
          {
            query: { id: userId },
            path: "/api/socket_io",
            transports: ["xhr-polling"],
          }
        );
        setSocket(newSocket);
      } else if (socket && !userId) {
        socket.disconnect();
        setSocket(null);
      }

      // handle socket events
      if (socket && userId) {
        console.log(" hurray");
        handleFriendEvent(socket, state, setState, "friend_event_received");
        handleFriendEvent(
          socket,
          state,
          setState,
          "reverse_friend_event_received"
        );
        handleMessageEvent(
          socket,
          state,
          setState,
          setChat,
          ChatsContainerRef,
          "message_received"
        );
      }

      // cleanup
      return () => {
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      };
    }, setState);
    return () => {};
  };
  useEffect(socketInitializer, [socket, state.user?.id]);

  return <Context.Provider value={socket}>{children}</Context.Provider>;
};

export default SocketContext;
