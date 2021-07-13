
import { FaPlus } from "react-icons/fa";

const AddAccount = ({setShowLoginModel}) => {
    return (
      <button
          className="w-32 h-44 flex flex-col items-stretch justify-stretch bg-white border rounded-lg transition hover:shadow-lg overflow-hidden pb-2"
          onClick={() => setShowLoginModel(true)}
        >
          <div className="h-32  flex justify-center items-center">
            <div className="p-2 rounded-full bg-blue-500 text-white text-2xl">
              <FaPlus />
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center capitalize text-blue-500 mt-2">
            add account
          </div>
      </button>
    );
}

export default AddAccount
