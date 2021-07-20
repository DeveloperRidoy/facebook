import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import RoundSpinner from "../components/Spinners/RoundSpinner";
import initialRequests from "../utils/client/functions/initialRequests";
import toggleTheme from "../utils/client/functions/toggleTheme";
import Alert from '../components/Alert';

export const useGlobalContext = () => useContext(Context);

const Context = createContext();

const GlobalContext = ({ children }) => {
  const Router = useRouter(); 
  const route = Router.route;
  const [state, setState] = useState({
    showCreatePostModel: false,
    model: {show: false, type: null},
    theme: typeof document !== 'undefined' && localStorage.theme || null,
    themeUpdated: false,
    user: null,
    posts: [],
    quickLogins: null,
    loading: true,
    alert: { show: false, text: null, type: '', time: null }, 
    renderChildren: false
  })
  
  useEffect(() => toggleTheme(state.theme, setState), [state.theme]);
  
  // make initial requests on first load
  useEffect(  () =>  initialRequests(setState), [])
     
  useEffect(() => {
    // decide wehether to redirect user
    !state.loading
      ? state.user !== null && state.user && route === "/login-or-signup"
        ? Router.replace("/")
        : !state.user && route !== "/login-or-signup"
        ? Router.replace("/login-or-signup")
        : ""
      : "";
    
    // decide whether to render children
    const renderChildren =
      (!state.loading && state.user && route !== "/login-or-signup" && state.themeUpdated) ||
      (!state.loading && !state.user && route === "/login-or-signup"); 
     
    if (renderChildren && !state.renderChildren) setState({ ...state, renderChildren });
    if (!renderChildren && state.renderChildren) setState({ ...state, renderChildren: false });
  }, [state.user, state.loading, route, state.themeUpdated])

  return (
    <Context.Provider value={[state, setState]}>
      <div className="font-segoe min-h-screen relative">
        {state.loading && !state.alert?.show && <RoundSpinner />}
        {state.alert?.show && <Alert />}
        {state.renderChildren && children}
      </div>
    </Context.Provider>
  );
}


export default GlobalContext

