import { cloneDeep } from "lodash";
import Axios from "../axios";
import catchAsync from "../catchAsync";
import playMessengerSound from "../playMessengerSound";

const handleMessageEvent = (
  socket,
  state,
  setState,
  setChat,
  ChatsContainerRef,
  event
) =>
  socket.on(event, (data) => {
    catchAsync(async () => {
      const message = await (
        await Axios.get(`chats/${data._id}`)
      ).data.data?.chat;
      setChat((chat) => {
        const updatedChats = cloneDeep(chat.chats);
        const existingChat = updatedChats.find(
          (item) => item._id.chatId === message.chatId
        );
        if (existingChat) {
          existingChat.docs.unshift(message);
        } else {
          updatedChats.unshift({
            _id: {
              chatId: message.chatId,
              is_group_message: message.is_group_message,
            },
            docs: [message],
          });
        }

        const updatedFilteredChats = cloneDeep(chat.filteredChats);

        updatedFilteredChats.forEach(
          (item) =>
            item._id.chatId === message?.chatId && item.docs?.unshift(message)
        );

        const updatedChatBox = cloneDeep(chat.chatBox);
        if (
          chat.chatBox.show &&
          chat.chatBox.chats[0]?.participants[0]?._id === message.sender?._id
        ) {
          updatedChatBox.chats.unshift(message);
        } else {
          if (updatedChatBox.chats[0]?.chatId === message.chatId) {
            updatedChatBox.chats.unshift(message);
          }
        }

        // increment unreadMessages if chatBox is closed
        const unreadMessages = !chat.chatBox?.show
          ? !message.readBy.find((user) => user === state.user?._id)
            ? chat.unreadMessages + 1
            : chat.unreadMessages
          : chat.unreadMessages;

        const updatedMinimizedChats = cloneDeep(chat.minimizedChats).map(
          (item) => (item.chatId === message.chatId ? message : item)
        );

        return {
          ...chat,
          chats: updatedChats,
          filteredChats: updatedFilteredChats,
          chatBox: updatedChatBox,
          unreadMessages,
          minimizedChats: updatedMinimizedChats,
        };
      });
      // scroll to last message
      if (ChatsContainerRef?.current) {
        ChatsContainerRef.current.style.scrollBehavior = "smooth";
        ChatsContainerRef.current.scrollTop =
          ChatsContainerRef.current.scrollHeight;
      }

      // play messenger sound
      playMessengerSound();
    }, setState);
  });
export default handleMessageEvent;
