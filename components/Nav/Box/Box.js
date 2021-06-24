import { useEffect } from "react";

const Box = ({  closeBox, children, className }) => {

  

  useEffect(() => {
    document.body.addEventListener('click', closeBox);
    return () => document.body.removeEventListener('click', closeBox);
  }, [])

  return (
    <div 
      className={`absolute top-full right-3 p-3 bg-white dark:bg-dark shadow-lg  overflow-auto rounded-b-lg max-h-[calc(100vh-5rem)] ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default Box;
