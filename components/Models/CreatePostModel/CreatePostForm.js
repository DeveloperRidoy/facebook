import PostButton from "../../Buttons/PostButton";
import { BsChatQuoteFill, BsThreeDots, BsX } from "react-icons/bs";
import { FaCaretDown, FaGlobeAsia, FaImage, FaLock, FaUserFriends, FaUserTag, FaRegGrinAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { ADD_TO_POST, AUDIENCE, FRIENDS, HOST_QA, ONLY_ME, POST, PUBLIC, QA } from "../../../utils/client/variables";
import { useState } from "react";
import QADiv, { BackgroundSetter } from "./QADiv";

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
      <div className="p-4 min-w-[250px] text-center text-xl font-semibold capitalize relative border-b-2 dark:border-b dark:border-gray-500">
        create post
        <button
          className="absolute top-2.5 right-4 text-3xl text-gray-600 dark:text-white bg-gray-200 dark:bg-dark-400 rounded-full p-1 transition hover:bg-gray-300 dark:hover:bg-dark-300 active:outline-none transform hover:active:scale-95"
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
              className="bg-gray-200 dark:bg-dark-400 p-1 rounded-lg font-semibold flex items-center text-sm gap-x-1 active:outline-none"
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
              className={`focus:outline-none mt-2 dark:bg-dark text-xl w-full rounded-lg p-1 mb-3 ${formData.postBackground}`}
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
                  closeQA={() => setFormData({ ...formData, postType: POST })}
                />
              </div>
            )
          )}
          <div>
            <BackgroundSetter
              formData={formData}
              setFormData={setFormData}
              postBackground
            />
            <div className="flex justify-between items-center rounded-lg p-3 border border-gray-300 dark:border-gray-500 my-3">
              <button
                type="button"
                className="font-semibold active:outline-none"
                onClick={() => setToggleModel(ADD_TO_POST)}
              >
                Add to Your Post
              </button>
              <div className="flex items-center gap-x-2 text-2xl z-10">
                <button
                  type="button"
                  tooltiptop="Photo/Video"
                  className="active:outline-none "
                >
                  <FaImage className="text-emerald-500 transform -rotate-12" />
                </button>
                <button
                  type="button"
                  tooltiptop="Tag People"
                  className="active:outline-none "
                >
                  <FaUserTag className="text-blue-500" />
                </button>
                <button
                  type="button"
                  tooltiptop="Feeling/Activity"
                  className="active:outline-none "
                >
                  <FaRegGrinAlt className="text-yellow-500" />
                </button>
                <button
                  type="button"
                  tooltiptop="Check In"
                  className="active:outline-none "
                >
                  <FaMapMarkerAlt className="text-red-500" />
                </button>
                <button
                  type="button"
                  className="active:outline-none "
                  tooltiptop="Host A Q&A"
                  onClick={() => setToggleModel(HOST_QA)}
                >
                  <BsChatQuoteFill className="text-red-500" />
                </button>
                <button
                  type="button"
                  className="active:outline-none "
                  tooltiptop="More"
                  onClick={() => setToggleModel(ADD_TO_POST)}
                >
                  <BsThreeDots />
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
