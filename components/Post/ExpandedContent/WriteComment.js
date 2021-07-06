import { createRef, useEffect, useState } from "react"

const { FaSmile, FaCamera } = require("react-icons/fa")

const WriteComment = () => {
    
    // resize textarea height
    const resize = e => {
        e.target.style.height = '1px';
        e.target.style.height = e.target.scrollHeight + "px";
    }

    return (
      <div className="flex items-center gap-x-2">
        <img
          src="img/users/default/user.jpeg"
          alt="user"
          className="h-9 w-9 rounded-full"
        />
        <div className="flex flex-wrap flex-1 rounded-lg bg-dark-400 pr-2 ">
            <textarea
              className="flex-1 h-7 px-2 py-1 bg-transparent focus:outline-none overflow-hidden resize-none"
              placeholder="Write a comment"
              onChange={resize}
            ></textarea>
          <div className="text-gray-400 items-center mt-auto ml-auto mb-1">
            <button className="mx-1 p-1 rounded-full transition hover:bg-dark-300">
              <FaSmile />
            </button>
            <button className="mx-1 p-1 rounded-full transition hover:bg-dark-300">
              <FaCamera />
            </button>
          </div>
        </div>
      </div>
    );
}

export default WriteComment
