import { useEffect } from "react";
import { BsX } from "react-icons/bs"

const Model = ({ children, title, closeModel, showHeader, className }) => {

    return (
      <div>
        <div className="h-screen absolute top-0 left-1/2 transform -translate-x-1/2 z-30 flex items-center" onClick={closeModel}>
          <div
            className={`rounded-xl shadow-xl border bg-white z-10 ${className}`}
            onClick={e => e.stopPropagation()}
          >
            {showHeader && (
              <div className="p-4 min-w-[250px] text-center text-xl font-semibold capitalize relative border-b-2">
                {title}
                <button
                  className="absolute top-2.5 right-4 text-3xl text-gray-600 bg-gray-200 rounded-full p-1 transition hover:bg-gray-300 active:outline-none transform hover:active:scale-95"
                  onClick={closeModel}
                >
                  <BsX />
                </button>
              </div>
            )}
            {children}
          </div>
        </div>
        <div
          className="fixed inset-0 bg-white z-20 opacity-70"
          onClick={closeModel}
        ></div>
      </div>
    );
}

export default Model
