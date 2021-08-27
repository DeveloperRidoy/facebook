import { IoCube, IoHome, IoTv } from "react-icons/io5";
import {
  FaArrowLeft,
  FaBars,
  FaBell,
  FaCaretDown,
  FaFacebookMessenger,
  FaStoreAlt,
  FaUsers,
} from "react-icons/fa";
import Menu from "../icons/MenuIcon";
import Link from "next/link";
import SearchBar from "../SearchBar";
import WidgetIcon from "./WidgetIcon";
import { useGlobalContext } from "../../context/GlobalContext";
import Box from "./Box/Box";
import { useState } from "react";
import MenuBox from "./Box/MenuBox";
import MessengerBox from "./Box/MessengerBox";
import NotificationsBox from "./Box/NotificationsBox";
import AccountBox from "./Box/AccountBox/AccountBox";
import Logo from "../Logo";

import { useRouter } from "next/router";
import { useChatContext } from "../../context/ChatContext";
import NextImage from "../NextImage";

// variables
const MENU = "MENU";
const MESSENGER = "MESSENGER";
const NOTIFICATIONS = "NOTIFICATIONS";
const ACCOUNT = "ACCOUNT";

const Nav = () => {
  const Router = useRouter();
  const route = Router.route;
  const [box, setBox] = useState({ show: false, mode: null });
  const [searchActive, setSearchActive] = useState(false);
  const [state] = useGlobalContext();
  const [chat] = useChatContext();

  return (
    <div
      className={`fixed top-0 inset-x-0 px-3 items-center h-[57px] mb-52 bg-white dark:text-white z-20 dark:border-b-[1px] dark:border-gray-700 ${
        state.model?.show
          ? "dark:bg-darker-600"
          : "dark:bg-dark dark:bg-dark shadow-md"
      }`}
    >
      {box.show && (
        <Box
          className={`min-w-[350px] ${box.mode === MENU ? "" : "w-[350px]"}`}
          closeBox={() => setBox({ ...box, show: false, mode: null })}
        >
          {box.mode === MENU ? (
            <MenuBox />
          ) : box.mode === MESSENGER ? (
            <MessengerBox setBox={setBox} />
          ) : box.mode === NOTIFICATIONS ? (
            <NotificationsBox />
          ) : (
            box.mode === ACCOUNT && <AccountBox setBox={setBox} />
          )}
        </Box>
      )}
      <div className="flex flex-wrap h-full">
        <section className="flex-1 flex items-center py-1.5 z-50">
          <div className="flex-1 flex gap-x-3 items-center max-w-[285px] overflow-hidden">
            {searchActive ? (
              <button tabIndex="1">
                <FaArrowLeft />
              </button>
            ) : (
              <Link href="/">
                <a href="/" tabIndex="1">
                  <Logo />
                </a>
              </Link>
            )}
            <SearchBar
              tabIndex="2"
              tooltip="Search"
              setSearchActive={setSearchActive}
              searchActive={searchActive}
            />
          </div>
          <button className="hidden text-3xl ml-5" tabIndex="3" tooltip="Menu">
            <FaBars />
          </button>
        </section>
        <section className="flex-grow max-w-lg flex text-2xl text-gray-600 dark:text-gray-400 max-w-52 hidden md:flex relative">
          <WidgetIcon
            link="/"
            active={route === "/"}
            tabIndex="4"
            tooltip="Home"
          >
            <IoHome />
          </WidgetIcon>
          <WidgetIcon
            link="/watch"
            notifications={1}
            active={route === "/watch"}
            tabIndex="5"
            tooltip="Watch"
          >
            <IoTv />
          </WidgetIcon>
          <WidgetIcon
            link="/marketplace"
            notifications={10}
            active={route === "/marketplace"}
            tabIndex="6"
            tooltip="Marketplace"
          >
            <FaStoreAlt />
          </WidgetIcon>
          <WidgetIcon
            link="/groups"
            active={route === "/groups"}
            tabIndex="7"
            tooltip="Groups"
          >
            <FaUsers />
          </WidgetIcon>
          <WidgetIcon
            link="/gaming"
            className="hidden lg:flex"
            active={route === "/gaming"}
            tabIndex="8"
            tooltip="Gaming"
          >
            <IoCube />
          </WidgetIcon>
          <button
            className="flex justify-center items-center lg:hidden"
            tabIndex="8"
            tooltip="Menu"
          >
            <FaBars />
          </button>
          {state.model?.show && (
            <div className="absolute inset-0 bg-white/70 dark:bg-darker-600/70 z-10 "></div>
          )}
        </section>
        <section
          className={`flex-1 grid-flow-col justify-end gap-x-2 items-center text-lg ${searchActive ? 'hidden sm:grid': 'grid'}`}
        >
          <Link href={`/users/${state.user?.slug}`}>
            <a
              href={`/users/${state.user?.slug}`}
              className={`hidden xl:flex items-center pr-2 gap-2 rounded-xl rounded transition active:scale-95 ${
                Router.query?.slug === state.user?.slug
                  ? "dark:bg-blue-500/20 text-blue-500"
                  : "hover:bg-secondary dark:hover:bg-dark-300"
              }`}
              tabIndex="13"
            >
              <NextImage
                className="h-9 w-9 rounded-full"
                photo={state.user?.photo}
              />
              <p className="capitalize text-sm font-bold">
                {state.user?.firstName.split(" ")[0]}
              </p>
            </a>
          </Link>
          <Button
            tabIndex="12"
            tooltip="Menu"
            box={box}
            setBox={setBox}
            mode={MENU}
            className="hidden sm:block"
          >
            <Menu className="group-focus:bg-blue-600" />
          </Button>
          <Button
            tabIndex="11"
            tooltip="Messenger"
            box={box}
            setBox={setBox}
            mode={MESSENGER}
            notifications={chat.unreadMessages}
          >
            <FaFacebookMessenger />
          </Button>
          <Button
            tabIndex="10"
            tooltip="Notifications"
            box={box}
            setBox={setBox}
            mode={NOTIFICATIONS}
            notifications={state.notifications.totalNotifications}
          >
            <FaBell />
          </Button>
          <Button
            tabIndex="9"
            tooltip="Account"
            box={box}
            setBox={setBox}
            mode={ACCOUNT}
          >
            <FaCaretDown className="text-2xl" />
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Nav;

const Button = ({
  children,
  tabIndex,
  tooltip,
  box,
  setBox,
  mode,
  notifications = 0,
  className,
}) => {
  const changeBox = (e) => {
    e.stopPropagation();
    setBox({
      ...box,
      show: box.mode !== mode,
      mode: box.mode === mode ? null : mode,
    });
  };

  return (
    <button
      className={`rounded-full flex items-center justify-center transition h-10 w-10 group relative ${
        box.mode === mode
          ? "bg-cyan-100 dark:bg-blue-500/30 bg-opacity-60 hover:bg-blue-100 dark:text-blue-400 text-blue-600 scale-95 focus:outline-none"
          : "bg-gray-200 dark:bg-dark-400 hover:bg-gray-300 dark:hover:bg-dark-300 active:outline-none"
      } ${className}`}
      tabIndex={tabIndex}
      tooltip={tooltip}
      onClick={changeBox}
    >
      {notifications > 0 && (
        <span
          className={`absolute top-0 -right-2 h-4 ${
            notifications > 9 ? "w-5" : "w-4"
          } flex items-center justify-center rounded-full bg-red-500 z-10 text-sm text-white`}
        >
          {notifications > 9 ? "9+" : notifications}
        </span>
      )}
      {children}
    </button>
  );
};
