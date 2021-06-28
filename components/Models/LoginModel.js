import Model from './Model';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
const LoginModel = ({ closeModel, csrfToken }) => {

  const Router = useRouter();
  const [session] = useSession();
  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && closeModel();
    document.addEventListener("keyup", closeOnEscape);
    return () => document.removeEventListener("keyup", closeOnEscape);
  }, []);

  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: null,
    rememberPassword: false,
    csrfToken
  });

  const inputChange = (e) =>
    setLoginData({
      ...loginData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const login = async (e) => {
    try {
      e.preventDefault();
      signIn('credentials', {redirect: false, ...loginData})
    } catch (error) {
      console.log(error)
    }
  }
  console.log(session)
    return (
      <Model
        className="rounded-sm dark:bg-white dark:text-black"
        showHeader
        closeModel={closeModel}
        title="Log in to Facebook"
        backdropClass="bg-black opacity-40"
      >
        <form className="p-3" onSubmit={login}>
          <input
            type="text"
            className="w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition"
            name="emailOrPhone"
            placeholder="Email address or phone number"
            value={loginData.emailOrPhone}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition"
            placeholder="Password"
            autoComplete="current password"
            onChange={inputChange}
          />
          <div className="flex items-center gap-x-2 my-2">
            <input
              type="checkbox"
              name="rememberPassword"
              id="remember_password"
              className="h-5 w-5 "
              onChange={inputChange}
            />
            <label htmlFor="remember_password">Remember password</label>
          </div>
          <button className="p-2 w-full text-white rounded bg-blue-500 text-center font-semibold my-2 focus:outline-none transition focus:ring">
            Log In
          </button>
        </form>
        <div className="text-center pb-5">
          <Link href="/forgot-password">
            <a href="/forgot-password" className="text-blue-500">
              Forgotten password
            </a>
          </Link>
        </div>
      </Model>
    );
}

export default LoginModel
