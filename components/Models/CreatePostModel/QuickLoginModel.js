import LoginModel from "../LoginModel";
import { BsX } from "react-icons/bs";

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
        <NextImage className="h-40 w-40" photo={user?.photo} />
      </div>
    </LoginModel>
  );
};

export default QuickLoginModel;
