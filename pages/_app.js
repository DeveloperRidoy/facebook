import '../public/styles/global.css';
import SocketContext from '../context/SocketContext'
import Nav from '../components/Nav/Nav';
import LeftSidebar from '../components/Sidebars/LeftSidebar';
import RightSidebar from '../components/Sidebars/RightSidebar';
import { useRouter } from 'next/router';
import GlobalContext from '../context/GlobalContext';

function MyApp({ Component, pageProps }) {
  
  const Router = useRouter();
  const route = Router.route;
  const showRightSidebar = route !== "/watch" &&
    route !== "/marketplace" &&
    route !== "/gaming";
  
  return (
    <div className="bg-secondary min-h-screen relative">
      <GlobalContext>
        <SocketContext>
          <Nav route={route} key={route} />
          <div className="h-screen w-screen max-w-screen-2xl flex justify-end lg:justify-between fixed transform top-0 left-1/2 -translate-x-1/2 pt-[57px] z-10">
            <LeftSidebar
              className="w-[254px] hidden lg:block h-full"
              route={route}
            />
            {showRightSidebar && (
              <RightSidebar
                className="w-[254px] hidden lmd:block h-full pr-2"
                route={route}
              />
            )}
          </div>
          <div className="flex pt-[57px] min-h-screen max-w-screen-2xl relative mx-auto">
            <div className="w-[254px] hidden lg:block"></div>
            <div className="flex-1 z-10 h-full">
              <Component {...pageProps} />
            </div>
            <div className="w-[254px] hidden lmd:block"></div>
          </div>
        </SocketContext>
      </GlobalContext>
    </div>
  );
}

export default MyApp
