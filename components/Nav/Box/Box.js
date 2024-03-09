import { useEffect } from "react";

const Box = ({  closeBox, children, className }) => {

  

  useEffect(() => {
    document.body.addEventListener('click', closeBox);
    return () => document.body.removeEventListener('click', closeBox);
  }, [])

  return (
    <div
      className={`absolute top-full right-3  bg-white dark:bg-dark shadow-lg  overflow-hidden rounded-b-lg rounded-r-lg  ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-h-[calc(100vh-5rem)] overflow-auto p-3">{children}</div>
    </div>
  );
};

export default Box;
