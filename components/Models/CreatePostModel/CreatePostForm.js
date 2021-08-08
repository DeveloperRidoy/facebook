import PostButton from "../../Buttons/PostButton";
import { BsChatQuoteFill, BsThreeDots, BsX } from "react-icons/bs";
import {
  FaCaretDown,
  FaGlobeAsia,
  FaImage,
  FaLock,
  FaUserFriends,
  FaUserTag,
  FaRegGrinAlt,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import {
  ADD_TO_POST,
  AUDIENCE,
  FRIENDS,
  HOST_QA,
  ONLY_ME,
  POST,
  PUBLIC,
  QA,
} from "../../../utils/client/variables";
import { useRef, useState } from "react";
import QADiv, { BackgroundSetter } from "./QADiv";
import Image from "next/image";
import { useGlobalContext } from "../../../context/GlobalContext";
import catchAsync from "../../../utils/client/functions/catchAsync";
import Axios from "../../../utils/client/axios";
import Reader from "../../../utils/global/functions/fileReader";
import convertToFormData from "../../../utils/global/functions/convertToFormData";

const CreatePostForm = ({
  closeModel,
  setToggleModel,
  toggleModel,
  formData,
  setFormData,
}) => {
  const [state, setState] = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const photoRef = useRef(null);

  const submitPost = (e) =>
    catchAsync(
      async () => {
        e.preventDefault();
        setLoading(true);
        const data = convertToFormData(formData);
        const res = await Axios.post("posts", data);

        setState((state) => ({
          ...state,
          posts: [...state.posts, res.data.data?.post],
          alert: { show: true, text: res.data.message },
          model: { ...state.model, show: false },
        }));
      },
      setState,
      () => setLoading(false)
    );

  // upload photos
  const uploadPhotos = (e) =>
    catchAsync(async () => {
      const files = Object.values(e.target.files);
      const photos = [];
      const videos = [];

      // only allow 10 files
      if (files.length > 10) {
        return setState((state) => ({
          ...state,
          alert: {
            show: true,
            type: "danger",
            text: "only 10 files are allowed",
          },
        }));
      }
      const arrayOfPromises = files.map(async (file) => {
        const type = file.type;

        // only allow images and videos
        if (!/^(image|video)/.test(type)) {
          return setState((state) => ({
            ...state,
            alert: {
              show: true,
              type: "danger",
              text: "only images and videos are allowed",
            },
          }));
        }
        const url = await new Reader(file).getUrl();

        const data = { file, url };

        return data;
      });

      const data = await Promise.all(arrayOfPromises);
      data.forEach((item) =>
        item.file.type.startsWith("image")
          ? photos.push(item)
          : videos.push(item)
      );

      setFormData((data) => ({
        ...data,
        photos: [...data.photos, ...photos],
        videos: [...data.videos, ...videos],
      }));
    }, setState);

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
            <a
              href="/user"
              className="capitalize font-semibold h-10 w-10 relative"
              tabIndex="-1"
            >
              <Image
                src={`/img/users/${state.user?.photo || "default/user.jpg"}`}
                alt="user"
                layout="fill"
                className="object-cover rounded-full"
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
          onSubmit={submitPost}
          className="flex-1 flex flex-col justify-between"
        >
          {formData.type === POST ? (
            <div>
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
              {formData.photos?.length > 0 && (
                <div className="grid grid-cols-6 gap-y-2 gap-x-1 mb-2 relative">
                  <button
                    type="button"
                    className="absolute top-0 right-0 text-white bg-black/70 rounded-full text-2xl z-10 active:scale-95 transition"
                    onClick={() =>
                      setFormData((data) => ({
                        ...data,
                        photos: [],
                      }))
                    }
                  >
                    <FaTimes />
                  </button>
                  {formData.photos.map((photo, i) => (
                    <div
                      className={` aspect-w-16 aspect-h-9 relative ${
                        formData.photos.length === 1
                          ? "col-span-6"
                          : formData.photos.length < 6
                          ? "col-span-3"
                          : "col-span-2"
                      }`}
                      key={i}
                    >
                      <Image
                        src={photo.url}
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              {formData.videos?.length > 0 && (
                <div className="grid grid-cols-6 gap-y-2 gap-x-1 mb-2 relative">
                  <button
                    type="button"
                    className="absolute top-0 right-0 text-white bg-black/70 rounded-full text-2xl z-10 active:scale-95 transition"
                    onClick={() =>
                      setFormData((data) => ({
                        ...data,
                        videos: [],
                      }))
                    }
                  >
                    <FaTimes />
                  </button>
                  {formData.videos.map((video, i) => (
                    <div
                      className={` aspect-w-16 aspect-h-9 relative ${
                        formData.videos.length === 1
                          ? "col-span-6"
                          : formData.videos.length < 6
                          ? "col-span-3"
                          : "col-span-2"
                      }`}
                      key={i}
                    >
                      <video
                        src={video.url}
                        controls
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            formData.type === QA && (
              <div className="overflow-auto h-52 mt-2 px-16 py-5">
                <QADiv
                  formData={formData}
                  setFormData={setFormData}
                  setToggleModel={setToggleModel}
                  locked
                  closeQA={() => setFormData({ ...formData, type: POST })}
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
                  onClick={() => photoRef?.current?.click()}
                >
                  <FaImage className="text-emerald-500 transform -rotate-12" />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    ref={photoRef}
                    className="hidden"
                    onChange={uploadPhotos}
                  />
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
