import Nav from "../components/Nav/Nav";
import CreatePostModel from "../components/Models/CreatePostModel/CreatePostModel";
import Sidebars from "../components/Sidebars/Sidebars";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import Alert from "./Alert";

const Container = ({ children }) => {
    
  const [state, setState] = useGlobalContext();
  const route = useRouter().route;
  const showRightSidebar =
    route !== "/watch" &&
    route !== "/marketplace" &&
    route !== "/gaming" &&
    route !== "/login-or-signup";
  const showLeftSidebar = route !== "/login-or-signup";

  return (
    <div className="dark:text-white bg-secondary dark:bg-darker min-height-screen">
      {state.showCreatePostModel && (
        <CreatePostModel
          closeModel={() => setState({ ...state, showCreatePostModel: false })}
        />
      )}
      {route !== "/login-or-signup" && <Nav route={route} />}
      <Sidebars
        route={route}
        showRightSidebar={showRightSidebar}
        showLeftSidebar={showLeftSidebar}
      />
      <MainPage
        showRightSidebar={showRightSidebar}
        showLeftSidebar={showLeftSidebar}
        state={state}
      >
        {children}
      </MainPage>
    </div>
  );
};

export default Container;


const MainPage = ({ children, showRightSidebar, showLeftSidebar, state }) => (
  <div className="flex max-w-screen-2xl min-h-screen items-stretch mx-auto relative">
    {state.alert.show && <Alert />}
    {showLeftSidebar && <div className="w-[254px] hidden lg:block"></div>}
    <div className="flex-1 pt-[57px] ">{children}</div>
    {showRightSidebar && <div className="w-[254px] hidden lmd:block"></div>}
  </div>
);