import { IoCube, IoHome, IoLogoFacebook, IoTv } from 'react-icons/io5';
import { FaBars, FaBell, FaCaretDown, FaFacebookMessenger, FaStoreAlt, FaUsers } from 'react-icons/fa';
import Menu from '../icons/MenuIcon';
import Link from 'next/link';
import SearchBar from '../SearchBar';
import WidgetIcon from './WidgetIcon';
import { useGlobalContext } from '../../context/GlobalContext';
import Box from './Box/Box';
import { useState } from 'react';
import MenuBox from './Box/MenuBox';
import MessengerBox from './Box/MessengerBox';
import NotificationsBox from './Box/NotificationsBox';
import AccountBox from './Box/AccountBox/AccountBox';
import Logo from '../Logo';

// variables 
const MENU = 'MENU';
const MESSENGER = 'MESSENGER';
const NOTIFICATIONS = 'NOTIFICATIONS';
const ACCOUNT = 'ACCOUNT';


const Nav = ({route}) => {

  const [box, setBox] = useState({ show: false, mode: null });

  const [state] = useGlobalContext();

    return (
      <div className="fixed top-0 inset-x-0 px-3 items-center h-[57px] shadow-md mb-52 bg-white dark:bg-dark dark:text-white z-20">
        {box.show && (
          <Box
            className={`min-w-[350px] ${box.mode === MENU ? '': 'w-[350px]'}`}
            closeBox={() => setBox({...box, show: false, mode: null })}
          >
            {box.mode === MENU ? (
              <MenuBox />
            ) : box.mode === MESSENGER ? (
              <MessengerBox />
            ) : box.mode === NOTIFICATIONS ? (
              <NotificationsBox />
            ) : (
              box.mode === ACCOUNT && <AccountBox />
            )}
          </Box>
        )}
        <div className="flex flex-wrap h-full">
          <section className="flex-1 flex items-center py-1.5">
            <Link href="/">
              <a href="/" tabIndex="1">
                <Logo/>
              </a>
            </Link>
            <SearchBar tabIndex="2" tooltip="Search" />
            <button
              className="md:hidden text-3xl ml-5"
              tabIndex="3"
              tooltip="Menu"
            >
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
            {state.showCreatePostModel && (
              <div className="absolute inset-0 bg-white/70 z-10 "></div>
            )}
          </section>
          <section className="flex-1 grid grid-flow-col justify-end gap-x-2 items-center text-lg">
            <Link href="/me">
              <a
                href="/me"
                className="hidden xl:flex items-center pr-2 h-10 rounded-xl rounded hover:bg-secondary dark:hover:bg-coolGray-600 transition"
                tabIndex="13"
              >
                <img
                  src="img/users/default/user.jpeg"
                  alt="user"
                  className="h-8 w-8 rounded-full mr-1"
                />
                <p className="capitalize text-sm font-bold">Mubarak</p>
              </a>
            </Link>
            <Button
              tabIndex="12"
              tooltip="Menu"
              box={box}
              setBox={setBox}
              mode={MENU}
            >
              <Menu className="group-focus:bg-blue-600" />
              
            </Button>
            <Button
              tabIndex="11"
              tooltip="Messenger"
              box={box}
              setBox={setBox}
              mode={MESSENGER}
            >
              <FaFacebookMessenger />
            </Button>
            <Button
              tabIndex="10"
              tooltip="Notifications"
              box={box}
              setBox={setBox}
              mode={NOTIFICATIONS}
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
}

export default Nav


const Button = ({ children, tabIndex, tooltip, box, setBox, mode }) => {
  
  const changeBox = (e) => {
    e.stopPropagation();
    setBox({...box, show: box.mode !== mode, mode: box.mode === mode ? null: mode})
  }

  return (
    <button
      className={`rounded-full flex items-center justify-center transition h-10 w-10 group ${
        box.mode === mode
          ? "bg-cyan-100 dark:bg-blue-50 bg-opacity-60 hover:bg-blue-100 text-blue-600 scale-95 focus:outline-none"
          : "bg-gray-200 dark:bg-coolGray-600 hover:bg-gray-300 dark:hover:bg-coolGray-500 active:outline-none"
      }`}
      tabIndex={tabIndex}
      tooltip={tooltip}
      onClick={changeBox}
    >
      {children}
    </button>
  );
}