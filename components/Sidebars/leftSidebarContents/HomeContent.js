import { useState } from "react"
import Link from 'next/link';
import { FaAd, FaBusinessTime, FaCalendarAlt, FaClock, FaCreditCard, FaFacebookMessenger, FaFlag, FaGratipay, FaPaperPlane, FaPlaystation, FaRibbon, FaShoppingBag, FaSignal, FaStoreAlt, FaTint, FaUserAlt, FaUserAltSlash, FaUserFriends, FaUsers } from 'react-icons/fa';
import { IoTv } from "react-icons/io5";

const HomeContent = () => {
    
    const [expand, setExpand] = useState(false);
    
    const Item = ({children, link="/"}) => {
        return (
          <Link href={link}>
            <a
              href={link}
              className="p-2 transition hover:bg-gray-300 flex items-center rounded-md"
            >
              {children}
            </a>
          </Link>
        );
    }

    return (
      <div className="grid gap-y-1  font-semibold capitalize">
        <Item link="/user">
          <img
            src="img/users/default/user.jpeg"
            alt="user"
            className="h-7 w-7 rounded-full"
          />
          <p className="ml-2">mubarak hussain ridoy</p>
        </Item>
        <Item link="/covid-19-information-center">
          <FaGratipay className="text-red-500 text-2xl" />
          <p className="ml-2">covid-19 information center</p>
        </Item>
        <Item link="/friends">
          <FaUserFriends className="text-cyan-500 text-2xl" />
          <p className="ml-2">Friends</p>
        </Item>
        <Item link="/pages">
          <FaFlag className="text-cyan-500 text-2xl" />
          <p className="ml-2">pages</p>
        </Item>
        <Item link="/groups">
          <FaUsers className="text-cyan-500 text-2xl" />
          <p className="ml-2">groups</p>
        </Item>
        <Item link="/marketplace">
          <FaStoreAlt className="text-cyan-500 text-2xl" />
          <p className="ml-2">marketplace</p>
        </Item>
        <Item link="/messenger">
          <FaFacebookMessenger className="text-blue-600 text-2xl" />
          <p className="ml-2">messenger</p>
        </Item>
        <Item link="/watch">
          <IoTv className="text-cyan-500 text-2xl" />
          <p className="ml-2">watch</p>
        </Item>
        <Item link="/memories">
          <FaClock className="text-cyan-500 text-2xl" />
          <p className="ml-2">memories</p>
        </Item>
        <Item link="/saved">
          <FaRibbon className="text-violet-600 text-2xl" />
          <p className="ml-2">saved</p>
        </Item>
        <Item link="/ad-center">
          <FaAd className="text-cyan-500 text-2xl" />
          <p className="ml-2">ad center</p>
        </Item>
        <Item link="/ads-manager">
          <FaSignal className="text-cyan-500 text-2xl" />
          <p className="ml-2">ads manager</p>
        </Item>
        <Item link="/blood-donations">
          <FaTint className="text-red-500 text-2xl" />
          <p className="ml-2">blood donations</p>
        </Item>
        <Item link="/business-manager">
          <FaBusinessTime className="text-cyan-500 text-2xl" />
          <p className="ml-2">business manager</p>
        </Item>
        <Item link="/campus">
          <FaPaperPlane className="text-cyan-500 text-2xl" />
          <p className="ml-2">campus</p>
        </Item>
        <Item link="/games">
          <FaPlaystation className="text-cyan-500 text-2xl" />
          <p className="ml-2">play games</p>
        </Item>
        <Item link="/facebook-pay">
          <FaCreditCard className="text-gray-700 text-2xl transform -rotate-12" />
          <p className="ml-2">facebook pay</p>
        </Item>
        <Item link="/events">
          <FaCalendarAlt className="text-cyan-500 text-2xl" />
          <p className="ml-2">events</p>
        </Item>
        <Item link="/friend-lists">
          <FaUserAlt className="text-blue-500 text-2xl" />
          <p className="ml-2">friend lists</p>
        </Item>
      </div>
    );
}

export default HomeContent
