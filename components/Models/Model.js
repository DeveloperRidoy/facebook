import { BsX } from "react-icons/bs"

const Model = ({
  children,
  title,
  closeModel,
  showHeader,
  className,
  backdropClass,
  disableCloseByBackDrop
}) => {
  return (
    <div>
      <div
        className="min-h-screen absolute top-0 left-1/2 transform -translate-x-1/2 grid items-center z-40"
        onClick={closeModel}
      >
        <div
          className={`rounded-xl shadow-xl border  bg-white ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showHeader && (
            <div className="flex items-center justify-between px-4 py-3 min-w-[250px] text-center text-xl font-semibold border-b-2">
              <p> {title}</p>
              <button
                className=" text-3xl text-gray-600  bg-gray-200  rounded-full p-1 transition hover:bg-gray-300  active:outline-none transform hover:active:scale-95"
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
        className={`fixed inset-0 bg-white/70 dark:bg-darker-600/70 z-20 ${backdropClass}`}
        onClick={() => {
          if (!disableCloseByBackDrop) closeModel();
        }}
      ></div>
    </div>
  );
};

export default Model
