import axios from "axios";

const Axios = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API ||
    (typeof window != "undefined" && window.location.origin + "/api")
  }/`,
  withCredentials: true,
});

export default Axios;
  