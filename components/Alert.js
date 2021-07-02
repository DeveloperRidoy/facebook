import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const Alert = () => {
    const [state, setState] = useGlobalContext();
    
  useEffect(() => {
    const timeOut = setTimeout(() => setState({ ...state, alert: { show: false } }), [state.alert.time || 3000]);
    return () => clearTimeout(timeOut);
    }, [])
  
    return (
      <div
        className={`sticky top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 transition z-50 relative h-0 w-0 flex items-center justify-center bg-blue-500`}
      >
        <div
          className={`text-white text-lg rounded-md min-w-max px-3 py-1.5 animate-fade-in ${
            state.alert.type === "success"
              ? "bg-green-600"
              : state.alert.type === "danger" ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {state.alert.text}
        </div>
      </div>
    );
}

export default Alert
