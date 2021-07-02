import axios from "axios";

const authenticate = (setAuth) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API || "api"}/v1/users/auth`,
        { withCredentials: true }
      );

      if (setAuth)
        setAuth((auth) => ({
          ...auth,
          user: res.data.data?.user,
          loading: false,
        }));
      return resolve(res.data.data?.user);
    } catch (error) {
      if (setAuth) setAuth((auth) => ({ ...auth, loading: false }));
      return reject(error)
    }
  });
};

export default authenticate;