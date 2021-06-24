import { useEffect } from "react";
import { BsX } from "react-icons/bs"

const Model = ({
  children,
  title,
  closeModel,
  showHeader,
  className,
  backdropClass,
  disableCloseByBackDrop,
}) => {
  return (
    <div>
      <div
        className="min-h-screen absolute top-0 left-1/2 transform -translate-x-1/2 grid items-center z-30"
        onClick={closeModel}
      >
        <div
          className={`rounded-xl shadow-xl border bg-white z-10 ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showHeader && (
            <div className="flex items-center justify-center p-4 min-w-[250px] text-center text-xl font-semibold relative border-b-2">
              <p> {title}</p>
              <button
                className="absolute top-3 right-3 text-3xl text-gray-600 bg-gray-200 rounded-full p-1 transition hover:bg-gray-300 active:outline-none transform hover:active:scale-95"
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
        className={`fixed inset-0 bg-white z-20 opacity-70 ${backdropClass}`}
        onClick={() => {if(!disableCloseByBackDrop) closeModel()}}
      ></div>
    </div>
  );
};

export default Model
