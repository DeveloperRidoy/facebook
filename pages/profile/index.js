import Head from 'next/head'; 
import { useGlobalContext } from '../../context/GlobalContext';
import Spacer from '../../components/Spacer';
import Navigator from '../../components/profilePage/Navigator';
import Profile from '../../components/profilePage/Profile';
import Intro from '../../components/profilePage/Intro';
import CreatePost from '../../components/CreatePost';
import Photos from '../../components/profilePage/Photos';

const ProfilePage = () => {
  const [state] = useGlobalContext();
    return (
      <div>
        <Head>
          <title>
            {state.user?.fullName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}{" "}
            | Facebook
          </title>
        </Head>
        <div className="dark:bg-dark">
          <div className="max-w-4xl mx-auto">
            <Profile />
            <div className="px-3 md:px-10">
              <Spacer className="mb-0" />
              <Navigator />
            </div>
          </div>
        </div>
        <div className="mt-3 grid md:grid-flow-col gap-3 max-w-4xl mx-auto px-3 md:px-10">
          <div className="col-span-3 grid gap-3">
            <Intro />
            <Photos/>
          </div>
          <div className="">
            <CreatePost/>
          </div>
        </div>
      </div>
    );
}

export default ProfilePage
