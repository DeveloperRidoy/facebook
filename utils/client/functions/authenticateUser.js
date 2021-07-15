import axios from "axios";
import catchAsync from "./catchAsync";

const authenticateUser = (setState) => catchAsync(async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API || "api"}/v1/users/auth`,
    { withCredentials: true }
  );

  if (setState)
    setState((state) => ({
      ...state,
      user: res.data.data?.user || null,
      quickLogins: res.data.data?.quickLogins,
      loading: false,
    }));
  return res.data.data?.user;

}, setState)

export default authenticateUser;