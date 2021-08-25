import Nav from "../components/Nav/Nav";
import Sidebars from "../components/Sidebars/Sidebars";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";
import ModelsContainer from "./Models/ModelsContainer";
import { useChatContext } from "../context/ChatContext";
import ChatBox from "./ChatsContainer/ChatBox/ChatBox";
import ChatsContainer from "./ChatsContainer/ChatsContainer";

const Container = ({ children }) => {
  const [state] = useGlobalContext();
  const [chat] = useChatContext();
  const route = useRouter().route;
  const showRightSidebar =
    route !== "/watch" &&
    route !== "/marketplace" &&
    route !== "/gaming" &&
    route !== "/login-or-signup" &&
    !/^\/profile/.test(route) &&
    !/^\/users/.test(route); 
    ;
  const showLeftSidebar =
    route !== "/login-or-signup" &&
    !/^\/profile/.test(route) &&
    !/^\/users/.test(route);

  return (
    <div className="min-h-screen dark:text-white">
      <div className="fixed h-screen w-screen bg-secondary dark:bg-darker"></div>
      <div className="min-h-screen">
        {route !== "/login-or-signup" && (
          <ChatsContainer className="fixed bottom-0 right-0 z-30" />
        )}
        {state.model?.show && <ModelsContainer />}
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
          chat={chat}
        >
          {children}
        </MainPage>
      </div>
    </div>
  );
};

export default Container;


const MainPage = ({
  children,
  showRightSidebar,
  showLeftSidebar,
  state,
  chat,
}) => (
  <div
    className={`flex max-w-screen-2xl items-stretch mx-auto ${
      state.model?.show
        ? "fixed left-1/2 -translate-x-1/2 h-screen w-screen overflow-hidden "
        : "min-h-screen"
    }`}
  >
    {showLeftSidebar && <div className="w-[254px] hidden lg:block"></div>}
    <div className="flex-1 pt-[57px] relative">{children}</div>
    {showRightSidebar && <div className="w-[254px] hidden lmd:block"></div>}
  </div>
);