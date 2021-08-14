
import { createContext, useContext, useEffect, useState } from "react"
import io from 'socket.io-client';
import updatedNotifications from "../utils/client/functions/updatedNotifications";
import { useGlobalContext } from "./GlobalContext";

const Context = createContext();

export const useSocketContext = () => useContext(Context);

const SocketContext = ({children}) => {
    const [state, setState] = useGlobalContext();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(process.env.NEXT_PUBLIC_SITE || window.location.origin, {query: {id: state.user?._id}});
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [])

    useEffect(() => {
        if (!socket) return;
        
        const handleEvent = (event) => {
             socket.on(event, (data) => {
               const notifications = updatedNotifications({
                 notifications: state.notifications,
                 recepient: data.recepient,
               });
               setState((state) => ({
                 ...state,
                 notifications,
                 user: data.recepient,
               }));
             });
        }
       
        handleEvent('friend_request_received');
        
        handleEvent("friend_request_cancellation_received");
        
        
    }, [socket])

    return (
        <Context.Provider value={socket}>
            {children}
        </Context.Provider>
    )
}

export default SocketContext
