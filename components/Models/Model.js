import { BsX } from "react-icons/bs"
import Spacer from "../Spacer";

const Model = ({
  children,
  title,
  closeModel,
  closeBtnClass,
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
          className={`rounded-xl shadow-xl border dark:border-0 bg-white w-[400px] md:w-[540px] overflow-hidden dark:bg-dark ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showHeader && (
            <>
              <div className="flex items-center justify-between px-4 py-3 min-w-[250px] text-center text-xl font-semibold">
                <p> {title}</p>
                <button
                  className={`text-3xl text-gray-600 dark:text-white bg-gray-200 dark:bg-dark-400 rounded-full p-1 transition hover:bg-gray-300 dark:hover:bg-dark-300 active:outline-none transform hover:active:scale-95 ${closeBtnClass}`}
                  onClick={closeModel}
                >
                  <BsX />
                </button>
              </div>
              <Spacer className="my-0" />
            </>
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
