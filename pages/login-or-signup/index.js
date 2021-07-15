import Link from 'next/link';
import Button from '../../components/Buttons/Button';
import { useEffect, useState } from 'react';
import LoginModel from '../../components/Models/LoginModel';
import CreateAccountModel from '../../components/Models/CreateAccountModel';
import Head from 'next/head';
import { useGlobalContext } from '../../context/GlobalContext';
import catchAsync from '../../utils/client/functions/catchAsync';
import axios from 'axios';
import AddAccount from './AddAccount';
import QuickLoginAccount from './QuickLoginAccount';
import QuickLoginModel from '../../components/Models/CreatePostModel/QuickLoginModel';


const LoginOrSignup = () => {
  const [state, setState] = useGlobalContext();
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showCreateAccountModel, setShowCreateAccountModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [model, setModel] = useState({show: false, user: null})

  const login = (e) => catchAsync(async () => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API || "api"}/v1/users/auth/login`,
      {
        ...loginData,
        rememberPassword:
          state.quickLogins?.find(
            (login) => login.user.email === loginData.email
          )?.rememberPassword || false,
      },
      { withCredentials: true }
    );
    setState({ ...state, user: res.data.data?.user, quickLogins: res.data.data?.quickLogins, alert: { show: true, text: res.data.message, type: 'success' } });
    setLoading(false);
  }, setState, () => setLoading(false))
  
  const inputChange = (e) =>
    setLoginData({
      ...loginData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  
    return (
      <div className="mt-[-57px] relative bg-secondary text-black">
        {showLoginModel && (
          <LoginModel
            backdropClass="dark:bg-white/90"
            closeModel={() => setShowLoginModel(false)}
          />
        )}
        {showCreateAccountModel && (
          <CreateAccountModel
            backdropClass="dark:bg-white/90"
            closeModel={() => setShowCreateAccountModel(false)}
          />
        )}
        {model.show && model.user && (
          <QuickLoginModel
            user={model.user}
            closeModel={() => setModel({ ...model, show: false })}
          />
        )}
        <Head key="login-or-signup">
          <title>Facebook - Login or Sign up</title>
        </Head>
        <div className="min-h-screen flex items-center overflow-auto">
          <div
            className={` max-w-5xl mx-auto flex flex-col md:flex-row md:px-5 justify-between gap-y-5 gap-x-12 items-center text-lg ${
              showLoginModel || showCreateAccountModel
                ? "fixed inset-0 overflow-hidden"
                : ""
            }`}
          >
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-blue-500 text-6xl font-bold mb-3 mt-5 md:mt-0">
                facebook
              </h1>
              {state.quickLogins?.length > 0 ? (
                <div>
                  <h3 className="text-3xl text-gray-700 font-semibold">
                    Recent logins
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 mt-1">
                    Click your picture or add an account.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 h-60 overflow-auto gap-3">
                    {state.quickLogins?.map((login) => login.user && (
                      <QuickLoginAccount
                        key={login.user._id}
                        login={login}
                        setModel={setModel}
                      />
                    ))}
                    <AddAccount setShowLoginModel={setShowLoginModel} />
                  </div>
                </div>
              ) : (
                <p className="text-black text-3xl ">
                  Facebook helps you connect and share with the people in your
                  life.
                </p>
              )}
            </div>
            <div className="flex-1 text-center max-w-[450px]">
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
      </div>
    );
}

export default LoginOrSignup


