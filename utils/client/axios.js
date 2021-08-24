import axios from 'axios';


const Axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API || '/api'}/v1/`,
    withCredentials: true
})


export default Axios;