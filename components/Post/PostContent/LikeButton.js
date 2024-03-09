import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";
import Axios from "../../../utils/client/axios";
import catchAsync from "../../../utils/client/catchAsync";
import Button from "../../Buttons/Button";
import { usePostContext } from "../Post";

const LikeButton = () => {
  const [postState] = usePostContext();
  const [state, setState] = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const likedPost = postState.post.likes.find(
    (item) => item.user?._id === state.user?._id
  );
  const addLike = () =>
    catchAsync(
      async () => {
        setLoading(true);
        const res = !likedPost
          ? await Axios.patch(`posts/${postState.post._id}/like`)
          : await Axios.delete(`posts/${postState.post._id}/like`);
        setState((state) => ({
          ...state,
          user: {
            ...state.user,
            posts: state.user?.posts?.map((post) =>
              post._id === postState.post?._id ? res.data.data?.post : post
            ),
          },
          posts: state.posts.map((post) =>
            post._id === postState.post._id ? res.data.data?.post : post
          ),
        }));
        setLoading(false);
      },
      setState,
      () => setLoading(false)
    );

  return (
    <Button
      loading={loading}
      className={`flex-1 flex justify-center p-1 rounded items-center gap-x-2 transition 
         ${
           likedPost
             ? "bg-blue-500 text-white"
             : " hover:bg-gray-200 dark:hover:bg-dark-400"
         }`}
      onClick={addLike}
    >
      {!loading && (
        <>
          {" "}
          <FaThumbsUp />
          <span>Like</span>
        </>
      )}
    </Button>
  );
};

export default LikeButton;
