import { useGlobalContext } from "../../context/GlobalContext";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const Sidebars = ({showRightSidebar, showLeftSidebar, route}) => {
    
    return (
      <div className="h-screen w-screen max-w-screen-2xl flex justify-end lg:justify-between fixed transform top-0 left-1/2 -translate-x-1/2 pt-[57px]">
        {showLeftSidebar && (
          <LeftSidebar
            className="w-[254px] hidden lg:block h-full"
            route={route}
          />
        )}
        {showRightSidebar && (
          <RightSidebar
            className="w-[254px] hidden lmd:block h-full pr-2"
            route={route}
          />
        )}
      </div>
    );
}

export default Sidebars
