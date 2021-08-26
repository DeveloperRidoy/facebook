import { FaFacebookMessenger, FaPen, FaPlusCircle } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";
import ProfilePicButton from "./ProfilePic";
import Image from 'next/image';
import CoverPhotoButton from "./CoverPhotoButton";
import AddFriendBtn from "../../Buttons/AddFriendBtn";
import { useChatContext } from "../../../context/ChatContext";
import { v4 as uidv4 } from 'uuid';
import NextImage from "../../NextImage";

const Profile = ({user}) => {
  const [state] = useGlobalContext();
  const [, setChat] = useChatContext();
  const ownProfile = user?._id === state.user?._id;
  
  return (
    <div>
      <div className="rounded-b-xl relative overflow-hidden">
        <NextImage
          className="aspect-w-2 aspect-h-1"
          photo={ownProfile ? state.user?.coverPhoto: user?.coverPhoto}
        />

        <div className="absolute bottom-0 inset-x-0 py-5 bg-gradient-to-t from-darker rounded-lg">
          {ownProfile && <CoverPhotoButton />}
        </div>
      </div>
      <div
        className={`flex flex-col sm:flex-row gap-y-3 py-5 px-3 md:px-10 items-center sm:items-end sm:justify-center -mt-24 `}
      >
        {ownProfile ? (
          <ProfilePicButton />
        ) : (
          <NextImage className="h-40 w-40 relative transition hover:brightness-75 border-dark-500 border-4 dark:bg-dark-400 rounded-full" photo={user?.photo}/>
        )}

        <div className="flex xl:flex-1 flex-wrap sm:flex-nowrap gap-y-5 items-center justify-center mb-5 gap-x-10 ">
          <p className="text-xl lg:text-3xl capitalize font-semibold ml-2">
            {user?.fullName}
          </p>

          <div className="flex items-center gap-x-3 font-semibold w-full md:w-auto whitespace-nowrap">
            {ownProfile ? (
              <>
                <button className="flex-1 rounded-md flex gap-x-1 items-center justify-center bg-blue-600 py-1.5 px-2.5 active:scale-95 transition hover:bg-blue-500 capitalize">
                  <FaPlusCircle />
                  <span>Add to Story</span>
                </button>
                <button className="flex-1 rounded-md flex gap-x-1 items-center justify-center bg-dark-400 py-1.5 px-2.5 active:scale-95 transition hover:bg-dark-300 capitalize">
                  <FaPen />
                  <span>Edit Profile</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex-1 rounded flex gap-x-1 items-center justify-center bg-blue-600 py-1.5 px-2.5 active:scale-95 transition hover:bg-blue-500 capitalize"
                  onClick={() =>
                    setChat((chat) => ({
                      ...chat,
                      showNewMessageBox: false,
                      chatBox: {
                        show: !chat.chatBox.show,
                        chats: chat.chats.find(
                          (item) =>
                            item.docs[0].sender._id === user._id ||
                            item.docs[0].participants[0]?._id === user._id
                        )?.docs || [
                          {
                            _id: uidv4(),
                            sender: state.user,
                            participants: [user],
                            is_group_message: false,
                            newChat: true,
                          },
                        ],
                      },
                    }))
                  }
                >
                  <FaFacebookMessenger />
                  <span>message</span>
                </button>
                <AddFriendBtn user={user} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
