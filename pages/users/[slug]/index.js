import Head from "next/head";
import Spacer from "../../../components/Spacer";
import Navigator from "../../../components/profilePage/Navigator";
import Profile from "../../../components/profilePage/Profile/Profile";
import Intro from "../../../components/profilePage/Intro/Intro";
import CreatePost from "../../../components/CreatePost";
import Photos from "../../../components/profilePage/Photos";
import Friends from "../../../components/profilePage/Friends";
import Links from "../../../components/profilePage/Links";
import Post from "../../../components/Post/Post";
import Axios from "../../../utils/client/axios";
import { useGlobalContext } from "../../../context/GlobalContext";

const ProfilePage = ({ user }) => {
  const [state] = useGlobalContext();
  const ownProfile = state.user?._id === user?._id;
  return (
    <div>
      <Head>
        <title>
          {user?.fullName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())} |
          Facebook
        </title>
      </Head>
      <div className="dark:bg-dark">
        <div className="max-w-4xl mx-auto">
          <Profile user={user} />
          <div className="px-3 md:px-10">
            <Spacer className="mb-0" />
            <Navigator />
          </div>
        </div>
      </div>
      <div className="mt-3 grid items-start sm:grid-cols-12 sm:grid-flow-col gap-3 max-w-4xl mx-auto px-3 md:px-10">
        <div className="sm:col-span-5 grid gap-3">
          <Intro user={user} ownProfile={ownProfile} />
          <Photos user={user} ownProfile={ownProfile} />
          <Friends user={user} ownProfile={ownProfile} />
          <Links />
        </div>
        <div className="sm:col-span-7 grid gap-3 content-start">
          {ownProfile && <CreatePost />}
          {ownProfile
            ? state.user?.posts?.length > 0 &&
              state.user.posts
                .slice(0)
                .reverse()
                .map((post) => <Post post={post} key={post._id} />)
            : user.posts?.length > 0 &&
              user.posts
                .slice(0)
                .reverse()
                .map((post) => <Post post={post} key={post._id} />)}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps = async (ctx) => {
  try {
    const { slug } = ctx.query;
    const user = (await Axios.get(`users/slug/${slug}`)).data.data?.user;
    return {
      props: { user },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
      notFound: true,
    };
  }
};
