import { BsPlusCircle } from 'react-icons/bs';
import { createRef, useEffect, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import { FaPen, FaRegTimesCircle } from 'react-icons/fa';
import { CURRENT_CITY, HOME_TOWN } from '../../../utils/global/variables';

const DetailItem = ({ type, title, data, setData }) => {
    const [text, setText] = useState('');
    const textRef = createRef();
  

    return (
      <div className="grid gap-y-2">
        <p className="text-lg font-semibold capitalize">{title}</p>
        {data[type]?.length > 0 &&
          data[type]?.map((item) => (
            <Item item={item} setData={setData} type={type} />
          ))}
        {type === CURRENT_CITY && data[CURRENT_CITY]
          ? ''
          : type === HOME_TOWN && data[HOME_TOWN]
            ? ''
            :  (
          <div className="flex overflow-hidden rounded">
            <input
              type="text"
              ref={textRef}
              className="flex-1 p-1 focus:ring-4 focus:outline-none dark:bg-dark-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="max-w-max hover:underline flex items-center capitalize text-white text-3xl bg-blue-600 p-1 focus:ring-2 focus:outline-none disabled:brightness-75 transition disabled:cursor-not-allowed rounded-r-lg"
              disabled={!text}
              onClick={() => {
                setData({
                  ...data,
                  [type]:
                    [type] === CURRENT_CITY
                      ? text
                      : [type] === HOME_TOWN
                      ? text
                      : [...data[type], { active: true, text, id: uuidV4() }],
                });
                setText("");
                textRef.current.focus();
              }}
            >
              <BsPlusCircle />
            </button>
          </div>
        )}
      </div>
    );
}

export default DetailItem


const Item = ({ item, setData, type }) => {
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState(item.text);
  const inputRef = createRef();

  useEffect(() => expand && inputRef.current.focus(), [expand])

  const toggleItemActive = (item) => {
    setData((data) => ({
      ...data,
      [type]: data[type].map((detail) => {
        if (detail.id === item.id) {
          detail.active = !item.active;
        }
        return detail;
      }),
    }));
  };

  return (
    <div key={item.id} className="flex gap-x-2 p-1 items-center">
      <div className="flex-1 flex items-center gap-x-2">
        <button
          className={`bg-blue-500 w-10 rounded-full transition  ${
            item.active ? "p-[2px] pr-0" : ""
          }`}
          onClick={() => toggleItemActive(item)}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition  ${
              item.active ? "translate-x-5" : ""
            }`}
          ></div>
        </button>
        <input
          type="text"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded p-2 focus:outline-none dark:bg-dark-400 dark:disabled:bg-transparent transition"
          disabled={!expand}
        />
      </div>
      <div className="h-full flex gap-2">
        <button
          onClick={() =>
            setData((data) => ({
              ...data,
              [type]: type === CURRENT_CITY ? '': type === HOME_TOWN ? '': data[type].filter((i) => i.id !== item.id),
            }))
          }
          className={` ${expand ? "scale-100" : "scale-0"}`}
          disabled={!expand}
        >
          <FaRegTimesCircle className={`text-red-500 text-lg transition`} />
        </button>
        <button onClick={() => setExpand((expand) => !expand)}>
          <FaPen className="dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}