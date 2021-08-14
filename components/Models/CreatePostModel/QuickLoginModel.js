import LoginModel from "../LoginModel";
import { BsX } from "react-icons/bs";
import Image from "next/image";

const QuickLoginModel = ({ user, closeModel }) => {
  return (
    <LoginModel quickLogin email={user.email} closeModel={closeModel}>
      <div className="flex items-center justify-end px-4 py-3 min-w-[250px] text-center text-xl font-semibold">
        <button
          className=" text-3xl text-gray-600  bg-gray-200  rounded-full p-1 transition hover:bg-gray-300  active:outline-none transform hover:active:scale-95"
          onClick={closeModel}
        >
          <BsX />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-40 h-40 relative">
          <Image
            src={`/img/users/${user.photo || "default/user.jpg"}`}
            alt={user.fullName || "user"}
            layout="fill"
            className="object-cover rounded-full"
            placeholder="blur"
            blurDataURL="/img/users/default/user.jpg"
          />
        </div>
      </div>
    </LoginModel>
  );
};

export default QuickLoginModel;
