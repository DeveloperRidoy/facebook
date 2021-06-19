import Link from 'next/link';
import HomeContent from './leftSidebarContents/HomeContent';
import MarketPlaceContent from './leftSidebarContents/MarketPlaceContent';

const LeftSidebar = ({ className, route }) => {
  
  return (
    <div className={className}>
      <div className="h-full flex flex-col justify-between relative">
        <div className="p-2 max-h-5/6 overflow-hidden hover:overflow-auto styled-scrollbar">
          {route === '/' ? <HomeContent/>: route === '/marketplace' ? <MarketPlaceContent/>: '' } 
        </div>
        <div className="border-t-2 border-gray-300 text-capitalize p-5">
          <div className="flex flex-wrap text-gray-500">
            <Link href="/privacy">
              <a href="/privacy" className="px-1 hover:underline">privacy</a>
            </Link>
            
            <Link href="/terms">
              <a href="/terms" className="px-1 hover:underline">terms</a>
            </Link>
            
            <Link href="/advertising">
              <a href="/advertising" className="px-1 hover:underline">advertising</a>
            </Link>
            
            <Link href="/ad-choices">
              <a href="/ad-choices" className="px-1 hover:underline">ad choices</a>
            </Link>
            
            <Link href="/cookies">
              <a href="/cookies" className="px-1 hover:underline">cookies</a>
            </Link>
            
            <Link href="/more">
              <a href="/more" className="px-1 hover:underline">more</a>
            </Link>
            <p className="px-1">Facebook &copy; 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar
