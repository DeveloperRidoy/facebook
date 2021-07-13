import LoginModel from "../LoginModel"
import { BsX } from "react-icons/bs";

const QuickLoginModel = ({user, closeModel}) => {
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
        <img
          src={`img/users/${user.photo || "default/user.jpeg"}`}
          alt={user.fullName || "user"}
          className="w-40 h-40 rounded-full"
        />
      </div>
    </LoginModel>
  );
}

export default QuickLoginModel
