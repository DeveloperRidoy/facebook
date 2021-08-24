import Image from "next/image";

const ChatIntro = ({otherUser, isFriend}) => {
    return (
      <div className="flex flex-col gap-2 items-center mt-2 leading-3">
        <div className="relative h-16 w-16 max-w-9 flex-shrink-0 rounded-full">
          <Image
            src={`/img/users/${otherUser?.photo || "default/user.jpg"}`}
            alt="user"
            layout="fill"
            className="object-cover rounded-full"
            placeholder="blur"
            blurDataURL="/img/users/default/user.jpg"
          />
        </div>
        <p className="font-semibold text-xl">{otherUser.fullName}</p>
        <p>Facebook</p>
        <p>You're {isFriend ? "" : "not"} friends on Facebook</p>
      </div>
    );
}

export default ChatIntro
