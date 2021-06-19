import { IoCube, IoHome, IoLogoFacebook, IoTv } from 'react-icons/io5';
import { FaBars, FaBell, FaCaretDown, FaFacebookMessenger, FaStoreAlt, FaUsers } from 'react-icons/fa';
import Menu from '../icons/MenuIcon';
import Link from 'next/link';
import SearchBar from '../SearchBar';
import WidgetIcon from './WidgetIcon';
import { useGlobalContext } from '../../context/GlobalContext';

const Nav = ({route}) => {

  const [state,] = useGlobalContext();

    return (
      <div className="fixed top-0 inset-x-0 px-3 items-center shadow-md mb-52 bg-white z-20">
        <div className="flex flex-wrap">
          <section className="flex-1 flex items-center py-1">
            <Link href="/">
              <a href="/" tabIndex="1">
                <IoLogoFacebook className=" text-blue-500 text-5xl" />
              </a>
            </Link>
            <SearchBar tabIndex="2" tooltip="search" />
            <button
              className="md:hidden text-3xl ml-5"
              tabIndex="3"
              tooltip="menu"
            >
              <FaBars />
            </button>
          </section>
          <section className="flex-grow max-w-lg flex text-2xl text-gray-600 max-w-52 hidden md:flex relative">
            <WidgetIcon
              link="/"
              active={route === "/"}
              tabIndex="4"
              tooltip="home"
            >
              <IoHome />
            </WidgetIcon>
            <WidgetIcon
              link="/watch"
              notifications={1}
              active={route === "/watch"}
              tabIndex="5"
              tooltip="watch"
            >
              <IoTv />
            </WidgetIcon>
            <WidgetIcon
              link="/marketplace"
              notifications={10}
              active={route === "/marketplace"}
              tabIndex="6"
              tooltip="marketplace"
            >
              <FaStoreAlt />
            </WidgetIcon>
            <WidgetIcon
              link="/groups"
              active={route === "/groups"}
              tabIndex="7"
              tooltip="groups"
            >
              <FaUsers />
            </WidgetIcon>
            <WidgetIcon
              link="/gaming"
              className="hidden lg:flex"
              active={route === "/gaming"}
              tabIndex="8"
              tooltip="gaming"
            >
              <IoCube />
            </WidgetIcon>
            <button
              className="flex justify-center items-center lg:hidden"
              tabIndex="8"
              tooltip="menu"
            >
              <FaBars />
            </button>
            {state.showCreatePostModel && (
              <div className="absolute inset-0 bg-white bg-opacity-70"></div>
            )}
          </section>
          <section className="flex-1 grid grid-flow-col justify-end gap-x-2 items-center text-lg">
            <Link href="/me">
              <a
                href="/me"
                className="hidden xl:flex items-center hover:bg-secondary transition"
                tabIndex="13"
              >
                <img
                  src="img/users/default/user.jpeg"
                  alt="user"
                  className="h-7 w-7 rounded-full mr-1"
                />
                <p className="capitalize text-sm font-bold">Mubarak</p>
              </a>
            </Link>
            <Button tabIndex="12" tooltip="menu">
              <Menu />
            </Button>
            <Button tabIndex="11" tooltip="messenger">
              <FaFacebookMessenger />
            </Button>
            <Button tabIndex="10" tooltip="notifications">
              <FaBell />
            </Button>
            <Button tabIndex="9" tooltip="account">
              <FaCaretDown className="text-2xl" />
            </Button>
          </section>
        </div>
      </div>
    );
}

export default Nav


const Button = ({ children, onClick, tabIndex, tooltip }) => (
  <button
    className="rounded-full bg-gray-200 flex items-center justify-center focus:outline-none hover:bg-gray-300 focus:bg-gray-300 transform focus:scale-95 transition h-10 w-10"
    onClick={onClick}
    tabIndex={tabIndex}
    tooltip={tooltip}
  >
    {children}
  </button>
);