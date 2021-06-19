import { BsArrowLeft, BsChatQuoteFill } from "react-icons/bs";
import { FaImage, FaMapMarkerAlt, FaRegGrinAlt, FaUserTag, FaVideo } from "react-icons/fa";
import { ADD_TO_POST, HOST_QA } from "../../../utils/variables";

const AddToYourPost = ({ setToggleModel, formData, setFormData, toggleModel }) => {

    return (
      <div className={`flex-1 ${toggleModel !== ADD_TO_POST ? 'h-0 opacity-0': ''}`}>
        <div className="p-4 min-w-[250px] text-center text-xl font-semibold relative border-b-2">
          Add to Your Post
          <button
            className="absolute top-2.5 left-4 text-3xl text-gray-600 bg-gray-200 rounded-full p-1 transition hover:bg-gray-300 active:outline-none transform hover:active:scale-95"
            onClick={() => setToggleModel(null)}
          >
            <BsArrowLeft />
          </button>
        </div>
        <div className="p-4 grid grid-cols-2 text-lg">
          <Item text="photo/video">
            <FaImage className="text-emerald-500 text-2xl transform -rotate-12" />
          </Item>
          <Item text="tag people">
            <FaUserTag className="text-blue-500 text-2xl" />
          </Item>
          <Item text="feeling/activity">
            <FaRegGrinAlt className="text-yellow-500 text-2xl" />
          </Item>
          <Item text="check in">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
          </Item>
          <Item text="host a Q&A" onClick={() => setToggleModel(HOST_QA)}>
            <BsChatQuoteFill className="text-red-500 text-2xl" />
          </Item>
          <Item text="gif">
            <div className="text-white bg-emerald-500 text-sm rounded-xl uppercase p-1">gif</div>
          </Item>
          <Item text="live video">
            <FaVideo className="text-red-500 text-2xl" />
          </Item>
        </div>
      </div>
    );
}

export default AddToYourPost

const Item = ({children, text, onClick}) => (
  <button
    className="flex items-center gap-x-2 font-semibold capitalize rounded-lg transition hover:bg-secondary active:outline-none active:bg-gray-200 focus:bg-secondary p-2"
    onClick={onClick}
  >
    {children}
    <p>{text}</p>
  </button>
);