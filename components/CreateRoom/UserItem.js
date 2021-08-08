import Image from "next/image";

const UserItem = (user) => {
  return (
    <button className=" h-10 w-10 relative">
      <Image
        src={`/img/users/${user.photo || "default/user.jpg"}`}
        alt={user?.name || "user"}
        layout="fill"
        className="object-cover rounded-full"
      />
    </button>
  );
};

export default UserItem;
