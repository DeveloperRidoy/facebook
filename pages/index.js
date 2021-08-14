import CreatePost from "../components/CreatePost";
import StoriesPreview from "../components/StoriesPreview/StoriesPreview";
import Head from 'next/head';
import Post from "../components/Post/Post";
import CreateRoom from "../components/CreateRoom/CreateRoom";
import { useGlobalContext } from "../context/GlobalContext";

export default function Home () {

  const [state] = useGlobalContext();
  return (
    <div className={`flex flex-col mx-auto pt-[20px]`}>
      <Head>
        <title>Facebook</title>
      </Head>
      <StoriesPreview />
      <div className="w-full max-w-lg mx-auto mt-8">
        <CreatePost />
      <CreateRoom />
        {state.posts?.length > 0 &&
          state.posts
            .slice(0)
            .reverse()
            .map((post) => <Post post={post} key={post._id} />)}
      </div>
    </div>
  );
}

