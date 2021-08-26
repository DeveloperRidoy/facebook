import { cloneDeep } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaImage, FaThumbsUp, FaTimes } from "react-icons/fa";
import { RiSendPlaneFill } from 'react-icons/ri'
import { useChatContext } from "../../../context/ChatContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useSocketContext } from "../../../context/SocketContext";
import Axios from "../../../utils/client/axios";
import catchAsync from "../../../utils/client/functions/catchAsync";
import uploadFiles from "../../../utils/client/functions/uploadFiles";
import EmojiBtn from "../../EmojiBtn";
import { ChatsContainerRef } from "./ChatBox";
import convertToFormData from "../../../utils/global/functions/convertToFormData";
import NextImage from "../../NextImage";

const ChatFooter = ({ otherUser, isGroupMessage = false }) => {
  const [data, setData] = useState({
    text: "",
    photos: [],
    videos: []
  });
  const [, setState] = useGlobalContext();
  const [chat, setChat] = useChatContext();
  const socket = useSocketContext();
  const TextRef = useRef();
  const fileRef = useRef();
  const files = [];
  data.photos?.forEach(photo => files.push({ photo }));
  data.videos?.forEach(video => files.push({ video }));

  const inputChange = (e) => {
    // resize textarea height
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    setData((data) => ({ ...data, text: e.target.value }));
  };

  // function to send message
  const sendMessage = ({thumbsUp = false}) =>
    catchAsync(async () => {
      const cloneData = cloneDeep(data);
      cloneData.recepient = otherUser;
      cloneData.is_group_message = isGroupMessage;
      cloneData.message = thumbsUp ? "&#x1f44d;" : data.text;

      const formData = convertToFormData(cloneData);
       
      // const formData = convertToFormData(cloneData);
      const res = await Axios.post("chats", formData);
      const newChat = {
                _id: {
                  chatId: res.data.data?.chat?.chatId,
                  ig_group_message: res.data.data?.chat?.is_group_message,
                },
                docs: [res.data.data?.chat],
              };
      const updatedChats = cloneDeep(chat.chats);
      updatedChats.forEach(
        (item) =>
          item._id.chatId === res.data.data?.chat?.chatId &&
          item.docs?.unshift(res.data.data?.chat)
      );

      const updatedFilteredChats = cloneDeep(chat.filteredChats);

      updatedFilteredChats.forEach(
        (item) =>
          item._id.chatId === res.data.data?.chat?.chatId &&
          item.docs?.unshift(res.data.data?.chat)
      );

      const updatedChatBox = cloneDeep(chat.chatBox);
      updatedChatBox.chats.unshift(res.data.data?.chat);
      updatedChatBox.newChat = false;

      // update state
      setChat((chat) => ({
        ...chat,
        chats: chat.chatBox.newChat
          ? [
              newChat,
              ...chat.chats,
            ]
          : updatedChats,
        filteredChats: updatedFilteredChats,
        chatBox: updatedChatBox
      }));

      // smooth scroll to bottom message
      ChatsContainerRef.current.style.scrollBehavior = "smooth";
      ChatsContainerRef.current.scrollTop =
        ChatsContainerRef.current.scrollHeight;

      // emit messageSent event
      socket.emit("message_sent", res.data.data?.chat);

      // focus textarea again
      if (data.text) TextRef.current.focus();

      // clear data
      setData({ text: "", photos: [], videos: [] });
    }, setState);
  
  useEffect(() => {TextRef.current.focus()}, [])
  
  return (
    <div className="px-2 py-2 flex  gap-2 items-end">
      <button
        className="text-blue-500 text-xl rounded-full transition dark:hover:bg-dark-300 dark:active:bg-dark-300 active:scale-75 p-1 mb-1"
        onClick={() => fileRef.current.click()}
        tooltiptop="photo"
      >
        <FaImage className="rotate-[95deg]" />
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileRef}
          className="hidden"
          onChange={(e) => uploadFiles({ e, setState, setData, readUrl: true })}
        />
      </button>
      <div className="flex-1 flex-col">
        {files?.length > 0 && (
          <div className="relative">
            <button
              className="absolute -top-2 -right-3 dark:bg-dark-300 p-1 rounded-full transition shadow-xl"
              onClick={() =>
                setData((data) => ({ ...data, photos: [], videos: [] }))
              }
            >
              <FaTimes />
            </button>
            <div className="overflow-hidden rounded-lg">
              <div className="grid grid-cols-3 content-start gap-1 items-start max-h-40 dark:bg-dark-400 p-1 overflow-y-auto">
                {files.map((file, i) =>
                  file.photo ? (
                    <NextImage
                      key={i}
                      absoluteUrl={file.photo.url}
                      className="w-full h-16"
                    />
                  ) : (
                    file.video && (
                      <video
                        src={file.video.url}
                          className="object-cover"
                      ></video>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex items-center gap-3 dark:bg-dark-400 rounded-2xl pl-3">
          <textarea
            ref={TextRef}
            rows="1"
            className="flex-1 bg-transparent focus:outline-none overflow-hidden resize-none max-h-32"
            value={data.text}
            onChange={inputChange}
          />
          <div className="self-end">
            <EmojiBtn
              className="text-xl text-blue-500 p-2 dark:hover:bg-dark-300"
              onSelect={(e) =>
                setData((data) => ({
                  ...data,
                  text: `${data.text} ${e.native}`,
                }))
              }
            />
          </div>
        </div>
      </div>
      <button
        className="flex items-center justify-center text-xl text-blue-500 rounded-full transition dark:hover:bg-dark-300 dark:active:bg-dark-300 active:scale-75 p-2 mb-1"
        onClick={() => sendMessage({ thumbsUp: !data.text && data.photos.length === 0 && data.videos.length === 0 })}
      >
        {data.text || data.photos.length > 0 || data.videos.length > 0 ? (
          <RiSendPlaneFill className="rotate-[45deg]" />
        ) : (
          <FaThumbsUp />
        )}
      </button>
    </div>
  );
};

export default ChatFooter;