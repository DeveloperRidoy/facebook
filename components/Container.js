import Nav from "../components/Nav/Nav";
import CreatePostModel from "../components/Models/CreatePostModel/CreatePostModel";
import Sidebars from "../components/Sidebars/Sidebars";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";

const Container = ({ children }) => {
  const [state, setState] = useGlobalContext();
  const route = useRouter().route;
  const showRightSidebar =
    route !== "/watch" &&
    route !== "/marketplace" &&
    route !== "/gaming" &&
    route !== "/login-or-signup" &&
    !/^\/profile/.test(route);
  const showLeftSidebar =
    route !== "/login-or-signup" && !/^\/profile/.test(route);

  return (
    <div className="min-h-screen dark:text-white">
      <div className="fixed h-screen w-screen bg-secondary dark:bg-darker"></div>
      <div className="min-h-screen">
        {state.showCreatePostModel && (
          <CreatePostModel
            closeModel={() =>
              setState({ ...state, showCreatePostModel: false })
            }
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
    </div>
  );
};

export default Container;


const MainPage = ({ children, showRightSidebar, showLeftSidebar, state }) => (
  <div
    className={`flex max-w-screen-2xl items-stretch mx-auto ${
      state.showCreatePostModel
        ? "fixed left-1/2 -translate-x-1/2 h-screen w-screen overflow-hidden "
        : "min-h-screen"
      }`}
  >
    {showLeftSidebar && <div className="w-[254px] hidden lg:block"></div>}
    <div className="flex-1 pt-[57px] relative">{children}</div>
    {showRightSidebar && <div className="w-[254px] hidden lmd:block"></div>}
  </div>
);