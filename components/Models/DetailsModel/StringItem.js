import { useState } from "react";
import { FaCheckCircle, FaPen, FaRegTimesCircle } from "react-icons/fa";

const StringItem = ({ title, type, data, setData }) => {
    const [text, setText] = useState(data[type]);
    const [expand, setExpand] = useState(false);
    
    return (
      <div>
        <p className="text-lg font-semibold capitalize mb-2">{title}</p>
        <div className="flex-1 flex items-center gap-x-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded p-2 focus:outline-none dark:bg-dark-400 dark:disabled:bg-transparent transition"
            disabled={!expand}
          />

          <div className="h-full flex gap-2">
            <button
              onClick={() => {
                setData((data) => ({
                  ...data,
                  [type]: "",
                }));
                setText(""); 
                setExpand(false)
              }}
              className={` ${expand ? "scale-100" : "scale-0"}`}
              disabled={!expand}
            >
              <FaRegTimesCircle className={`text-red-500 text-lg transition`} />
            </button>
            <button
              className={`text-lg ${
                expand ? "dark:text-green-500" : "dark:text-gray-300"
              }`}
              onClick={() => {
                expand &&
                  setData((data) => ({
                    ...data,
                    [type]: text,
                  }));
                setExpand((expand) => !expand);
              }}
            >
              {expand ? <FaCheckCircle /> : <FaPen />}
            </button>
          </div>
        </div>
      </div>
    );
}

export default StringItem
