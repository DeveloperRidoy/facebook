import Head from "next/head";
import Spacer from "../../components/Spacer";
import Navigator from "../../components/profilePage/Navigator";
import Profile from "../../components/profilePage/Profile/Profile";
import { useGlobalContext } from "../../context/GlobalContext";

const Route = () => {
  const [state] = useGlobalContext();
  return (
    <div className="dark:bg-dark">
      <Head>
        <title>
          {state.user?.fullName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())} |
          Facebook
        </title>
      </Head>     
      <div className="max-w-4xl mx-auto">
        <Profile />
        <div className="px-3 md:px-10">
          <Spacer className="mb-0" />
          <Navigator/>
        </div>
      </div>
    </div>
  );
};

export default Route;
