import axios from "axios";
import catchAsync from "./catchAsync";

const initialRequests = (setState) => catchAsync(async () => {

  // authenticate user 
  const authRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API || "api"}/v1/users/auth`,
    { withCredentials: true }
  );

  // get first 20 posts
  const postRes = await axios.get(`${process.env.NEXT_PUBLIC_API || 'api'}/v1/posts?limit=20`, { withCredentials: true });

  if (setState)
    setState((state) => ({
      ...state,
      user: authRes.data.data?.user || null,
      quickLogins: authRes.data.data?.quickLogins,
      posts: postRes.data.data?.posts,
      loading: false, 
    }));

}, setState)
 
export default initialRequests;