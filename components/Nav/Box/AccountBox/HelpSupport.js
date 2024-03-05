import Link from "next/link";
import { BsEnvelopeFill } from "react-icons/bs";
import {
  FaArrowLeft,
  FaExclamationCircle,
  FaQuestionCircle,
} from "react-icons/fa";

const HelpSupport = ({ setMode }) => {
  return (
    <div className="w-full p-1">
      <div className="flex gap-x-3">
        <button
          className="p-2 ml-2 rounded-full hover:bg-secondary dark:hover:bg-dark-400 active:bg-gray-300 active:outline-none"
          onClick={() => setMode(null)}
        >
          <FaArrowLeft />
        </button>
        <p className="text-xl font-semibold capitalize">help & support</p>
      </div>
      <Item link="/help-center" text="help center">
        <FaQuestionCircle />
      </Item>
      <Item link="/support-inbox" text="support inbox">
        <BsEnvelopeFill />
      </Item>
      <Item link="/report-problem" text="Report a Problem" noCapitalize>
        <FaExclamationCircle />
      </Item>
    </div>
  );
};

export default HelpSupport;

const Item = ({ children, link, text, noCapitalize }) => (
  <Link legacyBehavior href={link}>
    <a
      href={link}
      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary dark:hover:bg-dark-400 transition group active:outline-none"
    >
      <div className="flex gap-x-3 items-center">
        <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
          {children}
        </div>
        <p className={`font-semibold ${noCapitalize ? "" : "capitalize"}`}>
          {text}
        </p>
      </div>
    </a>
  </Link>
);
