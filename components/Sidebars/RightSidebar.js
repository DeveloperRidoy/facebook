import Homecontent from "./rightSidebarContents/Homecontent";

const RightSidebar = ({className, route}) => {
    return (
      <div
        className={className}
      >
        <div className="h-full overflow-hidden hover:overflow-auto styled-scrollbar ">
          {route === '/' ? <Homecontent/>: ''}
        </div>
      </div>
    );
}

export default RightSidebar
