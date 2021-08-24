import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context/GlobalContext";
import { CAROUSEL } from "../../../utils/client/variables";
import { ThumbsUp } from "../../icons/ThumbsUp";
import NextImage from "../../NextImage";

const ChatMessages = ({ chats }) => {
 const [state, setState] = useGlobalContext();

    return (
    <div className="flex flex-col gap-2 mt-4">
      {chats.length > 0 &&
        chats
          .slice()
          .reverse()
          .map((item) => <MessageItem key={item._id} messageItem={item} state={state} setState={setState}/>)}
    </div>
  );
};

export default ChatMessages;

const MessageItem = ({ messageItem,state, setState }) => {
   
    const fromOtherUser = state.user?._id !== messageItem.sender._id;
  const medias = [];
  messageItem.photos?.forEach(photo => medias.push({ type: 'image', src: photo }));
  messageItem.videos?.forEach(video => medias.push({ type: 'video', src: video }));

  const showCarouselModel = (e, i) => {
    e.preventDefault();
    setState((state) => ({
      ...state,
      model: {
        show: true,
        type: CAROUSEL,
        data: {
          medias,
          startIndex: i,
        },
      },
    }));
  };
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        {messageItem.message === "&#x1f44d;" ? (
          <div className="flex flex-col">
            <ThumbsUp
              className={`${fromOtherUser ? "self-start" : "self-end"}`}
            />
          </div>
        ) : (
          <div className="flex flex-col ">
            {messageItem.message && (
              <div
                className={`rounded-full py-1.5 px-3 ${
                  messageItem.message === "&#x1f44d;"
                    ? fromOtherUser
                      ? "self-start"
                      : "self-end"
                    : fromOtherUser
                    ? "dark:bg-dark-300 self-start"
                    : "bg-blue-500 self-end"
                }`}
              >
                {messageItem.message}
              </div>
            )}
            {medias.length > 0 && (
              <div className={`mt-2 flex items-center gap-1 ${fromOtherUser ? 'justify-start': 'justify-end'}`}>
                {medias.map((file, i) =>
                  file.type === "image" ? (
                    <div key={i} className="cursor-pointer w-20">
                      <NextImage
                        url={file.src}
                        className="w-full h-20"
                        onClick={(e) => showCarouselModel(e, i)}
                      />
                    </div>
                  ) : (
                    <div key={i} className="flex-1 cursor-pointer">
                      <video
                        src={`/video/users/${file.src}`}
                        className="w-full h-20"
                        onClick={(e) => showCarouselModel(e, i)}
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
}
