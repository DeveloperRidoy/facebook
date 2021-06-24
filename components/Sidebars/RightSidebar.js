import Homecontent from "./rightSidebarContents/Homecontent";

const RightSidebar = ({className, route}) => {
    return (
      <div
        className={className}
      >
        <div className=" h-full pt-[12px] overflow-hidden hover:overflow-auto styled-scrollbar ">
          {route === '/' ? <Homecontent /> : ''}
          
        </div>
      </div>
    );
}

export default RightSidebar
