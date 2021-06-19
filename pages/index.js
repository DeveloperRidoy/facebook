
import CreatePost from "../components/CreatePost";
import StoriesPreview from "../components/StoriesPreview/StoriesPreview";
import { useGlobalContext } from "../context/GlobalContext";


export default function Home () {
  const [state] = useGlobalContext();
  return (
    <div
      className={`flex flex-col max-w-2xl mx-auto relative ${
        state.showCreatePostModel ? "h-screen overflow-hidden mt-[-57px] pt-[70px]" : "py-3"
      }`}
    >
      <StoriesPreview />
      <div className="w-full max-w-lg mx-auto mt-8">
        <CreatePost />
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
      </div>
    </div>
  );
}