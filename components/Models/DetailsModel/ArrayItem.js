import { BsPlusCircle } from 'react-icons/bs';
import { createRef, useEffect, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import { FaCheckCircle, FaPen, FaRegTimesCircle } from 'react-icons/fa';
import { EDUCATION, WORK } from '../../../utils/global/variables';

const ArraylItem = ({ type, title, data, setData }) => {
    const [text, setText] = useState('');
    const textRef = createRef();
  const [current, setCurrent] = useState('');
  
  // add item
  const addItem = (e) => {
    e.preventDefault();
      setData({
        ...data,
        [type]: [...data[type], { active: true, text, _id: uuidV4(), current }],
      });
      setText("");
      textRef.current.focus();
    }

    return (
      <div className="">
        <p className="text-lg font-semibold capitalize mb-2">{title}</p>
        {data[type]?.length > 0 &&
          data[type]?.map((item) => (
            <Item item={item} setData={setData} type={type} key={item._id} />
          ))}

        <form className="flex overflow-hidden rounded" onSubmit={addItem}>
          <input
            type="text"
            ref={textRef}
            className="flex-1 p-1 focus:ring-4 focus:outline-none dark:bg-dark-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <select
            className="capitalize bg-dark-400 "
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          >
            <option value="">status</option>
            <option value={true}>current</option>
            <option value={false}>{type === EDUCATION ? 'graduated': type === WORK && 'previous'}</option>
          </select>
          <button
            type="submit"
            className="max-w-max hover:underline flex items-center capitalize text-white text-3xl bg-blue-600 p-1 focus:ring-2 focus:outline-none disabled:brightness-75 transition disabled:cursor-not-allowed rounded-r-lg"
            disabled={!text && current === null}
          >
            <BsPlusCircle />
          </button>
        </form>
      </div>
    );
}

export default ArraylItem


const Item = ({ item, setData, type }) => {
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState(item.text);
  const inputRef = createRef();
  const [current, setCurrent] = useState(item.current);

  useEffect(() => expand && inputRef.current.focus(), [expand])

  const toggleItemActive = () => {
    setData((data) => ({
      ...data,
      [type]: data[type].map((detail) => {
        if (detail._id === item._id) {
          detail.active = !item.active;
        }
        return detail;
      }),
    }));
  };

  const updateItem = e => {
    e.preventDefault();
     expand &&
       setData((data) => ({
         ...data,
         [type]: data[type].map((detail) => {
           if (detail._id === item._id) {
             detail.text = text;
             detail.current = current;
           }
           return detail;
         }),
       }));
     setExpand((expand) => !expand);
  }

  return (
    <form  key={item._id} className="flex gap-x-2 p-1 items-center">
      <div className="flex-1 flex items-center gap-x-2">
        <button
          type="button"
          className={` w-10 rounded-full transition  ${
            item.active ? "bg-blue-500 p-[2px] pr-0" : "dark:bg-dark-400"
          }`}
          onClick={toggleItemActive}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition ${
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
          required
        />
        <select
          className="capitalize bg-dark-400 border border-gray-400 dark:disabled:bg-transparent dark:disabled:border-0 transition rounded p-1"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          disabled={!expand}
          required
        >
          <option value={true}>current</option>
          <option value={false}>{type === EDUCATION ? 'graduated': type === WORK && 'previous'}</option>
        </select>
      </div>
      <div className="h-full flex gap-2">
        <button
          type="button"
          onClick={() =>
            setData((data) => ({
              ...data,
              [type]: data[type].filter((i) => i._id !== item._id),
            }))
          }
          className={` ${expand ? "scale-100" : "scale-0"}`}
          disabled={!expand}
        >
          <FaRegTimesCircle className={`text-red-500 text-lg transition`} />
        </button>
        <button
          className={`text-lg ${
            expand ? "dark:text-green-500" : "dark:text-gray-300"
          }`}
          onClick={updateItem}
        >
          {expand ? <FaCheckCircle /> : <FaPen />}
        </button>
      </div>
    </form>
  );
}