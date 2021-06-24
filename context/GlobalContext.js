import { createContext, useContext, useEffect, useState } from "react"
import Nav from "../components/Nav/Nav";
import CreatePostModel from "../components/Models/CreatePostModel/CreatePostModel";
import { useRouter } from "next/router";
import Sidebars from '../components/Sidebars/Sidebars';
import toggleDarkMode from "../utils/functions/toggleDarkMode";

export const useGlobalContext = () => useContext(Context);

const Context = createContext();

const GlobalContext = ({ children }) => {
  const route = useRouter().route;
  const showRightSidebar =  route !== "/watch" && route !== "/marketplace" && route !== "/gaming" && route !== '/login-or-signup'
  const showLeftSidebar = route !== '/login-or-signup'

  const [state, setState] = useState({
    showCreatePostModel: false,
    darkMode: typeof document !== 'undefined' && localStorage.theme === 'dark'
  })
  
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // function to toggle darkMode 
    toggleDarkMode(state.darkMode)
    
  }, [state.darkMode])
  
    return (
      <Context.Provider value={[state, setState]}>
        {state.showCreatePostModel && (
          <CreatePostModel
            closeModel={() =>
              setState({ ...state, showCreatePostModel: false })
            }
          />
        )}
        <div className=" min-h-screen ">
          <div className="h-full dark:bg-blue-500">
            {route !== "/login-or-signup" && <Nav route={route} />}
          <Sidebars
            route={route}
            showRightSidebar={showRightSidebar}
            showLeftSidebar={showLeftSidebar}
          />
          <Container
            showRightSidebar={showRightSidebar}
            showLeftSidebar={showLeftSidebar}
          >
            {children}
          </Container>
          </div>
        </div>
      </Context.Provider>
    );
}


export default GlobalContext

const Container = ({ children, showRightSidebar, showLeftSidebar }) => (
  <div className="flex max-w-screen-2xl min-h-screen items-stretch mx-auto">
    {showLeftSidebar && <div className="w-[254px] hidden lg:block"></div>}
    <div className="flex-1 pt-[57px]">{children}</div>
    {showRightSidebar && <div className="w-[254px] hidden lmd:block"></div>}
  </div>
);