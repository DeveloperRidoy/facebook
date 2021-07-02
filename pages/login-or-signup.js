import Link from 'next/link';
import Button from '../components/Buttons/Button';
import { BsX } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import LoginModel from '../components/Models/LoginModel';
import CreateAccountModel from '../components/Models/CreateAccountModel';
import Head from 'next/head';
import { useGlobalContext } from '../context/GlobalContext';
import catchAsync from '../utils/functions/catchAsync';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
     
const LoginOrSignup = () => {
  const Router = useRouter();
  const [state, setState] = useGlobalContext();
  const [auth, setAuth] = useAuthContext();
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showCreateAccountModel, setShowCreateAccountModel] = useState(false);
  const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    });
  

  const login = (e) => catchAsync(async () => {
    e.preventDefault();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API || 'api'}/v1/users/auth/login`, loginData, { withCredentials: true });
    setState({ ...state, alert: { show: true, text: res.data.message, type: 'success' } });
    setAuth({ ...auth, user: res.data.data.user});
    setLoading(false);
    Router.replace('/');
  }, setState, () => setLoading(false))
  
    const inputChange = (e) =>
      setLoginData({
        ...loginData,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
  
  useEffect(() => {
    // cleanup
    return () => { };
  }, [] )
  
    return (
      <div className="mt-[-57px] relative ">
        {showLoginModel && (
          <LoginModel closeModel={() => setShowLoginModel(false)} />
        )}
        {showCreateAccountModel && (
          <CreateAccountModel
            closeModel={() => setShowCreateAccountModel(false)}
          />
        )}
        <Head key="login-or-signup">
          <title>Facebook - Login or Sign up</title>
        </Head>
        <div
          className={`min-h-screen bg-secondary flex flex-col md:flex-row justify-around gap-y-5 items-center text-lg ${
            showLoginModel || showCreateAccountModel
              ? "fixed inset-0 overflow-hidden"
              : ""
          }`}
        >
          <div className="text-center md:text-left">
            <h1 className="text-blue-500 text-5xl font-bold mb-3 mt-5 md:mt-0">
              facebook
            </h1>
            <h3 className="text-3xl text-gray-700 font-semibold">
              Recent logins
            </h3>
            <p className="text-gray-500 text-sm mb-5 mt-1">
              Click your picture or add an account.
            </p>
            <div className="flex gap-x-3 w-72 h-44 ">
              <div className="flex-1 rounded-lg border bg-white relative group transition hover:shadow-lg">
                <Link href="/">
                  <a
                    href="/"      
                    className="flex h-full flex-col justify-stretch"
                  >
                    <img
                      src="img/users/default/user.jpeg"
                      alt="user"
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="flex-1 flex text-gray-700 justify-center items-center capitalize">
                      mubarak
                    </div>
                  </a>
                </Link>
                <div className="absolute top-1 left-1">
                  <button
                    className=" rounded-full bg-gray-500 h-5 w-5 flex items-center justify-center group-hover:bg-white transition transform group-hover:scale-125 text-white group-hover:text-black relative"
                    tooltiptop="Remove this account"
                    tabIndex="-1"
                  >
                    <BsX />
                  </button>
                </div>
              </div>
              <Link href="#">
                <a
                  href="#"
                  className="flex-1 flex flex-col items-stretch justify-stretch bg-white border rounded-lg transition hover:shadow-lg overflow-hidden"
                  onClick={() => setShowLoginModel(true)}
                >
                  <div className="h-32  flex justify-center items-center">
                    <div className="p-2 rounded-full bg-blue-500 text-white text-2xl">
                      <FaPlus />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center items-center capitalize text-blue-500">
                    add account
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="text-center w-[400px]">
            <div className="p-3 rounded-lg bg-white text-black shadow-lg border">
              <form onSubmit={login}>
                <input
                  type="text"
                  name="email"
                  className="w-full border my-2 p-2 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Email address or phone number"
                  value={loginData.email}
                  onChange={inputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="w-full border my-2 p-2 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  autoComplete="current password"
                  value={loginData.password}
                  onChange={inputChange}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-500 py-2 text-white rounded-md my-2 focus:outline-none focus:ring hover:bg-blue-600 active:bg-blue-700 transition"
                  loading={loading}
                >
                  Log In
                </Button>
              </form>
              <Link href="/forgot-password">
                <a
                  href="/forgot-password"
                  className="text-blue-500 text-sm hover:underline mt-3 block max-w-max mx-auto"
                >
                  Forgotten password?
                </a>
              </Link>
              <div className="border-t border-gray-300 mt-5"></div>
              <button
                className="capitalize bg-green-500 p-2 mt-7 mb-3 text-white rounded-md focus:outline-none transition focus:ring focus:ring-green-300"
                onClick={() => setShowCreateAccountModel(true)}
              >
                create new account
              </button>
            </div>
            <div className="mt-5 text-sm">
              <Link href="/pages/create">
                <a href="/pages/create" className="hover:underline">
                  <span className="font-semibold">Create a Page </span>
                </a>
              </Link>
              for a celebrity, band or business
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginOrSignup


