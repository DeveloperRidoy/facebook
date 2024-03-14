import Axios from "./axios";
import catchAsync from "./catchAsync";
import updatedNotifications from "./updatedNotifications";

const initialRequests = (setState) =>
  catchAsync(async () => {
    let authRes;
    let postRes;
    try {
      authRes = await Axios.get("users/auth");
      postRes = await Axios.get("posts?limit=20");
    } catch (error) {}  

    //  update globalContext
    if (setState)
      setState((state) => {
        const notifications = updatedNotifications({
          notifications: state.notifications,
          recepient: authRes?.data?.data?.user,
        });

        return {
          ...state,
          user: authRes?.data?.data?.user || null,
          quickLogins: authRes?.data?.data?.quickLogins,
          posts: postRes?.data?.data?.posts,
          notifications,
          loading: false,
        };
      });
  }, setState);

export default initialRequests;
