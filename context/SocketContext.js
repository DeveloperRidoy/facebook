import { createContext, useContext, useEffect, useState } from "react"
import io from 'socket.io-client';

const Context = createContext();

export const useSocket = () => useContext(Context);

const SocketContext = ({children}) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const newSocket = io(window.location.origin);
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [])
    
    return (
        <Context.Provider value={socket}>
            {children}
        </Context.Provider>
    )
}

export default SocketContext
