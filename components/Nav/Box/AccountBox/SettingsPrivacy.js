import Link from 'next/link';
import { FaArrowLeft, FaClipboardList, FaCog, FaGlobe, FaLock, FaNewspaper, FaUserLock  } from "react-icons/fa"

const SettingsPrivacy = ({ setMode}) => {
    return (
      <div className={`w-full transition p-1`}>
        <div className="flex gap-x-3">
          <button
            className="p-2 ml-2 rounded-full hover:bg-secondary active:bg-gray-300 active:outline-none"
            onClick={() => setMode(null)}
          >
            <FaArrowLeft />
          </button>
          <p className="text-xl font-semibold capitalize">
            settings and privacy
          </p>
        </div>
        <Item link="/settings" text="settings">
            <FaCog/>
        </Item>
        <Item link="/privacy-checkup" text="privacy checkup">
            <FaUserLock/>
        </Item>
        <Item link="/privacy-shortcuts" text="privacy shortcuts">
            <FaLock/>
        </Item>
        <Item link="/activity-lg" text="activity lg">
            <FaClipboardList/>
        </Item>
        <Item link="/news-feed-preferences" text="news feed preferences">
            <FaNewspaper/>
        </Item>
        <Item link="/language" text="language">
            <FaGlobe/>
        </Item>
      </div>
    );
}

export default SettingsPrivacy


const Item = ({children, link, text}) => (
  <Link href={link}>
    <a
      href={link}
      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary transition group active:outline-none"
    >
      <div className="flex gap-x-3 items-center">
        <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
          {children}
        </div>
        <p className="font-semibold capitalize">{text}</p>
      </div>
    </a>
  </Link>
);