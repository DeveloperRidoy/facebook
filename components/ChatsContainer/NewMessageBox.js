import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { useChatContext } from "../../context/ChatContext";
import { useGlobalContext } from "../../context/GlobalContext";
import Axios from "../../utils/client/axios";
import catchAsync from "../../utils/client/functions/catchAsync";
import NextImage from "../NextImage";
import Spinner from "../Spinners/Spinner/Spinner";
import { v4 as uidv4 } from 'uuid';

const NewMessageBox = ({ className }) => {
    const [, setChat] = useChatContext();
    const [state, setState] = useGlobalContext();
    const [boxState, setBoxState] = useState({ loading: false, suggested: [] });
    const textRef = useRef();

    useEffect(() => {
        textRef.current.focus();
    }, [])

    const suggestUsers = (e) => catchAsync(async () => {
        const text = e.target.value;
        if (!text) return setBoxState(state => ({ ...state, loading: false, suggested: [] }));
        setBoxState(state => ({ ...state, loading: true }));
        const res = await Axios.get(`users/name/${text}`);

        setBoxState(state => ({ ...state, loading: false, suggested: res.data.data?.users }));
    }, setState, () => setBoxState(state => ({ ...state, loading: false })));

    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className={`h-[400px] sm:w-[320px] flex flex-col shadow-2xl dark:bg-dark rounded-t-xl ml-3 ${className}`}
      >
        <div className="px-2 py-1  dark:border-b-[1px] dark:border-gray-700">
          <div className="flex justify-between items-center">
            <p className="capitalize text-lg">new message</p>
            <button
              className="text-blue-500 text-2xl transition p-1 rounded-full dark:hover:bg-dark-300 active:scale-95"
              onClick={() =>
                setChat((chat) => ({ ...chat, showNewMessageBox: false }))
              }
            >
              <BsX />
            </button>
          </div>
          <div className="flex items-center gap-2 my-2">
            <p className="text-lg">To:</p>
            <input
              type="text"
              ref={textRef}
              className="focus:outline-none bg-transparent"
              onChange={suggestUsers}
            />
          </div>
        </div>
        <button className="px-5 py-2 max-w-max text-blue-500 border-b-4 border-blue-500 capitalize text-lg font-semibold">
          suggested
        </button>
        <div className="h-full p-2">
          {boxState.loading ? (
            <Spinner className="mx-auto" />
          ) : (
            boxState.suggested?.length > 0 && (
              <div className="flex flex-col gap-2 h-full overflow-auto">
                {boxState.suggested.map(
                  (user) =>
                    user._id !== state.user?._id && (
                      <button
                        key={user._id}
                        className="flex gap-1 items-center transition p-2 dark:hover:bg-dark-300 rounded-md active:scale-95"
                        onClick={() =>
                          setChat((chat) => ({
                            ...chat,
                            showNewMessageBox: false,
                            chatBox: {
                              show: true,
                              newChat: chat.chats.find(
                                (item) =>
                                  item.docs[0].sender._id === user._id ||
                                  item.docs[0].participants[0]?._id ===
                                    user._id
                              ) ? false: true,
                              chats: chat.chats.find(
                                (item) =>
                                  item.docs[0].sender._id === user._id ||
                                  item.docs[0].participants[0]?._id ===
                                    user._id
                              )?.docs || [
                                {
                                  _id: uidv4(),
                                  chatId: uidv4(),
                                  sender: state.user,
                                  participants: [user],
                                  is_group_message: false,
                                  newChat: true
                                },
                              ],
                            },
                          }))
                        }
                      >
                        <NextImage
                          className="h-10 w-10 rounded-full"
                          url={user.photo}
                        />
                        <p className="capitalize text-lg">{user.fullName}</p>
                      </button>
                    )
                )}
              </div>
            )
          )}
        </div>
      </motion.div>
    );
}

export default NewMessageBox
