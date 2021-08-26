
import NextImage from "../../NextImage";

const ChatIntro = ({otherUser, isFriend}) => {
    return (
      <div className="flex flex-col gap-2 items-center mt-2 leading-3">
        <NextImage
          photo={otherUser?.photo}
          className=" h-16 w-16 max-w-9 flex-shrink-0 rounded-full"
        />
        <p className="font-semibold text-xl">{otherUser.fullName}</p>
        <p>Facebook</p>
        <p>You're {isFriend ? "" : "not"} friends on Facebook</p>
      </div>
    );
}

export default ChatIntro
