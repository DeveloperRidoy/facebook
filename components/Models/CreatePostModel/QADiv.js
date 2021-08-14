import { useState } from "react";
import { QA } from "../../../utils//client/variables";
import { BsChevronLeft, BsX } from "react-icons/bs";
import Image from "next/image";

const QADiv = ({ formData, setFormData, setToggleModel, locked, closeQA }) => (
  <div className="py-3 md:px-10">
    <div className={`rounded-xl p-3 relative ${formData.qaBackground}`}>
      <div className="h-10 w-10 relative">
        <Image
          src="/img/users/default/user.jpg"
          alt="user"
          layout="fill"
          className="object-cover rounded-full"
          placeholder="blur"
          blurDataURL="/img/users/default/user.jpg"
        />
      </div>
      <textarea
        name="text"
        cols="30"
        rows="5"
        className="mt-3 bg-black bg-opacity-0 text-white outline-none text-center w-full text-4xl font-bold resize-none placeholder-gray-200 overflow-auto"
        value={formData.qaText}
        placeholder="Hi, I am answering questions. Ask me about..."
        onChange={(e) => {
          if (e.target.value.length > 30) {
            e.target.style.fontWeight = "600";
            e.target.style.fontSize = "2rem";
          } else {
            e.target.style.fontWeight = "600";
            e.target.style.fontSize = "2.5rem";
          }
          setFormData({ ...formData, qaText: e.target.value });
        }}
      ></textarea>
      {locked ? (
        <button
          className="absolute -top-5 -right-5 bg-white dark:bg-dark-400 rounded-full border dark:border-0 p-1 text-3xl transition active:outline-none active:scale-95 dark:hover:bg-dark-300"
          onClick={closeQA}
        >
          <BsX />
        </button>
      ) : (
        <div>
          <BackgroundSetter formData={formData} setFormData={setFormData} />
          <button
            className="w-full mt-3 py-2 capitalize rounded-lg bg-white dark:bg-dark text-gray-700 dark:text-white  disabled:text-gray-300 dark:disabled:text-gray-500 font-semibold hover:bg-gray-200 active:bg-gray-300 transform active:scale-[99%] active:outline-none transition disabled:pointer-events-none"
            disabled={!formData.qaText}
            onClick={() => {
              setToggleModel(null);
              setFormData({ ...formData, type: QA });
            }}
          >
            next
          </button>
        </div>
      )}
    </div>
  </div>
);

export const BackgroundSetter = ({ formData, setFormData, postBackground }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="bg-white dark:bg-dark-400 rounded-lg h-8 w-8 active:outline-none"
        onClick={() => setExpand(!expand)}
      >
        {expand ? (
          <BsChevronLeft className="mx-auto text-lg dark:text-white" />
        ) : (
          <p className="h-full w-full rounded-lg flex items-center justify-center font-semibold text-sm text-white bg-gradient-to-r from-teal-400 to-red-500">
            Aa
          </p>
        )}
      </button>
      {expand && (
        <>
          <BgItem
            bg="bg-gradient-to-br from-pink-500 to-blue-500"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
          <BgItem
            bg="bg-gradient-to-br from-blue-500 to-blue-800"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
          <BgItem
            bg="bg-gradient-to-br from-blue-600 to-blue-600"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
          <BgItem
            bg="bg-gradient-to-br from-cyan-500 to-green-800"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
          <BgItem
            bg="bg-gradient-to-br from-green-700 to-green-700"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
          <BgItem
            bg="bg-gradient-to-br from-teal-900 to-teal-700"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
          <BgItem
            bg="bg-gradient-to-br from-rose-500 to-rose-700"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
          <BgItem
            bg="bg-gradient-to-br from-rose-600 to-rose-600"
            formData={formData}
            setFormData={setFormData}
            postBackground={postBackground}
          />
        </>
      )}
    </div>
  );
};

const BgItem = ({ bg, formData, setFormData, postBackground }) => {
  const active = postBackground
    ? formData.postBackground === bg
    : formData.qaBackground === bg;

  const toggleBg = () => {
    setFormData({
      ...formData,
      postBackground: postBackground
        ? formData.postBackground === bg
          ? "transparent"
          : bg
        : formData.postBackground,
      qaBackground: !postBackground
        ? formData.qaBackground === bg
          ? "transparent"
          : bg
        : formData.qaBackground,
    });
  };

  return (
    <button
      type="button"
      className={`bg-white rounded-lg h-8 w-8 focus:outline-none focus:border active:border-0 ${
        active ? "p-[2px]" : ""
      }`}
      onClick={toggleBg}
    >
      <div className={`${bg} rounded-md h-full w-full`}></div>
    </button>
  );
};

export default QADiv;
