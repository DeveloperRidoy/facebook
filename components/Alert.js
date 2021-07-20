import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const Alert = () => {
    const [state, setState] = useGlobalContext();
    
  useEffect(() => {
    if (state.renderChildren) {
      const timeOut = setTimeout(
        () => setState((state) => ({ ...state, alert: { show: false } })),
        [state.alert.time || 3000]
      );
      return () => clearTimeout(timeOut);
    }
    }, [state.renderChildren])

    return (
      <div
        className={`top-1/2 left-1/2 -translate-x-1/2 h-0 w-0 transition z-50 flex items-center justify-center ${state.renderChildren ? 'sticky': 'fixed'}`}
      >
        <div
          className={`text-white text-lg rounded-md min-w-max px-3 py-1.5 shadow-lg animate-fade-in ${
            state.alert.type === "success"
              ? "bg-blue-500"
              : state.alert.type === "danger" ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {state.alert.text}
        </div>
      </div>
    );
}

export default Alert
