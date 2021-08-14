import axios from "axios";
import catchAsync from "./catchAsync";
import updatedNotifications from "./updatedNotifications";

const initialRequests = (setState) => catchAsync(async () => {

  // authenticate user 
  const authRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API || "api"}/v1/users/auth`,
    { withCredentials: true }
  );

  // get first 20 posts
  const postRes = await axios.get(`${process.env.NEXT_PUBLIC_API || 'api'}/v1/posts?limit=20`, { withCredentials: true });

   
  if (setState)
    setState((state) => {
       const notifications = updatedNotifications({
         notifications: state.notifications,
         recepient: authRes.data.data?.user,
       });

      return {
        ...state,
        user: authRes.data.data?.user || null,
        quickLogins: authRes.data.data?.quickLogins,
        posts: postRes.data.data?.posts,
        notifications,
        loading: false,
      };
    });

}, setState)
 
export default initialRequests;