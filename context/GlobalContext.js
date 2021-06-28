import { createContext, useContext, useEffect, useState } from "react"

import toggleDarkMode from "../utils/functions/toggleDarkMode";

export const useGlobalContext = () => useContext(Context);

const Context = createContext();

const GlobalContext = ({ children }) => {

  const [state, setState] = useState({
    showCreatePostModel: false,
    darkMode: typeof document !== 'undefined' && localStorage.theme === 'dark',
    alert: {show: false, text: null, type: 'success', time: 3000}
  })
  
  useEffect(() => {
    // function to toggle darkMode 
    toggleDarkMode(state.darkMode)
  }, [state.darkMode])
  
    return (
      <Context.Provider value={[state, setState]}>
        {children}
      </Context.Provider>
    );
}


export default GlobalContext

