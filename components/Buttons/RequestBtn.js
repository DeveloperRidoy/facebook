import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSocketContext } from "../../context/SocketContext";
import Axios from "../../utils/client/axios";
import catchAsync from "../../utils/client/functions/catchAsync";
import updatedNotifications from "../../utils/client/functions/updatedNotifications";
import Button from "./Button";

const RequestBtn = ({
  setShowOptions,
  text,
  request,
  userAsRequester = true,
  children,
  className,
  emitEvent
}) => {
  const [loading, setLoading] = useState(false);
  const [, setState] = useGlobalContext()
  const socket = useSocketContext();
    const makeRequest = () =>
    catchAsync(
      async () => {
        setLoading(true);
        const res = await Axios[request.type](request.url, request.data);

        setState((state) => {
          const notifications = updatedNotifications({
            notifications: state.notifications,
            recepient: userAsRequester
              ? res.data.data?.requester
              : res.data.data?.recepient,
          });
          return {
            ...state,
            user: userAsRequester
              ? res.data.data?.requester._id === state.user?._id
                ? res.data.data?.requester
                : state.user
              : res.data.data?.recepient._id === state.user?._id
              ? res.data.data?.recepient
              : state.user,
            notifications,
            alert: { show: true, text: res.data?.message },
          };
        });
        setLoading(false);
        setShowOptions(false);

        // emit socket event
        if (emitEvent) {
          socket.emit(emitEvent, {
            requester: res.data.data?.requester,
            recepient: res.data.data?.recepient,
          });
        }
      }, 
      setState,
      () => setLoading(false)
    );

  // cleanup
  useEffect(() => () => {}, [])
  
  return (
    <Button
      loading={loading}
      className={`w-full flex gap-2 items-center capitalize py-1.5 px-2.5 rounded transition dark:hover:bg-dark-300 relative ${className}`}
      onClick={makeRequest}
    >
      {!loading && (
        <>
          {children}
          {text}
        </>
      )}
    </Button>
  );
};

export default RequestBtn;
