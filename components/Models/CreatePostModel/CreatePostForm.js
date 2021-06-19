import PostButton from "../../Buttons/PostButton";
import { BsChatQuoteFill, BsX } from "react-icons/bs";
import { FaCaretDown, FaGlobeAsia, FaImage, FaLock, FaUserFriends, FaUserTag, FaRegGrinAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { ADD_TO_POST, AUDIENCE, FRIENDS, HOST_QA, ONLY_ME, POST, PUBLIC, QA } from "../../../utils/variables";
import { useState } from "react";
import QADiv from "./QADiv";

const CreatePostForm = ({closeModel, setToggleModel, toggleModel, formData, setFormData}) => {
  
  
  const [loading, setLoading] = useState(false);
  
  const SubmitPost = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div
      className={`flex-1 flex flex-col ${toggleModel ? "h-0 opacity-0" : ""}`}
    >
      <div className="p-4 min-w-[250px] text-center text-xl font-semibold capitalize relative border-b-2">
        create post
        <button
          className="absolute top-2.5 right-4 text-3xl text-gray-600 bg-gray-200 rounded-full p-1 transition hover:bg-gray-300 active:outline-none transform hover:active:scale-95"
          onClick={closeModel}
        >
          <BsX />
        </button>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <div className="flex">
          <Link href="/user">
            <a href="/user" className="capitalize font-semibold" tabIndex="-1">
              <img
                src="img/users/default/user.jpeg"
                alt="user"
                className="h-10 w-10 rounded-full"
              />
            </a>
          </Link>
          <div className="ml-2">
            <p className="capitalize font-semibold" tabIndex="-1">
              mubarak hussain ridoy
            </p>
            <button
              className="bg-gray-200 p-1 rounded-lg font-semibold flex items-center text-sm gap-x-1 active:outline-none"
              onClick={() => setToggleModel(AUDIENCE)}
            >
              {formData.audience === PUBLIC ? (
                <>
                  <FaGlobeAsia /> <span className="capitalize">public</span>
                </>
              ) : formData.audience === FRIENDS ? (
                <>
                  <FaUserFriends /> <span className="capitalize">friends</span>
                </>
              ) : formData.audience === ONLY_ME ? (
                <>
                  <FaLock /> <span className="capitalize">only me</span>
                </>
              ) : (
                ""
              )}

              <FaCaretDown />
            </button>
          </div>
        </div>
        <form
          onSubmit={SubmitPost}
          className="flex-1 flex flex-col justify-between"
        >
          {formData.postType === POST ? (
            <textarea
              name="text"
              cols="30"
              rows="4"
              placeholder="What's on your mind, Mubarak?"
              className="focus:outline-none mt-2  text-xl w-full resize-none"
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
            ></textarea>
          ) : (
            formData.postType === QA && (
              <div className="overflow-auto h-52 mt-2 px-16 py-5">
                <QADiv
                  formData={formData}
                  setFormData={setFormData}
                  setToggleModel={setToggleModel}
                  locked
                  closeQA={() => setFormData({...formData, postType: POST})}
                />
              </div>
            )
          )}
          <div>
            <div className="flex justify-between items-center rounded-lg p-3 border border-gray-300 mb-3">
              <button
                className="font-semibold active:outline-none"
                onClick={() => setToggleModel(ADD_TO_POST)}
              >
                Add to Your Post
              </button>
              <div className="flex items-center gap-x-2 text-2xl z-10">
                <button tooltiptop="photo/video">
                  <FaImage className="text-emerald-500 transform -rotate-12" />
                </button>
                <button tooltiptop="tag people">
                  <FaUserTag className="text-blue-500" />
                </button>
                <button tooltiptop="feeling/activity">
                  <FaRegGrinAlt className="text-yellow-500" />
                </button>
                <button tooltiptop="check in">
                  <FaMapMarkerAlt className="text-red-500" />
                </button>
                <button
                  tooltiptop="host a q&a"
                  onClick={() => setToggleModel(HOST_QA)}
                >
                  <BsChatQuoteFill className="text-red-500" />
                </button>
                <button
                  className="flex gap-x-[2px] h-7 w-7 rounded-full justify-center items-center active:outline-none active:bg-gray-200"
                  tooltiptop="more"
                  onClick={() => setToggleModel(ADD_TO_POST)}
                >
                  <div className="h-[3px] w-[3px] bg-gray-700 rounded-full"></div>
                  <div className="h-[3px] w-[3px] bg-gray-700 rounded-full"></div>
                  <div className="h-[3px] w-[3px] bg-gray-700 rounded-full"></div>
                </button>
              </div>
            </div>
            <PostButton disabled={!formData.text} loading={loading}>
              post
            </PostButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
