import Head from "next/head";
import Spacer from "../../../components/Spacer";
import Navigator from "../../../components/profilePage/Navigator";
import Profile from "../../../components/profilePage/Profile/Profile";
import Axios from "../../../utils/client/axios";

const Route = ({user}) => {

  return (
    <div className="dark:bg-dark">
      <Head>
        <title>
          {user?.fullName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())} |
          Facebook
        </title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <Profile user={user}/>
        <div className="px-3 md:px-10">
          <Spacer className="mb-0" />
          <Navigator />
        </div>
      </div>
    </div>
  );
};

export default Route;

export const getServerSideProps = async (ctx) => {
  try {
    const { slug } = ctx.query;
    const user = (await Axios.get(`users/slug/${slug}`)).data.data?.user;
    return {
      props: { user },
    };
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};