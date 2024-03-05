import Link from "next/link";
import Spacer from "../Spacer";
import HomeContent from "./leftSidebarContents/HomeContent";
import MarketPlaceContent from "./leftSidebarContents/MarketPlaceContent";

const LeftSidebar = ({ className, route }) => {
  return (
    <div className={className}>
      <div className="h-full flex flex-col justify-between relative">
        <div className="px-2 pt-[20px] max-h-5/6 overflow-hidden hover:overflow-auto styled-scrollbar">
          {route === "/" ? (
            <HomeContent />
          ) : route === "/marketplace" ? (
            <MarketPlaceContent />
          ) : (
            ""
          )}
        </div>
        <Spacer className="my-0 mt-auto" />
        <div className=" text-capitalize p-5">
          <div className="flex flex-wrap text-gray-500">
            <Link legacyBehavior href="/privacy">
              <a href="/privacy" className="px-1 hover:underline">
                privacy
              </a>
            </Link>

            <Link legacyBehavior href="/terms">
              <a href="/terms" className="px-1 hover:underline">
                terms
              </a>
            </Link>

            <Link legacyBehavior href="/advertising">
              <a href="/advertising" className="px-1 hover:underline">
                advertising
              </a>
            </Link>

            <Link legacyBehavior href="/ad-choices">
              <a href="/ad-choices" className="px-1 hover:underline">
                ad choices
              </a>
            </Link>

            <Link legacyBehavior href="/cookies">
              <a href="/cookies" className="px-1 hover:underline">
                cookies
              </a>
            </Link>

            <Link legacyBehavior href="/more">
              <a href="/more" className="px-1 hover:underline">
                more
              </a>
            </Link>
            <p className="px-1">Facebook &copy; 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
