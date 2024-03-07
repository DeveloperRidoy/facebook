import axios from "axios";

const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API || "/api"}/`,
  withCredentials: true,
});

export default Axios;
