
import NextImage from "../NextImage";

const UserItem = (user) => {
  return (
    <button className=" h-10 w-10 rounded-full overflow-hidden">
      <NextImage
        photo={user?.photo}
        className=" h-full w-full"
      />
    </button>
  );
};

export default UserItem;
