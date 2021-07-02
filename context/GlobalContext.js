import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import toggleTheme from "../utils/functions/toggleTheme";
import { useAuthContext } from "./AuthContext";


export const useGlobalContext = () => useContext(Context);

const Context = createContext();

const GlobalContext = ({ children }) => {
  const Router = useRouter();
  const [authState] = useAuthContext();
  const [state, setState] = useState({
    showCreatePostModel: false,
    theme: authState.user?.preferredTheme || null,
    alert: { show: false, text: null, type: '', time: null },
    renderChildren: false
  })

  useEffect(() => {
    // toggle theme 
    toggleTheme(state.theme)
  }, [state.theme])

  useEffect(() => {
    const renderChildren =
      (!authState.loading &&
        !authState.user &&
        Router.route === "/login-or-signup" &&
        !document.documentElement.classList.contains("dark")) ||
      (!authState.loading &&
        authState.user &&
        Router.route !== "/login-or-signup" &&
        document.documentElement.classList.contains("dark"));
    renderChildren && setState({...state, renderChildren})

  }, [authState.user, Router.route])

    return (
      <Context.Provider value={[state, setState]}>
        {state.renderChildren && children}
      </Context.Provider>
    );
}


export default GlobalContext

