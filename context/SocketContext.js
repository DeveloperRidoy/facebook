
import { createContext, useContext, useEffect, useState } from "react"
import io from 'socket.io-client';
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
  
  
  return (
    <Context.Provider value={socket}>
        {children}
    </Context.Provider>
    )
}

export default SocketContext
