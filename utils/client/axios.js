import axios from "axios";

const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API || window.location.origin + "/api"}/`,
  withCredentials: true,
});

export default Axios;
